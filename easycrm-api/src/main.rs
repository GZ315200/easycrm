#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;

use rocket_contrib::json::{Json, JsonValue};

mod customers;
mod progress;
mod users;
use customers::{Customer};
use progress::{Progress};
// use users::{User};


#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate r2d2;
extern crate r2d2_diesel;
mod db;
pub mod schema;

#[get("/index")]
fn index() -> String {
    format!("Welcome")
}

#[post("/customer", data = "<customer>")]
fn create_customer(customer: Json<Customer>, connection: db::Connection) -> Json<Customer> {
    let insert = Customer { ..customer.into_inner() };
    Json(Customer::create(insert, &connection))
}

#[get("/customer")]
fn read_customer(connection: db::Connection) -> Json<JsonValue> {
    Json(json!(Customer::read(&connection)))
}

#[put("/customer/<id>", data = "<customer>")]
fn update_customer(id: i32, customer: Json<Customer>, connection: db::Connection) -> Json<JsonValue> {
    let update = Customer { id: id, ..customer.into_inner() };
    Json(json!({
        "success": Customer::update(id, update, &connection)
    }))
}

#[delete("/customer/<id>")]
fn delete_customer(id: i32, connection: db::Connection) -> Json<JsonValue> {
    Json(json!({
        "success": Customer::delete(id, &connection)
    }))
}


#[post("/progress", data = "<progress>")]
fn create_progress(progress: Json<Progress>, connection: db::Connection) -> Json<Progress> {
    let insert = Progress { ..progress.into_inner() };
    Json(Progress::create(insert, &connection))
}

#[get("/progress")]
fn read_progress(connection: db::Connection) -> Json<JsonValue> {
    Json(json!(Progress::read(&connection)))
}

#[put("/progress/<id>", data = "<progress>")]
fn update_progress(id: i32, progress: Json<Progress>, connection: db::Connection) -> Json<JsonValue> {
    let update = Progress { id: id, ..progress.into_inner() };
    Json(json!({
        "success": Progress::update(id, update, &connection)
    }))
}

#[delete("/progress/<id>")]
fn delete_progress(id: i32, connection: db::Connection) -> Json<JsonValue> {
    Json(json!({
        "success": Progress::delete(id, &connection)
    }))
}

// #[post("/login")]
// fn login(user: Json<User>, connection: db::Connection) -> Json<User> {
//     Json(json!({
//         "success": User::read(connection)
//     }))
// }

fn main() {
    rocket::ignite()
    .mount("/", routes![index])
    .mount("/api", routes![create_customer, read_customer, update_customer, delete_customer, create_progress,read_progress, update_progress, delete_progress])
    .manage(db::connect())
    .launch();
}
