//! Implementations of fairings for the server to use to hold state

use rocket::{
    fairing::{Fairing, Info, Kind, Result},
    Build, Rocket,
};

use crate::store::Store;

pub struct DbFairing;

#[rocket::async_trait]
impl Fairing for DbFairing {
    fn info(&self) -> rocket::fairing::Info {
        Info {
            name: "Database",
            kind: Kind::Ignite,
        }
    }
    async fn on_ignite(&self, rocket: Rocket<Build>) -> Result {
        let store = Store::try_new().await;

        if let Ok(store) = store {
            Ok(rocket.manage(store))
        } else {
            Err(rocket)
        }
    }
}
