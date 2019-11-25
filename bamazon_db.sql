DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
use bamazon_db;

CREATE TABLE products (

id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(45) NULL,
department_name VARCHAR(45) NULL,
price integer default 0,
stock_quantity integer default 0,
PRIMARY KEY (id)
);