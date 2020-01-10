table! {
    customers (id) {
        id -> Integer,
        org_name -> Nullable<Varchar>,
        legel_person_name -> Nullable<Varchar>,
        legel_contract -> Nullable<Varchar>,
        agent -> Nullable<Varchar>,
        agent_contract -> Nullable<Varchar>,
        email -> Nullable<Varchar>,
        website -> Nullable<Varchar>,
        sisuation -> Nullable<Varchar>,
        found_time -> Nullable<Varchar>,
        business_scope -> Nullable<Varchar>,
        create_time -> Timestamp,
        update_time -> Timestamp,
    }
}

table! {
    progress (id) {
        id -> Integer,
        client_name -> Nullable<Varchar>,
        demands -> Nullable<Varchar>,
        process -> Integer,
        create_time -> Timestamp,
        update_time -> Timestamp,
    }
}

table! {
    users (id) {
        id -> Integer,
        username -> Varchar,
        password -> Varchar,
        is_admin -> Bool,
        token -> Varchar,
    }
}

allow_tables_to_appear_in_same_query!(customers, progress, users,);
