//! Defines methods for related to the bit social backend API

use crate::prelude::*;
use rocket::{
    http::Status,
    outcome::IntoOutcome,
    request::{FromRequest, Outcome},
    Request,
};

pub mod fairings;
pub mod routes;
pub mod settings;

#[derive(Debug)]
pub struct AuthenticatedUser(String);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthenticatedUser {
    type Error = Error;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        req.cookies()
            .get_private("auth_name")
            .and_then(|cookie| cookie.value().parse().ok())
            .map(AuthenticatedUser)
            .into_outcome((Status::Forbidden, Error::AuthenticationError))
    }
}
