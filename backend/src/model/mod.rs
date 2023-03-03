//! The model module contains all types used in
//! messages across the app.
//!
//! Server endpoints will use the model controller to interact
//! with the database and send and recieve types defined in
//! this module.

pub mod users;
pub mod widgets;

use serde::Serialize;
use ts_rs::TS;
