//! Model and controller methods for the user type

use super::MutateResultData;
use crate::prelude::*;
use crate::store::{Creatable, Store, TryTake, Updatable};
use argon2::{self, Config};
use maplit::btreemap;
use rand::{distributions::Alphanumeric, Rng};
use rocket::futures::TryStreamExt;
use serde::{Deserialize, Serialize};
use serde_with::skip_serializing_none;
use std::collections::BTreeMap;
use surrealdb::sql::{thing, Object, Value};
use ts_rs::TS;

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub struct User {
    pub id: String,
    pub ctime: i64,
    pub name: String,
    pub email: String,
}

/// Represents login information
#[derive(Debug, Deserialize, TS)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub struct LoginInfo {
    pub username: String,
    pub password: String,
}

impl TryFrom<Object> for User {
    type Error = Error;

    fn try_from(mut obj: Object) -> Result<Self, Self::Error> {
        let user = User {
            id: obj.try_take("id")?,
            ctime: obj.try_take("ctime")?,
            name: obj.try_take("name")?,
            email: obj.try_take("email")?,
        };

        Ok(user)
    }
}

#[derive(Debug, Deserialize, TS)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub struct Signup {
    pub name: String,
    pub email: String,
    pub password: String,
}

/// Struct that can be used to create a new user in the database
pub struct UserCreate {
    pub name: String,
    pub email: String,
}

impl From<UserCreate> for Value {
    fn from(user_c: UserCreate) -> Self {
        let data = btreemap! {
            "name".into() => user_c.name.into(),
            "email".into() => user_c.email.into(),
        };

        Value::Object(data.into())
    }
}

impl Creatable for UserCreate {}

/// Represents authentication information for a given user
pub struct AuthInfo {
    pub user_id: String,
    pub password_hash: String,
}

impl TryFrom<Object> for AuthInfo {
    type Error = Error;

    fn try_from(mut obj: Object) -> Result<Self, Self::Error> {
        let auth = AuthInfo {
            user_id: obj.try_take("user_id")?,
            password_hash: obj.try_take("password_hash")?,
        };

        Ok(auth)
    }
}

impl From<AuthInfo> for Value {
    fn from(auth: AuthInfo) -> Self {
        let data = btreemap! {
            "user_id".into() => auth.user_id.into(),
            "password_hash".into() => auth.password_hash.into(),
        };

        Value::Object(data.into())
    }
}

impl Creatable for AuthInfo {}

pub struct UpdateAuth {
    pub password_hash: String,
}

impl From<UpdateAuth> for Value {
    fn from(auth_u: UpdateAuth) -> Self {
        let mut data = btreemap! {
            "password_hash".into() => auth_u.password_hash.into()
        };

        Value::Object(data.into())
    }
}

impl Updatable for UpdateAuth {}

/// Struct that can be used to update a user
/// Only [Some] fields will be updated
#[skip_serializing_none]
#[derive(Debug, Deserialize, TS)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub struct UserUpdate {
    // Don't allow updating usernames
    pub password: Option<String>,
    pub email: Option<String>,
}

impl From<UserUpdate> for Value {
    fn from(user_u: UserUpdate) -> Self {
        let mut data = BTreeMap::new();

        if let Some(email) = user_u.email {
            data.insert("email".into(), email.into());
        }

        Value::Object(data.into())
    }
}

impl Updatable for UserUpdate {}

pub struct UserController;

impl UserController {
    pub const TABLE: &'static str = "user";
    pub const AUTH_TABLE: &'static str = "auth";

    pub async fn get(store: &Store, id: &str) -> Result<User, Error> {
        store.exec_get(id).await
    }

    pub async fn get_by_email(store: &Store, email: &str) -> Result<User, Error> {
        let filter = btreemap! {"email".to_string() => email.to_string()};
        store
            .exec_select_all(Self::TABLE, Some(filter))
            .await?
            .into_iter()
            .next()
            .ok_or(Error::StoreFailToGet(email.to_string()))
    }

    pub async fn update(
        store: &Store,
        id: &str,
        data: UserUpdate,
    ) -> Result<MutateResultData, Error> {
        if let Some(password) = &data.password {
            let auth_id = &format!("{}:{}", Self::AUTH_TABLE, thing(id)?.id);
            store
                .exec_update(
                    auth_id,
                    UpdateAuth {
                        password_hash: Self::password_hash(password)?,
                    },
                )
                .await?;
        }
        store.exec_update(id, data).await
    }

    /// Tries to login given username and password from [LoginInfo]
    /// Returns id string on success
    pub async fn login(store: &Store, info: LoginInfo) -> Result<String, Error> {
        let auth: AuthInfo = store
            .exec_get(&format!("auth:{}", info.username))
            .await
            .map_err(|e| match e {
                Error::StoreFailToGet(x) => Error::LoginError,
                _ => e,
            })?;

        let matches = argon2::verify_encoded(&auth.password_hash, info.password.as_bytes())
            .map_err(|_| Error::ServerComputationError)?;

        if matches {
            Ok(auth.user_id)
        } else {
            Err(Error::LoginError)
        }
    }

