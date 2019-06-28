var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pinkSparkleUnikitty",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    mainMenu();
});

function mainMenu() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "\n What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewProductSalesbyDepartment();
                    break;

                case "Create New Department":
                    createNewDepartment();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function viewProductSalesbyDepartment() {
    console.log("\nDisplaying product sales by department...\n");
    connection.query(
        "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.department_name, SUM(products.product_sales) AS product_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_name", function (err, res) {
            if (err) throw err;
            console.log("\n");
            console.log(res);

            console.log("\n\n****\n");

            console.log(Table.print(res));

            // var data = [
            //     { id: 123123, desc: 'Something awesome', price: 1000.00 },
            //     { id: 245452, desc: 'Very interesting book', price: 11.45 },
            //     { id: 232323, desc: 'Yet another product', price: 555.55 }
            // ]

            // var t = new Table;

            // data.forEach(function (product) {
            //     t.cell('Product Id', product.id)
            //     t.cell('Description', product.desc)
            //     t.cell('Price, USD', product.price, Table.number(2))
            //     t.newRow()
            // })

            // console.log(t.toString());

            console.log("\n\n****\n");
            console.log("\n");
            console.log("\n");
            mainMenu();
            // connection.end();
        });
}

function createNewDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "Enter the department name: "
            },
            {
                name: "costs",
                type: "input",
                message: "Enter the overhead costs for this department: "
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    department_name: answer.department,
                    over_head_costs: answer.costs
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " product inserted!\n");
                    mainMenu();
                }
            )
        })
}