var mysql = require("mysql");
var inquirer = require("inquirer");

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
            message: "What would you like to do?",
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

// function viewProducts() {
//     inquirer
//         .prompt({
//             name: "product",
//             type: "input",
//             message: "What product would you like to search for?"
//         })
//         .then(function (answer) {
//             var query = "SELECT position, song, year FROM top5000 WHERE ?";
//             connection.query(query, { product: answer.product }, function (err, res) {
//                 if (err) throw err;
//                 for (var i = 0; i < res.length; i++) {
//                     console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//                 }
//                 mainMenu();
//             });
//         });
// }

function viewProducts() {
    console.log("\nDisplaying all products...\n");
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("$" + results[i].price + " || " + results[i].product_name + " || " + results[i].item_id + " || " + " Units: " + results[i].stock_quantity);
        }
        console.log("\n");
        mainMenu();
    });
}

function viewLowInventory() {
    console.log("\nDisplaying products with low inventory...\n");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("$" + results[i].price + " || " + results[i].product_name + " || " + results[i].item_id + " || " + " Units: " + results[i].stock_quantity);
        }
        console.log("\n");
        mainMenu();
    });
}

