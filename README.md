# Bamazon with Node.js and MySQL
A simple command line MySQL database-driven storefront written with Node.js that takes in orders from customers and depletes stock from the store's inventory. Bamazon consists of three Node.js apps: 
* Customer - Customers are presented with a product list table, and can place orders for a single item with a custom quantity.

* Manager - Managers can view the product list table, view products with low inventory, update the inventory, and add new products.

* Supervisor - Supervisors can view a table of product sales by department. Supervisors can also add a department to the database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Or if you're curious!

### Prerequisites

You will need the following to install:
* [Node.js](https://nodejs.org/en/) Node.js is the open source server environment used.
* [NPM mysql](https://www.npmjs.com/package/mysql) - This is a Node.js driver for mysql.
* [NPM Inquirer.js](https://www.npmjs.com/package/inquirer) - Inquirer.js provides the user prompt interface and the inquiry session flow.
* [NPM Easy Table](https://www.npmjs.com/package/easy-table) - Easy Table is a nice utility for rendering text tables with javascript.


### Installing

1. Clone the repository
2. Run npm install in the main directory
3. Start the app from your command prompt: 
- For the Customer View: 
    ```javascript
    node bamazoncustomer.js;
    ```
- For the Manager View:
    ```javascript
    node bamazonmanager.js;
    ```
- For the Supervisor View:
    ```javascript
    node bamazosupervisor.js;
    ```

### Demos
Customer View app in action:
<br><br>
<img src="https://allisonmchamplin.github.io/assets/images/bamazon-customer-demo.gif" width="650" title="Demo video"><br><br>
    Manager View app:<br><br>
<img src="https://allisonmchamplin.github.io/assets/images/bamazon-manager-demo.gif" width="650" title="Demo video">
<br><br>
    Supervisor View app<br><br>
<img src="https://allisonmchamplin.github.io/assets/images/bamazon-supervisor-demo.gif" width="650" title="Demo video">
<br>


## Built With

* [Node.js](https://nodejs.org/en/) - Node.js is the open source server environment used.
* [NPM mysql](https://www.npmjs.com/package/mysql) - This is a Node.js driver for mysql.
* [NPM Inquirer.js](https://www.npmjs.com/package/inquirer) - Inquirer.js provides the user prompt interface and the inquiry session flow.
* [NPM Easy Table](https://www.npmjs.com/package/easy-table) - Easy Table is a nice utility for rendering text tables with javascript.


