//! Entry point for the backend binary

#![allow(unused)] // CHANGE ONCE THINGS ACTUALLY GET USED
#[macro_use]
extern crate rocket;

use local_ip_address::local_ip;
use rocket::config::Config;

mod error;
mod model;
mod prelude;
mod settings;
mod store;
mod utils;

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
        .mount("/", routes![message])
        .attach(settings::Cors)
        .launch()
        .await?;

    Ok(())
}
