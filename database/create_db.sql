CREATE TABLE products(
    product_id INTEGER UNIQUE PRIMARY KEY,
    name VARCHAR(50),
    unit_price NUMERIC(5, 2),
    in_stock INTEGER,
    description TEXT
);
