//! Implements try froms to convert between databse types
//!
//! Inspired by https://github.com/rust-awesome-app/template-app-base/blob/main/src-tauri/src/store/try_froms.rs]
use crate::{
    model::widgets::{Date, WidgetType},
    prelude::*,
};
use surrealdb::sql::{Array, Object, Value};

use super::TryTake;

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

impl<T> TryFrom<Wrapper<Value>> for Vec<T>
where
    T: TryFrom<Wrapper<Value>, Error = Error>,
{
    type Error = Error;

    fn try_from(value: Wrapper<Value>) -> Result<Self, Self::Error> {
        let arr: Array = value.try_into()?;
        let mut vec = Vec::new();
        for v in arr {
            vec.push(Wrapper(v).try_into()?);
        }
        Ok(vec)
    }
}

impl TryFrom<Wrapper<Value>> for WidgetType {
    type Error = Error;

    fn try_from(value: Wrapper<Value>) -> Result<Self, Self::Error> {
        let s: String = value.try_into()?;
        s.parse()
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

impl TryFrom<Wrapper<Value>> for u32 {
    type Error = Error;

    fn try_from(value: Wrapper<Value>) -> Result<Self, Self::Error> {
        match value.0 {
            Value::Number(num) => Ok(num.as_int() as u32),
            _ => Err(Error::ValueConversionError("i64")),
        }
    }
}

impl TryFrom<Wrapper<Value>> for f32 {
    type Error = Error;

    fn try_from(value: Wrapper<Value>) -> Result<Self, Self::Error> {
        match value.0 {
            Value::Number(num) => Ok(num.as_float() as f32),
            _ => Err(Error::ValueConversionError("f32")),
        }
    }
}

impl TryFrom<Wrapper<Value>> for Date {
    type Error = Error;

    fn try_from(value: Wrapper<Value>) -> Result<Self, Self::Error> {
        let mut obj: Object = value.try_into()?;
        Ok(Date {
            year: obj.try_take("year")?,
            month: obj.try_take("month")?,
            day: obj.try_take("day")?,
        })
    }
}

impl TryFrom<Wrapper<Value>> for (Date, f32) {
    type Error = Error;

    fn try_from(value: Wrapper<Value>) -> Result<Self, Self::Error> {
        let mut obj: Object = value.try_into()?;
        Ok((obj.try_take("date")?, obj.try_take("value")?))
    }
}
