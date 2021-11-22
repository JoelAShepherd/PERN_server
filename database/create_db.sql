CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    unit_price NUMERIC(5, 2),
    in_stock INTEGER,
    description TEXT
)
