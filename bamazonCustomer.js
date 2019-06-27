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
    readProducts();
});

function readProducts() {
    console.log("\nDisplaying all products...\n");
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("$" + results[i].price + " || " + results[i].product_name + " || " + results[i].item_id + " || " + " Units: " + results[i].stock_quantity);
        }
        console.log("\n");
        buyProduct();
    });
}

function buyProduct() {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "input",
                message: "Enter the ID of the product you would like to buy: "
            },
            {
                name: "qty",
                type: "input",
                message: "Enter the number of units: "
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
                if (chosenItem.stock_quantity > parseInt(answer.qty)) {
                    var newQuantity = chosenItem.stock_quantity - parseInt(answer.qty);
                    var price = chosenItem.price;
                    var total = parseInt(answer.qty) * price
                    console.log("Your total: " + "$" + total);

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity,
                                product_sales: total
                            },
                            {
                                item_id: answer.choice
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("\nUpdate successful!");
                            // connection.end();
                            // console.log("price ", price);
                            readProducts();
                        }
                    );
                }
                else {
                    console.log("\nNot enough inventory. Try again... \n");
                    readProducts();
                }
            })
        })
}
// connection.end();
