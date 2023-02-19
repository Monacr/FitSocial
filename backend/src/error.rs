//! Errors used across the application
//!
//! Uses "thiserror" to make the errors a bit more sophisticated

use std::io::Cursor;

use rocket::{
    http::{ContentType, Status},
    response::{Responder, Result},
    serde::json::Json,
    Request, Response,
};
use serde::Serialize;

#[derive(thiserror::Error, Debug, Serialize)]
pub enum Error {
    #[error(transparent)]
    Surreal(#[from] surrealdb::Error),

    #[error("Fail to create. Cause: {0}")]
    StoreFailToCreate(String),

    #[error("Fail to get item '{0}'")]
    StoreFailToGet(String),

    #[error("surrealdb::sql::Value is not of type '{0}'")]
    ValueConversionError(&'static str),

    #[error("Property '{0}' not found")]
    PropertyError(String),

    #[error("Username or password incorrect")]
    LoginError,

    #[error("Invalid authentication for request")]
    AuthenticationError,

    #[error("Internal server error while computing")]
    ServerComputationError,

    #[error("Unknown store error")]
    StoreError,

    #[error("Provided data is invalid")]
    InvalidData,
}

impl<'a> Responder<'a, 'static> for Error {
    fn respond_to(self, req: &'a Request) -> rocket::response::Result<'static> {
        Response::build()
            .status(Status::InternalServerError)
            .join(Json(self).respond_to(req)?)
            .ok()
    }
}
