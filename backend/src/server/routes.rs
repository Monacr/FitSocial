//! Defines the routes used by the server to receive HTTP requests.

use crate::model::users::{LoginInfo, Signup, User, UserController, UserCreate, UserUpdate};
use crate::model::MutateResultData;
use crate::prelude::Error;
use crate::store::Store;
use rocket::http::{Cookie, CookieJar};
use rocket::{serde::json::Json, State};

#[get("/users/get/name/<name>")]
pub async fn get_user_by_name(name: &str, store: &State<Store>) -> Result<Json<User>, Error> {
    UserController::get(store, &format!("{}:{name}", UserController::TABLE))
        .await
        .map(|user| user.into())
}

#[get("/users/get/email/<email>")]
pub async fn get_user_by_email(email: &str, store: &State<Store>) -> Result<Json<User>, Error> {
    UserController::get_by_email(store, email)
        .await
        .map(|user| user.into())
}

#[get("/users")]
pub async fn get_users(store: &State<Store>) -> Result<Json<Vec<User>>, Error> {
    UserController::select_all(store)
        .await
        .map(|vec| vec.into())
}

#[post("/login", format = "json", data = "<info>")]
pub async fn login(
    info: Json<LoginInfo>,
    jar: &CookieJar<'_>,
    store: &State<Store>,
) -> Result<Json<User>, Error> {
    let id = UserController::login(store, info.0).await?;
    jar.add_private(Cookie::new("auth_id", id.to_string()));

    UserController::get(store, &id)
        .await
        .map(|user| user.into())
}

#[post("/signup", format = "json", data = "<new_user>")]
pub async fn signup(
    new_user: Json<Signup>,
    jar: &CookieJar<'_>,
    store: &State<Store>,
) -> Result<Json<MutateResultData>, Error> {
    let res: MutateResultData = UserController::signup(store, new_user.0).await?;

    jar.add_private(Cookie::new("auth_id", res.id.to_string()));
    Ok(Json(res))
}

#[post("/users/logout", format = "json")]
pub fn logout(jar: &CookieJar<'_>) {
    jar.remove_private(Cookie::named("auth_id"));
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

// TODO: change to something useful
#[get("/users/<id>/secret")]
pub async fn get_secret(id: &str, jar: &CookieJar<'_>) -> &'static str {
    let auth_id = jar.get_private("auth_id");

    if let Some(cookie) = auth_id {
        if cookie.value() == id {
            return "secret message !!!!!";
        }
    }

    "permission denied"
}
