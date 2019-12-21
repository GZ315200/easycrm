use diesel;
use rocket_contrib::json::Json;
use diesel::prelude::*;

use crate::schema::users;
use crate::schema::users::dsl::*;
use crate::db::DbConn;
use crate::model::user::*;


//#[post("/login")]
//pub fn login(conn: DbConn, user_post: Json<UserPost>) -> Json<bool> {
//
//    return Json(true);
//}

#[get("/health")]
pub fn health() -> Json<()> {
    Json(())
}

//#[get("/posts")]
//pub fn get_posts(conn: DbConn) -> QueryResult<Json<Vec<Post>>> {
//  posts.filter(published.eq(true))
//    .order(id.desc())
//    .limit(5)
//    .load::<Post>(&*conn)
//    .map(|xs| Json(xs))
//}

