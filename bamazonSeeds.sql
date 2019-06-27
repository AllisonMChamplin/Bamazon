DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,  
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skateboard", "sporting goods", 28.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("paddle board", "sporting goods", 458.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eucalyptus wreath", "decor", 18.95, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ceramic teapot", "decor", 68.90, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skittles", "grocery", 1.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("popcorn", "grocery", 1.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cauliflower rice", "grocery", 1.00, 20);



SELECT * FROM products;