    pub async fn signup(store: &Store, data: Signup) -> Result<MutateResultData, Error> {
        if Self::get_by_email(store, &data.email).await.is_ok() {
            return Err(Error::InvalidData);
        }

        let create = UserCreate {
            name: data.name.clone(),
            email: data.email,
        };

        let auth = AuthInfo {
            user_id: format!("{}:{}", Self::TABLE, data.name),
            password_hash: Self::password_hash(&data.password)?,
        };

        // id = auth:name
        store
            .exec_create(Self::AUTH_TABLE, auth, Some(&data.name))
            .await;
        store
            .exec_create(Self::TABLE, create, Some(&data.name))
            .await
    }

    pub async fn select_all(store: &Store) -> Result<Vec<User>, Error> {
        store.exec_select_all(Self::TABLE, None).await
    }

    fn password_hash(password: &str) -> Result<String, Error> {
        let salt: String = rand::thread_rng()
            .sample_iter(&Alphanumeric)
            .take(8)
            .map(char::from)
            .collect();

        argon2::hash_encoded(password.as_bytes(), salt.as_bytes(), &Config::default())
            .map_err(|_| Error::ServerComputationError)
    }
}

#[cfg(test)]
mod tests {
    use crate::store::Store;

    use super::{LoginInfo, Signup, UserController, UserCreate, UserUpdate};

    #[tokio::test]
    async fn signup_insert() {
        let store = Store::try_new_memory().await.unwrap();

        const N: usize = 5;
        for i in 0..N {
            let new_user = Signup {
                name: format!("user{i}"),
                email: format!("{i}@gmail.com"),
                password: format!("password{i}"),
            };

            UserController::signup(&store, new_user)
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
            assert_eq!(v.email, format!("{}@gmail.com", N - i - 1));

            if let Some(prev_ctime) = prev_ctime {
                assert!(v.ctime <= prev_ctime);
            }
            prev_ctime = Some(v.ctime);
        }
    }

    #[tokio::test]
    async fn get_with_id() {
        let store = Store::try_new_memory().await.unwrap();

        let new_user = Signup {
            name: "user".to_string(),
            email: "user@gmail.com".to_string(),
            password: "password".to_string(),
        };

        let res = UserController::signup(&store, new_user)
            .await
            .expect("Creating a user failed");

        let res = UserController::get(&store, &res.id)
            .await
            .expect("Getting user failed");

        assert_eq!(res.name, "user");
        assert_eq!(res.email, "user@gmail.com");
    }

    #[tokio::test]
    async fn get_with_email() {
        let store = Store::try_new_memory().await.unwrap();

        let new_user = Signup {
            name: "user".to_string(),
            email: "user@gmail.com".to_string(),
            password: "password".to_string(),
        };

        let res = UserController::signup(&store, new_user)
            .await
            .expect("Creating a user failed");

        let res = UserController::get_by_email(&store, "user@gmail.com")
            .await
            .expect("Getting user failed");

        assert_eq!(res.name, "user");
        assert_eq!(res.email, "user@gmail.com");
    }

    #[tokio::test]
    async fn authenticates() {
        let store = Store::try_new_memory().await.unwrap();

        let new_user = Signup {
            name: "user".to_string(),
            email: "user@gmail.com".to_string(),
            password: "password".to_string(),
        };

        let res = UserController::signup(&store, new_user)
            .await
            .expect("Creating a user failed");

        let login_id = UserController::login(
            &store,
            LoginInfo {
                username: "user".to_string(),
                password: "password".to_string(),
            },
        )
        .await
        .expect("Failed to authenticate");

        assert_eq!(login_id, res.id)
    }

    #[tokio::test]
    async fn update_partial_and_full() {
        let store = Store::try_new_memory().await.unwrap();

        let new_user = Signup {
            name: "user".to_string(),
            email: "user@gmail.com".to_string(),
            password: "password".to_string(),
        };

        let res = UserController::signup(&store, new_user)
            .await
            .expect("Creating a user failed");

        let id = &res.id;

        let change_email = UserUpdate {
            password: None,
            email: Some("user@yahoo.com".to_string()),
        };

        let res = UserController::update(&store, id, change_email)
            .await
            .expect("Updating user failed");

        assert_eq!(&res.id, id);

        let get = UserController::get(&store, id)
            .await
            .expect("Getting user failed");

        UserController::login(
            &store,
            LoginInfo {
                username: "user".to_string(),
                password: "password".to_string(),
            },
        )
        .await
        .expect("Failed to authenticate");

        assert_eq!(get.email, "user@yahoo.com");

        let change_everything = UserUpdate {
            email: Some("user@uw.edu".to_string()),
            password: Some("VerySecurePassword".to_string()),
        };

        let res = UserController::update(&store, id, change_everything)
            .await
            .expect("Updating user failed");

        assert_eq!(&res.id, id);

        let get = UserController::get(&store, id)
            .await
            .expect("Getting user failed");

        UserController::login(
            &store,
            LoginInfo {
                username: "user".to_string(),
                password: "VerySecurePassword".to_string(),
            },
        )
        .await
        .expect("Failed to authenticate");

        assert_eq!(get.email, "user@uw.edu");
    }
}
