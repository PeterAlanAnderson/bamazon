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
    connection.connect(function(err){
        if(err)throw err;
        // console.log("connected")
    })
    connection.query("select * from products",function(err, resp){
        if(err)throw err;
        printOut(resp);

    })
    connection.end();
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
            console.log(responseID)
        })
    })
}

grabAndPrint();






