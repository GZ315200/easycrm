use crate::schema::users;

#[derive(Queryable, Serialize)]
pub struct Users {
    pub id: i32,
    pub username: String,
    pub password: String,
    pub admin: bool,
}

#[derive(Insertable, Deserialize)]
#[table_name="users"]
pub struct UserPost {
    pub username: String,
    pub password: String,
}
