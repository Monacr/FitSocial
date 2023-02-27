//! Defines the routes used by the server to receive HTTP requests.

use crate::model::users::{LoginInfo, Signup, User, UserController, UserCreate, UserUpdate};
use crate::model::widgets::{Widget, WidgetController, WidgetType};
use crate::prelude::Error;
use crate::store::Store;
use rocket::http::{Cookie, CookieJar};
use rocket::{serde::json::Json, State};

#[get("/users/<name>")]
pub async fn get_user_by_name(name: &str, store: &State<Store>) -> Result<Json<User>, Error> {
    UserController::get(store, name)
        .await
        .map(|user| user.into())
}

#[get("/users/email/<email>")]
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
    dbg!(&info.0);
    let username = UserController::login(store, info.0).await?;
    jar.add_private(Cookie::new("auth_name", username.to_string()));

    UserController::get(store, &username)
        .await
        .map(|user| user.into())
}

#[post("/signup", format = "json", data = "<new_user>")]
pub async fn signup(
    new_user: Json<Signup>,
    jar: &CookieJar<'_>,
    store: &State<Store>,
) -> Result<String, Error> {
    let res = UserController::signup(store, new_user.0).await?;

    jar.add_private(Cookie::new("auth_name", res.clone()));
    Ok(res)
}

#[post("/logout", format = "json")]
pub fn logout(jar: &CookieJar<'_>) {
    jar.remove_private(Cookie::named("auth_name"));
}

#[post("/users/<id>/update", format = "json", data = "<updates>")]
pub async fn user_update(
    id: &str,
    updates: Json<UserUpdate>,
    store: &State<Store>,
) -> Result<String, Error> {
    UserController::update(store, id, updates.0).await
}

#[get("/users/checkAuth")]
pub async fn check_auth(jar: &CookieJar<'_>) -> Result<(), Error> {
    let auth_name = jar.get_private("auth_name");
    if auth_name.is_some() {
        Ok(())
    } else {
        Err(Error::AuthenticationError)
    }
}

#[get("/users/<user>/<widget_type>")]
pub async fn get_widget(
    store: &State<Store>,
    user: &str,
    widget_type: WidgetType,
) -> Result<Json<Widget>, Error> {
    WidgetController::get_widget(store, widget_type, user)
        .await
        .map(|data| data.into())
}
