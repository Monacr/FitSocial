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

/// For now, all mutation queries will return an {id} struct.
/// Note: Keep it light, and client can do a get if needed.
#[derive(TS, Serialize, Clone)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub struct MutateResultData {
    pub id: String,
}

impl From<String> for MutateResultData {
    fn from(id: String) -> Self {
        MutateResultData { id }
    }
}
