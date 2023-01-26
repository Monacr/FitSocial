//! Errors used accross the application
//!
//! Uses "thiserror" to make the errors a bit more sophisticated

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error(transparent)]
    Surreal(#[from] surrealdb::Error),

    #[error("Fail to create. Cause: {0}")]
    StoreFailToCreate(String),

    #[error("surrealdb::sql::Value is not of type '{0}'")]
    ValueConversionError(&'static str),

    #[error("Property '{0}' not found")]
    PropertyError(String),
}
