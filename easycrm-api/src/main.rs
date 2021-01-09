#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;

use rocket::http::{Cookie, Cookies};
use rocket_contrib::json::{Json, JsonValue};

mod customers;
mod progress;
mod users;
use customers::{Customer, CustomerDto};
use progress::Progress;
use users::{User, UserLogin, UserVo};

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

#[post("/customer", data = "<dto>")]
fn create_customer(dto: Json<CustomerDto>, connection: db::Connection) -> Json<JsonValue> {
    let insert = CustomerDto {
        ..dto.into_inner()
    };
    return Json(json!({
        "code": "000",
        "msg": "成功",
        "data": Customer::create(insert, &connection)
    }));
}

#[get("/customer")]
fn read_customer(connection: db::Connection) -> Json<JsonValue> {
    return Json(json!({
        "code": "000",
        "msg": "成功",
        "data": Customer::read(&connection)
    }));
}

#[put("/customer/<id>", data = "<customer>")]
fn update_customer(
    id: i32,
    customer: Json<CustomerDto>,
    connection: db::Connection,
) -> Json<JsonValue> {
    let update = CustomerDto {
        ..customer.into_inner()
    };
    Json(json!({ 
        "code": "000",
        "msg": "成功",
        "data": Customer::update(id, update, &connection) 
    }))
}

#[delete("/customer/<id>")]
fn delete_customer(id: i32, connection: db::Connection) -> Json<JsonValue> {
    Json(json!({ 
        "code": "000",
        "msg": "成功",
        "data": Customer::delete(id, &connection) 
    }))
}

#[post("/progress", data = "<progress>")]
fn create_progress(progress: Json<Progress>, connection: db::Connection) -> Json<JsonValue> {
    let insert = Progress {
        ..progress.into_inner()
    };
    return Json(json!({
        "success": true,
        "data": Progress::create(insert, &connection)
    }));
}

#[get("/progress")]
fn read_progress(connection: db::Connection) -> Json<JsonValue> {
    return Json(json!({
        "success": true,
        "data": Progress::read(&connection)
    }));
}

#[put("/progress/<id>", data = "<progress>")]
fn update_progress(
    id: i32,
    progress: Json<Progress>,
    connection: db::Connection,
) -> Json<JsonValue> {
    let update = Progress {
        id: id,
        ..progress.into_inner()
    };
    Json(json!({ "data": Progress::update(id, update, &connection) }))
}

#[delete("/progress/<id>")]
fn delete_progress(id: i32, connection: db::Connection) -> Json<JsonValue> {
    Json(json!({ "data": Progress::delete(id, &connection) }))
}

#[post("/user", data = "<user>")]
fn create_user(
    user: Json<User>,
    cookies: Cookies,
    connection: db::Connection,
) -> Json<JsonValue> {
    let token: &Cookie = cookies.get("token").unwrap();
    let value = &token.value();
    if value.is_empty() {
        return Json(json!({
            "success": false ,
            "msg": "this user has already loggined."
        }));
    } else {
        let insert = User {
            ..user.into_inner()
        };
        return Json(json!({
            "success": true ,
            "data": User::create(insert, &connection)
        }));
    }
}

#[post("/login", data = "<user>")]
fn login(
    user: Json<UserLogin>,
    mut cookies: Cookies,
    connection: db::Connection,
) -> Json<JsonValue> {
    let cookie = cookies.get("token");
    if cookie.is_some() {
        return Json(json!({
            "success": false ,
            "msg": "this user has already loggined."
        }));
    } else {
        let login = UserLogin {
            ..user.into_inner()
        };
        let user_data: UserVo = User::login(login, &connection);
        if !&user_data.token.is_empty() {
            cookies.add(Cookie::new("token", user_data.token.clone()));
        };
        return Json(json!({
            "success": true,
            "data": &user_data
        }));
    }
}

#[post("/logout")]
fn logout(mut cookies: Cookies) -> Json<JsonValue> {
    cookies.remove(Cookie::named("token"));
    return Json(json!( { "success": true } ));
}

fn main() {
    rocket::ignite()
        .mount("/", routes![index])
        .mount(
            "/api/v1",
            routes![
                create_customer,
                read_customer,
                update_customer,
                delete_customer,
                create_progress,
                read_progress,
                update_progress,
                delete_progress,
                login,
                logout,
                create_user
            ],
        )
        .manage(db::connect())
        .launch();
}
