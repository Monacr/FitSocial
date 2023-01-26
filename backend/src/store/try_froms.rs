//! Implements try froms to convert between databse types
//!
//! Inspired by https://github.com/rust-awesome-app/template-app-base/blob/main/src-tauri/src/store/try_froms.rs]
use crate::prelude::*;
use surrealdb::sql::{Array, Object, Value};

impl TryFrom<Wrapper<Value>> for Object {
    type Error = Error;

    fn try_from(value: Wrapper<Value>) -> Result<Self, Self::Error> {
        match value.0 {
            Value::Object(obj) => Ok(obj),
            _ => Err(Error::ValueConversionError("surrealdb::sql::Object")),
        }
    }
}

impl TryFrom<Wrapper<Value>> for String {
    type Error = Error;

    fn try_from(value: Wrapper<Value>) -> Result<Self, Self::Error> {
        match value.0 {
            Value::Strand(strand) => Ok(strand.as_string()),
            Value::Thing(thing) => Ok(thing.to_string()),
            _ => Err(Error::ValueConversionError("String")),
        }
    }
}

impl TryFrom<Wrapper<Value>> for Array {
    type Error = Error;

    fn try_from(value: Wrapper<Value>) -> Result<Self, Self::Error> {
        match value.0 {
            Value::Array(arr) => Ok(arr),
            _ => Err(Error::ValueConversionError("Array")),
        }
    }
}

impl TryFrom<Wrapper<Value>> for i64 {
    type Error = Error;

    fn try_from(value: Wrapper<Value>) -> Result<Self, Self::Error> {
        match value.0 {
            Value::Number(num) => Ok(num.as_int()),
            _ => Err(Error::ValueConversionError("i64")),
        }
    }
}
