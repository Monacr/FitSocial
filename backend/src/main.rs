//! Entry point for the backend binary

#![allow(unused)] // CHANGE ONCE THINGS ACTUALLY GET USED
#[macro_use]
extern crate rocket;

use local_ip_address::local_ip;
use rocket::config::Config;
use server::routes::*;

mod error;
mod model;
mod prelude;
mod server;
mod store;

#[get("/msg")]
async fn message() -> &'static str {
    "Fit Social Moment"
}

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    let config = Config {
        address: local_ip().unwrap(),
        ..Config::debug_default()
    };
    let _rocket = rocket::custom(config)
        .mount(
            "/",
            routes![
                message,
                get_user_by_name,
                get_user_by_email,
                get_users,
                signup,
                user_update,
                login,
                logout,
                get_secret
            ],
        )
        .attach(server::settings::Cors)
        .attach(server::fairings::DbFairing)
        .launch()
        .await?;

    Ok(())
}
