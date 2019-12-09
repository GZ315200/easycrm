use diesel;
use r2d2;

use std::ops::Deref;
use rocket::http::Status;
use rocket::request::{self, FromRequest};
use rocket::{Request, State, Outcome};

type DbType = diesel::sqlite::SqliteConnection;

use r2d2_diesel::ConnectionManager;
type Pool = r2d2::Pool<ConnectionManager<DbType>>;
type PoolConn = r2d2::PooledConnection<ConnectionManager<DbType>>;


pub struct DbConn(pub PoolConn);

impl Deref for DbConn {
    type Target = DbType;
    fn deref(&self) -> &Self::Target { &self.0 }
}



impl<'a, 'r> FromRequest<'a, 'r> for DbConn {
    type Error = ();
    fn from_request(request: &'a Request<'r>) -> request::Outcome<DbConn, ()> {
        let pool = request.guard::<State<Pool>>()?;
        match pool.get() {
            Ok(conn) => Outcome::Success(DbConn(conn)),
            Err(_) => Outcome::Failure((Status::ServiceUnavailable, ()))
        }
    }
}

// Initializes a database pool via r2d2
pub fn init(database_url: &str) -> Pool {
    let manager = ConnectionManager::<DbType>::new(database_url);
    r2d2::Pool::new(manager).expect("db pool")
}
