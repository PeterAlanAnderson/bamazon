var MySQL = require("mysql");
var inquirer = require("inquirer");

var con = MySQL.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "23isNum1!",
    database: "bamazon"
});

function Inventory(){
    this.inventory = fetchInventory(),
    this.printInventory = function(){
        console.log(this.inventory)
    }
}

function fetchInventory(){
    con.connect(function(err){
        if (err) throw err;
        console.log("connected as "+con.threadId);
        // con.query("select * from products", function(err,resp){
        //     if (err) throw err;
        //     setInventory(resp);
        //     });
    });
    
    con.end();
    console.log("ended")
}

module.exports = Inventory;