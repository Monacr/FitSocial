//! Abstraction to interacting with SurrealDB.
//!
//! Includes basic CRUD operations like create, read (get)
//! update, and delete
use crate::prelude::*;
use std::collections::BTreeMap;

use maplit::btreemap;
use surrealdb::sql::{thing, Array, Datetime, Object, Value};
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

/// Trait for types that can be updated in the database
pub trait Updatable: Into<Value> {}

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

    pub async fn exec_get<T>(&self, id: &str) -> Result<T, Error>
    where
        T: TryFrom<Object, Error = Error>,
    {
        let sql = "SELECT * FROM $th";

        let vars = btreemap! {
            "th".into() => thing(id)?.into()
        };

        let ress = self.ds.execute(sql, &self.ses, Some(vars), true).await?;

        // First result should be an array of objects
        let first_res = ress
            .into_iter()
            .next()
            .map(|r| r.result)
            .ok_or(Error::StoreError)??
            .first();

        if Value::None == first_res {
            return Err(Error::StoreFailToGet(id.to_string()));
        }

        // Map array to vector of the expected type
        let object: Object = Wrapper(first_res).try_into()?;

        object.try_into()
    }

    pub async fn thing_exists(&self, id: &str) -> Result<bool, Error> {
        let sql = "SELECT * FROM $th";

        let vars = btreemap! {
            "th".into() => thing(id)?.into()
        };

        let ress = self.ds.execute(sql, &self.ses, Some(vars), true).await?;

        // First result should be an array of objects
        let first_res = ress
            .into_iter()
            .next()
            .map(|r| r.result)
            .expect("Did not get a response")?
            .first();

        Ok(first_res != Value::None)
    }

    pub async fn exec_create<T: Creatable>(
        &self,
        tb: &str,
        data: T,
        custom_id: Option<&str>,
    ) -> Result<String, Error> {
        let mut vars = btreemap! {
            "tb".into() => tb.into(),
        };

        let sql = if let Some(custom_id) = custom_id {
            vars.insert("th".into(), thing(&format!("{tb}:{custom_id}"))?.into());
            "CREATE $th CONTENT $data RETURN id"
        } else {
            vars.insert("tb".into(), tb.into());
            "CREATE type::table($tb) CONTENT $data RETURN id"
        };

        // Need to make the data value as an object to insert ctime
        let mut data: Object = Wrapper(data.into()).try_into()?;
        let now = Datetime::default().timestamp_nanos();
        data.insert("ctime".into(), now.into());

        vars.insert("data".into(), data.into());

        let ress = self.ds.execute(sql, &self.ses, Some(vars), false).await?;
        let first_val = ress
            .into_iter()
            .next()
            .map(|r| r.result)
            .expect("id not returned")?;

        if let Value::Object(mut obj) = first_val.first() {
            obj.try_take::<String>("id")
                .map_err(|err| Error::StoreFailToCreate(format!("exec_create {tb} {err}")))
        } else {
            Err(Error::StoreFailToCreate(format!(
                "exec_create {tb}, nothing returned."
            )))
        }
    }

    pub async fn exec_update<T: Updatable>(&self, id: &str, data: T) -> Result<String, Error> {
        // Make sure the data exists
        // TODO: there must be a way to do this directly in surreal?
        if !self.thing_exists(id).await? {
            return Err(Error::StoreFailToGet(id.to_string()));
        }

        let sql = "UPDATE $th MERGE $data RETURN id";

        let vars = btreemap! {
            "th".into() => thing(id)?.into(),
            "data".into() => data.into(),
        };

        let ress = self.ds.execute(sql, &self.ses, Some(vars), true).await?;
        let first_res = ress
            .into_iter()
            .next()
            .map(|r| r.result)
            .expect("id not returned")?
            .first();

        if let Value::Object(mut obj) = first_res {
            obj.try_take::<String>("id")
                .map_err(|err| Error::StoreFailToCreate(format!("exec_update {id} {err}")))
        } else {
            Err(Error::StoreFailToCreate(format!(
                "exec_update {id}, nothing returned."
            )))
        }
    }

    /// Selects all from a table and filters based on mappings between field names and values
    pub async fn exec_select_all<T>(
        &self,
        tb: &str,
        filter: Option<BTreeMap<String, String>>,
    ) -> Result<Vec<T>, Error>
    where
        T: TryFrom<Object, Error = Error>,
    {
        let mut sql = "SELECT * FROM type::table($tb)".to_string();
        let vars = btreemap! {
            "tb".into() => tb.into()
        };

        let filter = filter.unwrap_or(BTreeMap::new());
        for (i, (field, value)) in filter.into_iter().enumerate() {
            if i == 0 {
                sql += &format!(" WHERE {field} = '{value}'");
            } else {
                sql += &format!(" AND {field} = '{value}'");
            }
        }
        sql += " ORDER ctime DESC";
        let ress = self.ds.execute(&sql, &self.ses, Some(vars), true).await?;

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
