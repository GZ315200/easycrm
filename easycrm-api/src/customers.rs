extern crate chrono;

use super::schema::customers;
use chrono::*;
use diesel;
use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use std::i32;


#[derive(Queryable, Serialize, Deserialize)]
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
    pub update_time: NaiveDateTime,
}


#[derive(AsChangeset, Serialize, Deserialize, Insertable)]
#[table_name="customers"]
pub struct CustomerDto {
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
}


impl Customer {
    pub fn create(dto: CustomerDto, connection: &MysqlConnection) -> bool {        
        let new_dto = CustomerDto {
            ..dto
        };
        diesel::insert_into(customers::table)
            .values(&new_dto)
            .execute(connection)
            .is_ok()
    }

    pub fn read(connection: &MysqlConnection) -> Vec<Customer> {
        customers::table
            .order(customers::id.asc())
            .load::<Customer>(connection)
            .unwrap()
    }

    pub fn update(id: i32, dto: CustomerDto, connection: &MysqlConnection) -> bool {
        diesel::update(customers::table.find(id))
            .set(&dto)
            .execute(connection)
            .is_ok()
    }

    pub fn delete(id: i32, connection: &MysqlConnection) -> bool {
        diesel::delete(customers::table.find(id))
            .execute(connection)
            .is_ok()
    }
}
