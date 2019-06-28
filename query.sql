SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.department_name, SUM(products.product_sales) AS product_sales
FROM departments
INNER JOIN products ON departments.department_name = products.department_name
GROUP BY departments.department_name;



SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.department_name, SUM(products.product_sales) AS product_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit
FROM departments
INNER JOIN products ON departments.department_name = products.department_name
GROUP BY departments.department_name;


