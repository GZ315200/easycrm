#![feature(plugin)]
#![plugin(rocket_codegen)]
extern crate rocket;
extern crate rocket_contrib;

#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_migrations;
embed_migrations!("./migrations");

extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;

extern crate r2d2_diesel;
extern crate r2d2;

mod schema;
mod db;
mod route;
mod model;

use self::route::user::*;

fn main() {
    let database_url = std::env::var("DATABASE_URL").expect("Database url must be set.");
    let p = db::init(&database_url);
    embedded_migrations::run(&*p.clone().get().expect("connection instance."))
    .expect("Could run migrations");

    rocket::ignite()
    .manage(p)
    .mount("/", [health])
    .launch();

}
