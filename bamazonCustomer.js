var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;

  start();
});

function start() {
  inquirer
    .prompt({
      name: "display",
      type: "list",
      message: "Welcome to Bamazon! Would you like to browse our products?",
      choices: ["Yes!", "No"]
    })
    .then(function (answer) {
      if (answer.display === "Yes!") {
        display();
      } else if (answer.display === "No") {
        connection.end();
      }
    });
}

function doAgain() {
  inquirer
    .prompt({
      name: "none",
      type: "list",
      message: "Would you like to browse other products?",
      choices: ["Yes!", "No"]
    })
    .then(function (answer) {
      if (answer.none === "Yes!") {
        display();
      } else if (answer.none === "No") {
        connection.end();
      }
    });
}

function display() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      console.log("-------------------");
      console.log("ID Number: " + results[i].id);
      console.log("Product Name: " + results[i].product_name);
      console.log("Price: $" + results[i].price);
    }
    input();
  });

  function input() {
    inquirer
      .prompt([
        {
          name: "idchoice",
          type: "input",
          message: "If you would like to purchase a product, please input the product's ID number:"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function (answer) {
        connection.query(
          "SELECT * FROM products WHERE id = ?",
          [parseInt(answer.idchoice)],
          function (err, res) {
            if (err) throw err;
            var quantity = parseInt(res[0].stock_quantity);
            if (quantity <= parseInt(answer.quantity)) {
              console.log("Insufficient quantity!");
              doAgain();
            } else if (quantity >= parseInt(res[0].stock_quantity)) {
              var product = res[0].product_name;
              var chosenID = parseInt(res[0].id);
              var totalPrice =
                parseInt(res[0].price) * parseInt(answer.quantity);
              var updatedQuantity = (parseInt(res[0].stock_quantity) = parseInt(
                answer.quantity
              ));
              connection.query(
                "Update products Set ? Where ?",
                [
                  {
                    stock_quantity: updatedQuantity
                  },
                  {
                    id: chosenID
                  }
                ],
                function (err, results) {
                  if (err) throw err;
                  console.log("-------------");
                  console.log("Your purchase was succesful!");
                  console.log("-------------");
                  console.log("Your total was $" + totalPrice + ".");
                  console.log("Thank you for shopping with us");
                  console.log("-------------");
                }
              );
              connection.query(
                "Select * FROM products WHERE id = ?",
                [parseInt(answer.idchoice)],
                function (err, res) {
                  if (err) throw err;
                  console.log(product + "s left: " + res[0].stock_quantity);
                  console.log("----------");
                  console.log("----------");
                  console.log("----------");
                  doAgain();
                }
              );
            }
          }
        );
      });
  }
}
