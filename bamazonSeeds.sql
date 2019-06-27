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
VALUES ("Skateboard", "Sporting Goods", 28.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Diving Goggles", "Sporting Goods", 58.04, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eucalyptus Wreath", "Decor", 18.95, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ceramic Teapot", "Decor", 68.94, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Steak", "Grocery", 10.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Popcorn", "Grocery", 14.04, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cauliflower Rice", "Grocery", 13.21, 20);



CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Sporting Goods", 20.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Decor", 20.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Grocery", 20.00);

