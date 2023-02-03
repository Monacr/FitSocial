//! Defines the routes used by the server to receive and send HTTP requests.

use rocket::{serde::json::Json, State};

use crate::model::users::{User, UserController, UserCreate, UserUpdate};
use crate::model::MutateResultData;
use crate::prelude::Error;
use crate::store::Store;

#[get("/users/<id>")]
pub async fn get_user(id: &str, store: &State<Store>) -> Result<Json<User>, Error> {
    UserController::get(store, id).await.map(|user| user.into())
}

#[get("/users")]
pub async fn get_users(store: &State<Store>) -> Result<Json<Vec<User>>, Error> {
    UserController::select_all(store)
        .await
        .map(|vec| vec.into())
}

#[post("/signup", format = "json", data = "<new_user>")]
pub async fn signup(
    new_user: Json<UserCreate>,
    store: &State<Store>,
) -> Result<Json<MutateResultData>, Error> {
    UserController::create(store, new_user.0)
        .await
        .map(|data| data.into())
}

#[post("/users/<id>/update", format = "json", data = "<updates>")]
pub async fn user_update(
    id: &str,
    updates: Json<UserUpdate>,
    store: &State<Store>,
) -> Result<Json<MutateResultData>, Error> {
    UserController::update(store, id, updates.0)
        .await
        .map(|data| data.into())
}
