//! Model and controller methods for the user type

use std::collections::BTreeMap;

use maplit::btreemap;
use serde::{Deserialize, Serialize};
use surrealdb::sql::{Object, Value};
use ts_rs::TS;

use crate::prelude::*;
use crate::store::{Creatable, Store, TryTake, Updatable};

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

/// Struct that can be used to create a new user in the database
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

/// Struct that can be used to update a user
/// Only [Some] fields will be updated
#[derive(Debug, Deserialize, TS)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub struct UserUpdate {
    pub name: Option<String>,
    pub password: Option<String>,
}

impl From<UserUpdate> for Value {
    fn from(user_u: UserUpdate) -> Self {
        let mut data = BTreeMap::new();

        if let Some(name) = user_u.name {
            data.insert("name".into(), name.into());
        }

        if let Some(password) = user_u.password {
            data.insert("password".into(), password.into());
        }

        Value::Object(data.into())
    }
}

impl Updatable for UserUpdate {}

pub struct UserController;

impl UserController {
    const TABLE: &'static str = "user";

    pub async fn get(store: &Store, id: &str) -> Result<User, Error> {
        store.exec_get(&id).await
    }

    pub async fn update(
        store: &Store,
        id: &str,
        data: UserUpdate,
    ) -> Result<MutateResultData, Error> {
        store.exec_update(id, data).await
    }

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

    use super::{UserController, UserCreate, UserUpdate};

    #[tokio::test]
    async fn insert_select() {
        let store = Store::try_new_memory().await.unwrap();

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
        }
    }

    #[tokio::test]
    async fn get_with_id() {
        let store = Store::try_new_memory().await.unwrap();

        let new_user = UserCreate {
            name: "user".to_string(),
            password: "password".to_string(),
        };

        let res = UserController::create(&store, new_user)
            .await
            .expect("Creating a user failed");

        let res = UserController::get(&store, &res.id)
            .await
            .expect("Getting user failed");

        assert_eq!(res.name, "user");
        assert_eq!(res.password, "password");
    }

    #[tokio::test]
    async fn update_partial_and_full() {
        let store = Store::try_new_memory().await.unwrap();

        let new_user = UserCreate {
            name: "user".to_string(),
            password: "password".to_string(),
        };

        let res = UserController::create(&store, new_user)
            .await
            .expect("Creating a user failed");

        let id = &res.id;

        let change_name = UserUpdate {
            name: Some("bro".to_string()),
            password: None,
        };

        let res = UserController::update(&store, id, change_name)
            .await
            .expect("Updating user failed");

        assert_eq!(&res.id, id);

        let get = UserController::get(&store, id)
            .await
            .expect("Getting user failed");

        assert_eq!(get.name, "bro");
        assert_eq!(get.password, "password");

        let change_name = UserUpdate {
            name: Some("Bro2".to_string()),
            password: Some("VerySecurePassword".to_string()),
        };

        let res = UserController::update(&store, id, change_name)
            .await
            .expect("Updating user failed");

        assert_eq!(&res.id, id);

        let get = UserController::get(&store, id)
            .await
            .expect("Getting user failed");

        assert_eq!(get.name, "Bro2");
        assert_eq!(get.password, "VerySecurePassword");
    }
}
