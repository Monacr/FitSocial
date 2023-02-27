//! TryGet is a trait that makes it easier to get data from a
//! SurrealDB Object

use std::collections::HashMap;

use surrealdb::sql::{Object, Value};

use crate::{
    model::widgets::{Date, WidgetType},
    prelude::*,
};

/// Try to take value with provided key
pub trait TryTakeImpl<T> {
    fn try_take_impl(&mut self, key: &str) -> Result<T, Error>;
}

/// Turbofishable wrapper for TryTakeImpl
/// Do not implement directly
pub trait TryTake {
    fn try_take<T>(&mut self, key: &str) -> Result<T, Error>
    where
        Self: TryTakeImpl<T>;
}

impl<S> TryTake for S {
    fn try_take<T>(&mut self, key: &str) -> Result<T, Error>
    where
        Self: TryTakeImpl<T>,
    {
        self.try_take_impl(key)
    }
}

impl<T> TryTakeImpl<T> for Object
where
    T: TryFrom<Wrapper<Value>>,
{
    fn try_take_impl(&mut self, key: &str) -> Result<T, Error> {
        let v = self.remove(key).map(|v| Wrapper(v).try_into());
        match v {
            Some(Ok(res)) => Ok(res),
            _ => Err(Error::PropertyError(key.to_string())),
        }
    }
}
