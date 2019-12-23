extern crate chrono;
use chrono::{NaiveDateTime};
use diesel;
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use super::schema::progress;


#[table_name = "progress"]
#[derive(AsChangeset, Serialize, Deserialize, Queryable, Insertable)]
pub struct Progress {
    pub id: i32,
    pub client_name: Option<String>,
    pub demands: Option<String>,
    pub process: i32,
    pub create_time: NaiveDateTime,
    pub update_time: NaiveDateTime
}

impl Progress {

    pub fn create(prog: Progress, connection: &MysqlConnection) -> Progress {
        diesel::insert_into(progress::table)
            .values(&prog)
            .execute(connection)
            .expect("Error creating new hero");

        progress::table.order(progress::id.desc()).first(connection).unwrap()
    }

    pub fn read(connection: &MysqlConnection) -> Vec<Progress> {
        progress::table.order(progress::id.asc()).load::<Progress>(connection).unwrap()
    }

    pub fn update(id: i32, prog: Progress, connection: &MysqlConnection) -> bool {
        diesel::update(progress::table.find(id)).set(&prog).execute(connection)
        .is_ok()
    }

    pub fn delete(id: i32, connection: &MysqlConnection) -> bool {
        diesel::delete(progress::table.find(id)).execute(connection).is_ok()
    }

}