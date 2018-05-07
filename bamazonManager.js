var mySQL = require("mysql")
var inquirer = require("inquirer");
const connection = mySQL.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"###########",
    database:"bamazon"
})
const whatDoChoices = ["View the inventory","View items with low inventory","Add more of a certain item","Add a new item to the inventory"]
const whatDoQuestions = [
    {
        type:"list",
        message:"What do you want to do?",
        choices:whatDoChoices,
        name:"doChoice"
    }
]


function whatDo(){
    inquirer.prompt(whatDoQuestions).then(function(resp)
    {
        switch(resp.doChoice){
            case "View the inventory":
                viewProductsForSale();
                break
            case "View items with low inventory":
                viewLowInventory();
                break
            case "Add more of a certain item":
                addToInventory();
                break
            case "Add a new item to the inventory":
                addNewProdcut();
                break
        }
    })
}

function viewProductsForSale(){
    console.log("__________________________")
    console.log("Showing full inventory...")
    console.log("")
    connection.query("select * from products",function(err, resp){
        if (err) throw err;
        let itemsArr = [];
        resp.forEach(element => {
            let stringToAdd = ""
            let newID = element.item_id;
            let newName = element.product_name;
            let newPrice = element.price;
            let newQty = element.stock_quantity;
            stringToAdd+= newID
            stringToAdd+= ". "
            stringToAdd+= newName
            stringToAdd+= " - $"
            stringToAdd+= newPrice
            stringToAdd+= " - "
            stringToAdd+= newQty
            stringToAdd+= " in stock"
            console.log(stringToAdd)
        });
        console.log("")
        whatDo();
        
    })
}

function viewLowInventory(){
    console.log("__________________________")
    console.log("Showing items with low inventory...")
    console.log("")
    //shows all inventories less than 5
    connection.query("select * from products",function(err, resp){
        if (err) throw err;
        let itemsArr = [];
        resp.forEach(element => {
            let stringToAdd = ""
            let newID = element.item_id;
            let newName = element.product_name;
            let newPrice = element.price;
            let newQty = element.stock_quantity;
            stringToAdd+= newID
            stringToAdd+= ". "
            stringToAdd+= newName
            stringToAdd+= " - $"
            stringToAdd+= newPrice
            stringToAdd+= " - "
            stringToAdd+= newQty
            stringToAdd+= " in stock"
            if (parseInt(newQty) <= 5)
            console.log(stringToAdd)
        });
        console.log("")
        whatDo();
    })
}

function addToInventory(){
    connection.query("select * from products",function(err, resp){
        if (err) throw err;
        let itemsArr = [];
        resp.forEach(element => {
            let stringToAdd = ""
            let newID = element.item_id;
            let newName = element.product_name;
            let newPrice = element.price;
            let newQty = element.stock_quantity;
            stringToAdd+= newID
            stringToAdd+= ". "
            stringToAdd+= newName
            stringToAdd+= " - $"
            stringToAdd+= newPrice
            stringToAdd+= " - "
            stringToAdd+= newQty
            stringToAdd+= " in stock"
            itemsArr.push(stringToAdd)
        });
        inquirer.prompt([
            {
                type:"list",
                message: "Which item do you want to add to?",
                choices: itemsArr,
                name:"itemToAddTo"
            },
            {
                type:"input",
                message:"How many should be added?",
                name:"numToAdd"
            }
        ]).then(function(resp){
            let splitResp = resp.itemToAddTo.split(" ")
            let idToAddTo = splitResp[0].split(".")[0]
            let currentQty = splitResp[splitResp.length-3]
            let newQty = parseInt(currentQty) + parseInt(resp.numToAdd)
            updateQuantity(idToAddTo, newQty)
            console.log("")
            console.log("Quantity Updated")
            console.log("")
            whatDo();
        })
    })
}

function updateQuantity(id, qty){
    connection.query(
        "update products set ? where ?",[
            {
                stock_quantity: qty
            },
            {
                item_id: id
            }
        ]
    )
}

function addNewProdcut(){
    //lets manager add a brand new item to inventory
    inquirer.prompt([
        {
            type:"input",
            message:"What is the name of your product?",
            name:"newItemName"
        },
        {
            type:"input",
            message:"What department will it be sold in?",
            name:"newItemDepartment"
        },
        {
            type:"input",
            message:"What will the price be?",
            name:"newItemPrice"
        },
        {
            type:"input",
            message:"How many should we add to the inventory?",
            name:"newItemQuantity"
        }
    ]).then(function(resp){
        connection.query("insert into products set ?",
    {
        product_name: resp.newItemName,
        department_name: resp.newItemDepartment,
        price: parseInt(resp.newItemPrice),
        stock_quantity: parseInt(resp.newItemQuantity)
    })
    console.log("")
    console.log("Added")
    console.log("")
    whatDo();
    })
}


connection.connect(function(err){
    if(err)throw err;
    // console.log("connected")
})

whatDo();