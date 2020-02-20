DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price INT, 
    stock_quantity INT,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUE ("toaster", "kitchen", 20, 10),
("iphone", "electronics", 700, 10),
("table", "furniture", 70, 10),
("glasses", "accessories", 130, 10),
("scarf", "clothes", 10, 10),
("appleWatch", "electronics", 300, 10),
("plates", "kitchen", 20, 10),
("sweater", "clothes", 40, 10),
("Drive", "Books", 30, 10),
("handcuffs", "accessories", 20, 10);

