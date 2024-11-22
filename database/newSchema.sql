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

CREATE SEQUENCE daily_order_seq START 1;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_id INT NULL DEFAULT nextval('daily_order_seq'),
  customer_name VARCHAR(60) NOT NULL,
  phone_number VARCHAR(10) NOT NULL,
  address VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL,
  order_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE sequence_control (
    sequence_name TEXT PRIMARY KEY,
    last_reset_date DATE NOT NULL
);

-- Initialize it with the current date for your sequence
INSERT INTO sequence_control (sequence_name, last_reset_date)
VALUES ('daily_order_seq', CURRENT_DATE);

CREATE OR REPLACE FUNCTION reset_daily_order_seq()
RETURNS TRIGGER AS $$
DECLARE
    last_reset DATE;
BEGIN
    -- Get the last reset date from the sequence_control table
    SELECT last_reset_date INTO last_reset
    FROM sequence_control
    WHERE sequence_name = 'daily_order_seq';

    -- Check if the current date is different from the last reset date
    IF last_reset IS NULL OR last_reset <> CURRENT_DATE THEN
        -- Reset the sequence to 1
        PERFORM setval('daily_order_seq', 1, false);

        -- Update the last reset date in the sequence_control table
        UPDATE sequence_control
        SET last_reset_date = CURRENT_DATE
        WHERE sequence_name = 'daily_order_seq';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reset_sequence_trigger
BEFORE INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION reset_daily_order_seq();

DROP TABLE IF EXISTS order_items;
CREATE TABLE order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id VARCHAR(60) REFERENCES orders(id) ON DELETE CASCADE,
  item_name VARCHAR(60) NOT NULL,
  price VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL
);