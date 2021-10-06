let fs = require ('fs');
let path = require ('path');
let productPath = path.join(__dirname, '../db/product.json');
let datos = fs.readFileSync (productPath, 'utf-8');
//let db = require("../dataBase/models");
//let Op = db.Sequelize.Op;
let product ;
if (datos == "") {
    product = [];
} 
else { 
    product = JSON.parse(datos);
};

let indexController = {
    index: function(req,res){
        res.render("index")
    },
    error: function(req,res){
        res.send("Error")
    }
}
module.exports = indexController;