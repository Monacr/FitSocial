//! Model and controller methods for fitness stats

use std::{collections::HashMap, str::FromStr};

use maplit::btreemap;
use serde::{Deserialize, Serialize};
use surrealdb::sql::{Array, Object, Value};
use ts_rs::TS;

use crate::{
    prelude::*,
    store::{Creatable, Store, TryTake, Updatable},
};

use super::MutateResultData;

/// Types of widgets possible
#[derive(Debug, Serialize, TS, Clone, Copy, Deserialize, PartialEq, Eq)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub enum WidgetType {
    Weight,
    Squat,
    BenchPress,
    Deadlift,
    Steps,
}

impl ToString for WidgetType {
    fn to_string(&self) -> String {
        match self {
            WidgetType::Weight => "Weight",
            WidgetType::Squat => "Squat",
            WidgetType::BenchPress => "Bench Press",
            WidgetType::Deadlift => "Deadlift",
            WidgetType::Steps => "Steps",
        }
        .to_string()
    }
}

impl FromStr for WidgetType {
    type Err = Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "Weight" => Ok(WidgetType::Weight),
            "Squat" => Ok(WidgetType::Squat),
            "BenchPress" => Ok(WidgetType::BenchPress),
            "Deadlift" => Ok(WidgetType::Deadlift),
            "Steps" => Ok(WidgetType::Steps),
            _ => Err(Error::InvalidData),
        }
    }
}

#[derive(Debug, Serialize, TS, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub struct Date {
    pub year: u32,
    pub month: u32,
    pub day: u32,
}

impl From<Date> for Value {
    fn from(date: Date) -> Self {
        let data = btreemap! {
            "year".into() => date.year.into(),
            "month".into() => date.month.into(),
            "day".into() => date.day.into(),
        };
        Value::Object(data.into())
    }
}

/// Represents a widget owned by a user and its corresponding data
#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub struct Widget {
    pub user: String,
    pub widget_type: WidgetType,
    pub entries: Vec<(Date, f32)>,
}

impl From<Wrapper<Vec<(Date, f32)>>> for Value {
    fn from(vec: Wrapper<Vec<(Date, f32)>>) -> Self {
        let entries: Vec<_> = vec
            .0
            .into_iter()
            .map(|(date, value)| {
                Value::Object(
                    {
                        btreemap! {
                            "date".into() => date.into(),
                            "value".into() => value.into(),
                        }
                    }
                    .into(),
                )
            })
            .collect();

        entries.into()
    }
}

impl From<Widget> for Value {
    fn from(widget: Widget) -> Self {
        let mut data = btreemap! {
            "user".into() => widget.user.into(),
            "widget_type".into() => widget.widget_type.to_string().into(),
            "entries".into() => Wrapper(widget.entries).into(),
        };

        Value::Object(data.into())
    }
}

impl TryFrom<Object> for Widget {
    type Error = Error;

    fn try_from(mut obj: Object) -> Result<Self, Self::Error> {
        let widget = Widget {
            user: obj.try_take("user")?,
            widget_type: obj.try_take("widget_type")?,
            entries: obj.try_take("entries")?,
        };

        Ok(widget)
    }
}

impl Creatable for Widget {}

/// Struct containing data to append to a widget
#[derive(Debug, Deserialize, TS)]
#[ts(export, export_to = "../frontend/src/bindings/")]
pub struct AppendWidgetEntry {
    pub user: String,
    pub widget_type: WidgetType,
    pub date: Date,
    pub value: f32,
}

struct WidgetUpdate {
    entries: Vec<(Date, f32)>,
}

impl From<WidgetUpdate> for Value {
    fn from(widget_u: WidgetUpdate) -> Self {
        let data = btreemap! {
            "entries".into() => Wrapper(widget_u.entries).into(),
        };

        Value::Object(data.into())
    }
}

impl Updatable for WidgetUpdate {}

pub struct WidgetController;

