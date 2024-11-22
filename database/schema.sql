DROP TABLE IF EXISTS menuitems;

CREATE TYPE category_enum AS ENUM('breakfast','lunch','dinner','beverage');

CREATE TABLE menuitems (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL UNIQUE,
  description VARCHAR(1000) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  category category_enum NOT NULL
);

DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(60) NOT NULL,
  phone_number VARCHAR(10) NOT NULL,
  address VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL
);

DROP TABLE IF EXISTS order_items;
CREATE TABLE order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  item_name VARCHAR(60) NOT NULL,
  price VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL
);