var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
// var bamazon = require("./bamazonCustomer")

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 8889,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId + "\n");

});


module.exports = connection;
