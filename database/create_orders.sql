CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    shipping_address TEXT,
    json_items_ordered JSON,
    order_status VARCHAR DEFAULT "pending",
    order_date DATE,
    cost INTEGER
)