var connection = require("./bamazon");
var Table = require("cli-table");
var inquirer = require("inquirer");

var divider = "\n------------------------------------------------------------\n\n";

function readProducts() {
    console.log(divider);
    console.log("WELCOME TO BAMAZON. HERE ARE A LIST OF ALL PRODUCTS FOR SALE:\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Department", "Price", "Quantity"],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].id, res[i].product_name, res[i].dept_name, res[i].customer_price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        console.log(divider);
        buy();
    });
}
readProducts();


function buy() {
    inquirer
        .prompt([
        {
            name: "itemID",
            type: "input",
            message: "What is the item ID # of the product you would like to buy?",
            filter: Number
        },
        {
            name: "orderNum",
            type: "input",
            message: "How many units of the product would you like to buy?",
            filter: Number
            }
        ]).then(function(answers){
        var quantityNeeded = answers.orderNum;
        var IDrequested = answers.itemID;
        purchaseOrder(IDrequested, quantityNeeded);
    })
};

function purchaseOrder(ID, amtNeeded){
	connection.query('Select * FROM products WHERE id = ' + ID, function(err,res){
		if (err) throw err;
		if(amtNeeded <= res[0].stock_quantity){
			var totalCost = res[0].customer_price * amtNeeded;
			console.log("Good news your order is in stock!");
			console.log("Your total cost for " + amtNeeded + " " +res[0].product_name + " is " + totalCost + ". Thank you!");

			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + " WHERE id = " + ID);
		} else{
            console.log(divider);
            console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + " to complete your order.");
        };
        divider;
		readProducts();
	});
};



