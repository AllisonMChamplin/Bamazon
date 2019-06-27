DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,  
  product_sales DECIMAL (10,2) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skateboard", "sporting goods", 28.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("diving goggles", "sporting goods", 58.04, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eucalyptus wreath", "decor", 18.95, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ceramic teapot", "decor", 68.94, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skittles", "grocery", 10.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("popcorn", "grocery", 14.04, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cauliflower rice", "grocery", 13.21, 20);



CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Wassup", 20.00)

