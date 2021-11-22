CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(75),
    user_email VARCHAR(40),
    user_pass varchar(255),
    google_id varchar(36)
)