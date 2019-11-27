var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
        host:"localHost",
        port: 8282,
        user: "root",
        password: "password",
        database: "bamazon_db"
});

connection.connect(function(err){
    console.log("connected as id: "+connection.ThreadId);

})

function start(){

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("---------------")
            console.log("ID number: " + results[i].id)
            console.log("Product Name: " + results[i].name)
            console.log("Price: $" + results[i].price)
        }
        input();

        })
        function input() {
            inquirer
                .prompt([
                    {
                        name: "chooseid",
                        type: "input",
                        message: "Please input the ID of the product you would like to purchase:"
                    }
                    ,
                    {
                        name: "quantity",
                        type: "input",
                        message: "How many would you like to purchase?"
                    }
                ])
                .then(function(answer) {
                    connection.query("SELECT * FROM products WHERE id = ?", 
                    [
                        parseInt(answer.chooseid)
                    ],
                      function(err, res) {
                        if (err) throw err;
                        var quantity = parseInt(res[0].stock_quantity)
                        // console.log(quantity)
                        if (quantity <= parseInt(answer.quantity)) {
                            console.log("Insufficient quantity!")
                        }
                        else if (quantity >= parseInt(res[0].stock_quantity)) {
                            var total = parseInt(res[0].price) * parseInt(answer.quantity)
                            console.log("Your order has been confirmed! Your total was $" + total + ". Thank you for shopping with Bamazon.")
                        }
                      }
                    );

                });
            }
        }       

​
​


//The app should then prompt users with two messages.

//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.
//Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
//However, if your store does have enough of the product, you should fulfill the customer's order.

//This means updating the SQL database to reflect the remaining quantity.
//Once the update goes through, show the customer the total cost of their purchase.