impl WidgetController {
    pub const TABLE: &'static str = "widget";

    pub fn widget_name(widget_type: WidgetType, user: &str) -> String {
        format!("{user}|{}", widget_type.to_string())
    }
    pub async fn add_widget(
        store: &Store,
        widget_type: WidgetType,
        user: &str,
    ) -> Result<MutateResultData, Error> {
        let widget = Widget {
            user: user.to_string(),
            widget_type,
            entries: Vec::new(),
        };

        store
            .exec_create(
                Self::TABLE,
                widget,
                Some(&Self::widget_name(widget_type, user)),
            )
            .await
    }

    pub async fn append_entry(store: &Store, entry: AppendWidgetEntry) -> Result<Widget, Error> {
        let mut widget = Self::get_widget(store, entry.widget_type, &entry.user).await?;

        widget.entries.push((entry.date, entry.value));

        let id = &format!(
            "{}:{}",
            Self::TABLE,
            &Self::widget_name(entry.widget_type, &entry.user)
        );

        store
            .exec_update(
                id,
                WidgetUpdate {
                    entries: widget.entries.clone(),
                },
            )
            .await?;

        Ok(widget)
    }

    pub async fn get_widget(
        store: &Store,
        widget_type: WidgetType,
        user: &str,
    ) -> Result<Widget, Error> {
        let id = &format!("{}:{}", Self::TABLE, &Self::widget_name(widget_type, user));

        store.exec_get(id).await
    }
}

#[cfg(test)]
mod tests {
    use crate::model::widgets::{AppendWidgetEntry, Date, WidgetController, WidgetType};
    use crate::store::Store;

    #[tokio::test]
    async fn create_widget() {
        let store = Store::try_new_memory().await.unwrap();

        let user = "test";

        let res_id = WidgetController::add_widget(&store, WidgetType::Deadlift, user)
            .await
            .expect("Creating a widget failed")
            .id;

        dbg!(res_id);
    }

    #[tokio::test]
    async fn get_widget() {
        let store = Store::try_new_memory().await.unwrap();

        let user = "test";

        let res_id = WidgetController::add_widget(&store, WidgetType::Deadlift, user)
            .await
            .expect("Creating a widget failed")
            .id;

        WidgetController::get_widget(&store, WidgetType::Deadlift, user)
            .await
            .expect("Getting a widget failed");
    }

    #[tokio::test]
    async fn update_widget() {
        let store = Store::try_new_memory().await.unwrap();

        let user = "test";

        let res_id = WidgetController::add_widget(&store, WidgetType::Deadlift, user)
            .await
            .expect("Creating a widget failed")
            .id;

        const N: usize = 10;
        for i in 0..N {
            let entry = AppendWidgetEntry {
                user: user.to_string(),
                widget_type: WidgetType::Deadlift,
                date: Date {
                    year: 2023,
                    month: 12,
                    day: 20 + i as u32,
                },
                value: 135.0 + 90.0 * i as f32,
            };

            let mut res = WidgetController::append_entry(&store, entry)
                .await
                .expect("Appending entry failed");

            res.entries.sort_by_key(|v| v.0.clone());

            assert_eq!(res.widget_type, WidgetType::Deadlift);
            assert_eq!(res.user, user);
            assert_eq!(res.entries.len(), i + 1);
            assert_eq!(res.entries.last().unwrap().1, 135.0 + 90.0 * i as f32);
        }

        let mut res = WidgetController::get_widget(&store, WidgetType::Deadlift, user)
            .await
            .expect("Getting a widget failed");

        res.entries.sort_by_key(|v| v.0.clone());

        assert_eq!(res.widget_type, WidgetType::Deadlift);
        assert_eq!(res.user, user);
        assert_eq!(res.entries.len(), N);
        for (i, v) in res.entries.iter().enumerate() {
            assert_eq!(v.1, 135.0 + 90.0 * i as f32);
        }
    }
}
