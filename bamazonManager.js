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
            message: "\n * * * Bamazon Manager Menu * * * \n\n What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    addToInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function viewProducts() {
    console.log("\nDisplaying all products...\n");
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // for (var i = 0; i < results.length; i++) {
        //     console.log("$" + results[i].price + " || " + results[i].product_name + " || " + results[i].item_id + " || " + " Units: " + results[i].stock_quantity);
        // }

        console.log(Table.print(results));

        console.log("\n");
        mainMenu();
    });
}

function viewLowInventory() {
    console.log("\nDisplaying products with low inventory...\n");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        // if (err) throw err;
        // for (var i = 0; i < results.length; i++) {
        //     console.log("$" + results[i].price + " || " + results[i].product_name + " || " + results[i].item_id + " || " + " Units: " + results[i].stock_quantity);
        // }
        console.log(Table.print(results));

        console.log("\n");
        mainMenu();
    });
}

function addToInventory() {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "input",
                message: "Enter the ID of the product to add to its inventory: "
            },
            {
                name: "qty",
                type: "input",
                message: "Enter the number of new units: "
            }
        ])
        .then(function (answer) {
            connection.query("SELECT * FROM products", function (err, results) {
                var chosenItem;
                if (err) throw err;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.choice)) {
                        chosenItem = results[i];
                    }
                }
                console.log("\nYour selection: " + chosenItem.product_name + " \nUnits: " + parseInt(answer.qty));
                var newInventoryTotal = parseInt(chosenItem.stock_quantity) + parseInt(answer.qty);
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newInventoryTotal
                        },
                        {
                            item_id: answer.choice
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("\nUpdate successful!");
                        viewProducts();
                    }
                );
            });
        })
}

function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "Enter the product name: "
            },
            {
                name: "department",
                type: "input",
                message: "Enter the department name: "
            },
            {
                name: "price",
                type: "input",
                message: "Enter the price: "
            },
            {
                name: "qty",
                type: "input",
                message: "Enter the number of units: "
            },
        ])
        .then(function (answer) {
            var price = parseInt(answer.price);
            var stock = parseInt(answer.qty);
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.product,
                    department_name: answer.department,
                    price: price,
                    stock_quantity: stock,
                    product_sales: 0
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " product inserted!\n");
                    mainMenu();
                }
            )
        })
}