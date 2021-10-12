
let fs = require ('fs');
let path = require ('path');
let db = require("../database/models");
let Op = db.Sequelize.Op;

let indexController = {
    index: function(req,res){
        res.render("index")
    },
    error: function(req,res){
        res.render("error")
    },
    // detail: function(req,res){
    //     res.render("detail")
    // },
    create: function(req,res){  
        db.category.findAll()
         .then(function(category){
             res.render('createProduct' , {category})
        })
    },
    newProduct: function(req,res){
        let imageProduct;
        if(req.file){
            imageProduct = req.file.filename;
        } else {
            imageProduct = "";
        }
        db.product.create(
            {
                name: req.body.name,
                id_category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                image_product: imageProduct,
                stock : 1
            }
        )
        .then(function(){
            res.render("index")
        });
        
    },

    edit: function(req,res){
        let product = db.product.findByPk(req.params.id);
        let category = db.category.findAll(); 
        Promise.all([product, category])
        .then(function([product, category]){
            res.render('editProduct', {product, category})
        })  
    },

    editProduct: function(req,res){
        let product = db.product.findByPk(req.params.id)
        let imageProduct;
        if(req.file){
            imageProduct = req.file.filename;
            fs.unlinkSync(path.join(__dirname+'/../../public/img/productImages/'+ product.image_product));
        } else {
            imageProduct = product.image_product;
        }
         db.product.update(
            {
                name: req.body.name,
                id_category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                image_product: imageProduct,
                stock : req.body.stock
            }, {
                where: {id: req.params.id}
            })
            .then(function(){
                res.render("index")
            })
            .catch(function(e){
                res.send("error")
            })
                
    }
}

module.exports = indexController;


