//! Abstraction to interacting with SurrealDB.
//!
//! Includes basic CRUD operations like create, read (get)
//! update, and delete
use crate::model::MutateResultData;
use crate::prelude::*;

use maplit::btreemap;
use surrealdb::sql::{Array, Datetime, Object, Value};
use surrealdb::{Datastore, Session};

mod try_froms;
mod try_takes;

pub use self::try_takes::TryTake;

/// Contains all the information needed to talk to surrealdb
pub struct Store {
    ds: Datastore,
    ses: Session,
}

/// Trait for types that can be created for the database
pub trait Creatable: Into<Value> {}

impl Store {
    /// Create new in-memory datastore for testing
    #[cfg(test)]
    pub async fn try_new_memory() -> Result<Self, Error> {
        let ds = Datastore::new("memory").await?;
        let ses = Session::for_db("testns", "testdb");
        Ok(Store { ds, ses })
    }

    /// Create a persistent datastore
    pub async fn try_new() -> Result<Self, Error> {
        // Will need to change to cloud or something eventually
        let ds = Datastore::new("file://dev.db").await?;
        let ses = Session::for_db("appns", "appdb");
        Ok(Store { ds, ses })
    }

    pub async fn exec_create<T: Creatable>(
        &self,
        tb: &str,
        data: T,
    ) -> Result<MutateResultData, Error> {
        let sql = "CREATE type::table($tb) CONTENT $data RETURN id";

        let mut data: Object = Wrapper(data.into()).try_into()?;
        let now = Datetime::default().timestamp_nanos();
        data.insert("ctime".into(), now.into());

        let vars = btreemap! {
            "tb".into() => tb.into(),
            "data".into() => Value::from(data)
        };

        let ress = self.ds.execute(sql, &self.ses, Some(vars), false).await?;
        let first_val = ress
            .into_iter()
            .next()
            .map(|r| r.result)
            .expect("id not returned")?;

        if let Value::Object(mut obj) = first_val.first() {
            obj.try_take::<String>("id")
                .map(MutateResultData::from)
                .map_err(|err| Error::StoreFailToCreate(format!("exec_create {tb} {err}")))
        } else {
            Err(Error::StoreFailToCreate(format!(
                "exec_create {tb}, nothing returned."
            )))
        }
    }

    pub async fn exec_select_all<T>(&self, tb: &str) -> Result<Vec<T>, Error>
    where
        T: TryFrom<Object, Error = Error>,
    {
        let sql = "SELECT * FROM type::table($tb) ORDER ctime DESC";

        let vars = btreemap! {
            "tb".into() => tb.into()
        };

        let ress = self.ds.execute(sql, &self.ses, Some(vars), true).await?;

        // First result should be an array of objects
        let first_res = ress
            .into_iter()
            .next()
            .map(|r| r.result)
            .expect("Did not get a response")?;

        let array: Array = Wrapper(first_res).try_into()?;

        // Map array to vector of the expected type
        let objects: Result<Vec<Object>, Error> =
            array.into_iter().map(|v| Wrapper(v).try_into()).collect();

        objects?.into_iter().map(|o| o.try_into()).collect()
    }
}
