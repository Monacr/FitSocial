//! Model and controller methods for the user type

use maplit::btreemap;
use serde::{Deserialize, Serialize};
use surrealdb::sql::{Object, Value};
use ts_rs::TS;

use crate::prelude::*;
use crate::store::{Creatable, Store, TryTake};

use super::MutateResultData;

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub struct User {
    pub id: String,
    pub ctime: i64,
    pub name: String,
    pub password: String,
}

impl TryFrom<Object> for User {
    type Error = Error;

    fn try_from(mut obj: Object) -> Result<Self, Self::Error> {
        let user = User {
            id: obj.try_take("id")?,
            ctime: obj.try_take("ctime")?,
            name: obj.try_take("name")?,
            password: obj.try_take("password")?,
        };

        Ok(user)
    }
}

#[derive(Debug, Deserialize, TS)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub struct UserCreate {
    pub name: String,
    pub password: String,
}

impl From<UserCreate> for Value {
    fn from(user_c: UserCreate) -> Self {
        let data = btreemap! {
            "name".into() => user_c.name.into(),
            "password".into() => user_c.password.into(),
        };

        Value::Object(data.into())
    }
}

impl Creatable for UserCreate {}

pub struct UserController;

impl UserController {
    const TABLE: &'static str = "user";
    pub async fn create(store: &Store, data: UserCreate) -> Result<MutateResultData, Error> {
        store.exec_create(Self::TABLE, data).await
    }

    pub async fn select_all(store: &Store) -> Result<Vec<User>, Error> {
        store.exec_select_all(Self::TABLE).await
    }
}

#[cfg(test)]
mod tests {
    use crate::store::Store;

    use super::{UserController, UserCreate};

    #[tokio::test]
    async fn insert_select() {
        let store = Store::try_new().await.unwrap();

        const N: usize = 5;
        for i in 0..N {
            let new_user = UserCreate {
                name: format!("user{i}"),
                password: format!("password{i}"),
            };
            UserController::create(&store, new_user)
                .await
                .expect("Creating a user failed");
        }

        let res = UserController::select_all(&store)
            .await
            .expect("Selecting all users failed");

        assert_eq!(N, res.len());
        let mut prev_ctime = None;
        for (i, v) in res.into_iter().enumerate() {
            // Returned in descending order of creation time,
            // So last created first
            assert_eq!(v.name, format!("user{}", N - i - 1));
            assert_eq!(v.password, format!("password{}", N - i - 1));

            if let Some(prev_ctime) = prev_ctime {
                assert!(v.ctime <= prev_ctime);
            }
            prev_ctime = Some(v.ctime);
            println!("{v:?}");
        }
    }
}
