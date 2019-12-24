use diesel;
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use super::schema::users;


#[table_name = "users"]
#[derive(AsChangeset, Serialize, Deserialize, Queryable, Insertable)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
    pub is_admin: bool,
    pub token: String,
}

#[derive(Deserialize, Queryable)]
pub struct UserVo {
    pub username: String,
    pub is_admin: bool,
    pub token: String
}

impl User {

    pub fn create(user: User, connection: &MysqlConnection) -> User {
        diesel::insert_into(users::table)
            .values(&user)
            .execute(connection)
            .expect("Error creating new hero");
        users::table.order(users::id.desc()).first(connection).unwrap()
    }

    pub fn read(connection: &MysqlConnection) -> Vec<User> {
        users::table.order(users::id.asc()).load::<User>(connection).unwrap()
    }

    pub fn update(id: i32, user: User, connection: &MysqlConnection) -> bool {
        diesel::update(users::table.find(id)).set(&user).execute(connection)
        .is_ok()
    }

    pub fn delete(id: i32, connection: &MysqlConnection) -> bool {
        diesel::delete(users::table.find(id)).execute(connection).is_ok()
    }

    // pub fn login(username: &str, password: &str, connection: &MysqlConnection) -> UserVo {
    //     let result = users::table.select(users::username.eq(username));
    //     let username = String::from(username);
    //     let token = "".to_string();
    //     let is_admin = false;
    //     return UserVo {
    //         username,
    //         is_admin,
    //         token
    //     }
    // }
}