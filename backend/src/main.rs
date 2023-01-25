#[macro_use]
extern crate rocket;

use local_ip_address::local_ip;
use rocket::config::Config;

mod settings;

#[get("/msg")]
async fn message() -> &'static str {
    "Fit Social Moments"
}

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    let config = Config {
        address: local_ip().unwrap(),
        ..Config::debug_default()
    };
    let _rocket = rocket::custom(config)
        .mount("/", routes![message])
        .attach(settings::CORS)
        .launch()
        .await?;

    Ok(())
}
