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
    readProducts();
});

function readProducts() {
    console.log("\nDisplaying all products...\n");
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // for (var i = 0; i < results.length; i++) {
        //     console.log("$" + results[i].price + " || " + results[i].product_name + " || " + results[i].item_id + " || " + " Units: " + results[i].stock_quantity);
        // }
        console.log(Table.print(results));
        
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
                console.log("\nYour selection: \n" + chosenItem.product_name + " \nUnits: " + parseInt(answer.qty));
                if (chosenItem.stock_quantity > parseInt(answer.qty)) {
                    var newQuantity = chosenItem.stock_quantity - parseInt(answer.qty);

                    // console.log("newQuantity: ", newQuantity);

                    var price = chosenItem.price;
                    // console.log("Unit Price: " + "$" + price);
                    price = parseFloat(Math.round(price * 100) / 100).toFixed(2);

                    console.log("Unit Price: " + "$" + price);

                    var total = parseInt(answer.qty) * price;
                    total = parseFloat(Math.round(total * 100) / 100).toFixed(2);
                    
                    console.log("Your total: " + "$" + total);

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity,
                                product_sales: total,
                            },
                            {
                                item_id: answer.choice
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            // if (error) console.log(error);

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
