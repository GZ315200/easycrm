use super::schema::users;
use diesel;
use diesel::mysql::MysqlConnection;
use diesel::prelude::*;

#[table_name = "users"]
#[derive(AsChangeset, Serialize, Deserialize, Queryable, Insertable)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
    pub is_admin: bool,
    pub token: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserVo {
    pub username: String,
    pub is_admin: bool,
    pub token: String,
}

#[derive(Serialize, Deserialize)]
pub struct UserLogin {
    pub usernmae: String,
    pub password: String,
}

impl User {
    pub fn create(user: User, connection: &MysqlConnection) -> User {
        diesel::insert_into(users::table)
            .values(&user)
            .execute(connection)
            .expect("Error creating new user");
        users::table
            .order(users::id.desc())
            .first(connection)
            .unwrap()
    }

    pub fn read(connection: &MysqlConnection) -> Vec<User> {
        users::table
            .order(users::id.asc())
            .load::<User>(connection)
            .unwrap()
    }

    pub fn update(id: i32, user: User, connection: &MysqlConnection) -> bool {
        diesel::update(users::table.find(id))
            .set(&user)
            .execute(connection)
            .is_ok()
    }

    pub fn delete(id: i32, connection: &MysqlConnection) -> bool {
        diesel::delete(users::table.find(id))
            .execute(connection)
            .is_ok()
    }

    pub fn login(user: UserLogin, conn: &MysqlConnection) -> UserVo {
        let username = &user.usernmae;
        let password = &user.password;
        let is_find_username: bool = User::find_username(username, conn);
        let is_find_password: bool = User::find_password(password, conn);
        if is_find_username && is_find_password {
            let result = User::find_user_by_username(username, conn);
            return UserVo {
                username: result.username,
                is_admin: result.is_admin,
                token: result.token,
            };
        } else {
            panic!("username or password is not correct")
        }
    }

    fn find_user_by_username(username: &String, conn: &MysqlConnection) -> User {
        users::table
            .filter(users::username.eq(username))
            .first(conn)
            .unwrap()
    }

    fn find_username(username: &String, connection: &MysqlConnection) -> bool {
        let sql: String = format!("select count(*) from users where username='{}'", username);
        match connection.execute(&sql).unwrap() {
            1 => return true,
            _ => return false,
        }
    }

    fn find_password(password: &String, connection: &MysqlConnection) -> bool {
        let sql: String = format!(
            "select count(*) from users where password='{}'",
            format!("{:x}", md5::compute(password))
        );
        match connection.execute(&sql).unwrap() {
            1 => return true,
            _ => return false,
        }
    }
}
