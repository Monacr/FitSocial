//! A bunch of basic things that most modules in this project should use

pub use crate::error::Error;

/// Wrapper type that allows foreign traits to be implemented
/// for otherwise foreign types (mainly try_into())
pub struct Wrapper<T>(pub T);
