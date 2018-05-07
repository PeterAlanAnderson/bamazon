var mySQL = require("mysql")
var inquirer = require("inquirer");
const connection = mySQL.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"23isNum1!",
    database:"bamazon"
})

var inventory = [];

function grabAndPrint(){

    connection.query("select * from products",function(err, resp){
        if(err)throw err;
        printOut(resp);

    })
    
}

function printOut(inv){
    let itemsArr = [];
    inv.forEach(element => {
        let row = "";
        row += element.item_id;
        row += ". ";
        row += element.product_name;
        row += " - $";
        row += element.price;
        itemsArr.push(row)
    });
    askToBuy(itemsArr)
}

function askToBuy(itemsArr){
    inquirer.prompt([
        {
            type:"list",
            message:"What item would you like to buy?",
            choices:itemsArr,
            name:"purchaseChoice"
        }
    ]).then(function(response){
        let responseName1 = response.purchaseChoice.split("-");
        let responseName = responseName1[0].split(".")
        let responseID = responseName[0];
        
        inquirer.prompt([
            {
                type:"input",
                message:"How many"+responseName[1]+"would you like to purchase?",
                name:"qtyToBuy"
            }
        ]).then(function(response){
            let purchaseNum = response.qtyToBuy;
            // console.log(responseID)
            compareQuantities(purchaseNum, responseID);
        })
    })
}

function compareQuantities(qty, id){
    // console.log(qty, id)
    let queryString = "select stock_quantity from products where item_id = "+id
    // connection.connect(function(err){if (err) throw err})
    connection.query(queryString , function(err, resp){
        if (err) throw err;
        let qtyAvailable = resp[0].stock_quantity;
        // console.log(qtyAvailable)
        if (qtyAvailable < qty){
            console.log("Insufficient Quantity!")
            console.log("Returning to item selection...")
            // connection.end();
            grabAndPrint();
        } else {
            let newQty = qtyAvailable-qty
            updateQuantity(id, newQty)
            let queryString = "select price from products where item_id = "+id;
            connection.query(queryString, function(err, resp){
                if (err) throw err;
                let itemPrice = resp[0].price;
                let transactionTotal = qty * itemPrice;
                console.log("Please pay "+transactionTotal)
            })
        }
    })
}

function updateQuantity(id, qty){
    connection.query("update products set ? where ?",[
        {
            stock_quantity: qty
        },
        {
            item_id: id
        }
    ], function(err, resp){
        
    })
}
connection.connect(function(err){
    if(err)throw err;
    // console.log("connected")
})
grabAndPrint();






