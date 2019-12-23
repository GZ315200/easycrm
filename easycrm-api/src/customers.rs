extern crate chrono;
use std::i32;
use chrono::{NaiveDateTime};
use diesel;
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use super::schema::customers;

#[table_name = "customers"]
#[derive(AsChangeset, Serialize, Deserialize, Queryable, Insertable)]
pub struct Customer {
    pub id: i32,
    pub org_name: Option<String>,
    pub legel_person_name: Option<String>,
    pub legel_contract: Option<String>,
    pub agent: Option<String>,
    pub agent_contract: Option<String>,
    pub email: Option<String>,
    pub website: Option<String>,
    pub sisuation: Option<String>,
    pub found_time: Option<String>,
    pub business_scope: Option<String>,
    pub create_time: NaiveDateTime,
    pub update_time: NaiveDateTime
}

impl Customer {
    pub fn create(customer: Customer, connection: &MysqlConnection) -> Customer {
        diesel::insert_into(customers::table)
            .values(&customer)
            .execute(connection)
            .expect("Error creating new hero");

        customers::table.order(customers::id.desc()).first(connection).unwrap()
    }

    pub fn read(connection: &MysqlConnection) -> Vec<Customer> {
        customers::table.order(customers::id.asc()).load::<Customer>(connection).unwrap()
    }

    pub fn update(id: i32, customer: Customer, connection: &MysqlConnection) -> bool {
        diesel::update(customers::table.find(id)).set(&customer).execute(connection).is_ok()
    }

    pub fn delete(id: i32, connection: &MysqlConnection) -> bool {
        diesel::delete(customers::table.find(id)).execute(connection).is_ok()
    }

}