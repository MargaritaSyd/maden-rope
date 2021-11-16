
//const { promiseImpl } = require('ejs');
let fs = require ('fs');
let path = require ('path');
let db = require("../database/models");
let Op = db.Sequelize.Op;
const {validationResult} = require ('express-validator');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const mercadopago = require('mercadopago');

let indexController = {
    
     index: function(req,res){
         db.product.findAll()
         .then(function(productos){
            let productosC1 = productos.filter(productos=>productos.id_category==1);
            let productosC2 = productos.filter(productos=>productos.id_category==2);
            let productosC3 = productos.filter(productos=>productos.id_category==3);
            res.render("index" , {productosC1,productosC2,productosC3})
         })
     },
/*
     probando: function(req,res){
        fetch('http://localhost:3000/api/products')
        .then(response => response.json)
        .then(products => {
            res.render('probando' , {products})
        })
     },
*/
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
            res.redirect("/")
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
        //    fs.unlinkSync(path.join(__dirname+'../../../public/img/productImages/'+ imgProduct));
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
                res.redirect('/')
            })
            .catch(function(e){
                res.send("error")
            })
                
    },
    detail: function(req,res){
        let userToLog = req.session.user
        let product = db.product.findByPk(req.params.id);
        let category = db.category.findAll();
        Promise.all([product,category])
        .then(function([product,category]){
            res.render("detail", {product, category, userToLog})
        })
        
    },
    register: function(req,res){
        res.render("register")
    },
    newUser: function(req,res){
        
        let errors = validationResult(req)
        if(errors.isEmpty()){
        let imageUser;
        if(req.file){
            imageUser = req.file.filename;
        } else {
            imageUser = "";
        }
        db.user.create({
            mail: req.body.mail,
            user_name: req.body.user_name,
            last_name: req.body.last_name,
            dni: req.body.dni,
            tel: req.body.tel,
            admin: 1,
            password: bcrypt.hashSync(req.body.password, 12),
            user_image: imageUser,
            adress: req.body.adress,
        })
        .then(function(){
            res.render("login")
        })
        } else {
            error = errors.mapped()
            return res.render("register" , {error, old:req.body})
        }
    },

    login: function(req,res){
        res.render('login')
    },

    logged: function(req,res){
        let errorMsg= 'Las credenciales son inválidas';

        db.user.findOne( {
            where: {
                mail: req.body.mail
            }
        })
        .then(function(userToLog){
        
            let passwordOk= bcrypt.compareSync(req.body.password , userToLog.password)
            if(!passwordOk){               
                    res.render('login',{errorMsg})
                } else {
                    req.session.user = userToLog
                    res.render("profile" , {userToLog})
                }
        })
               
        .catch(function(e){
            return res.render('login',{errorMsg})
        })
    },
    
      profile: function(req,res){
        let userToLog = req.session.user
        res.render("profile" , {userToLog})
    },

    logout: function(req,res){
        req.session.destroy();
        res.redirect("/")
    },
    
    cart: function(req,res){
        let userToLog = req.session.user;
        res.render("cart" , {userToLog})
        
    },

     checkout: (req,res)=>{

         mercadopago.configure({
             access_token: "TEST-3018045663051609-111311-ab28f7e43cf70af5931312d9954fef97-185541546"
         })

         let preference = {
             items: [

                 {
                     title: req.body.name,
                     unit_price: parseInt(req.body.price),
                     quantity: parseInt(req.body.quantity)
                 }
             ],
             back_urls: {
                 success: "http://localhost:8000/user/cart",
                 failure: "http://localhost:8000/user/cart",
                 pending: "http://localhost:8000/user/cart"
             },
             auto_return: "approved"
         };

         mercadopago.preferences.create(preference)
         .then(function(response){
             res.redirect(response.body.init_point);
         })
         .catch(function(e){
             console.log(e)
         })
     },

    allProductsApi: (req , res) => {
        db.product.findAll()
        .then (products => {
            let productArray = [];
            for(let i=0; i<products.length; i++){
                let oneProduct = {
                    id: products[i].id,
                    name: products[i].name,
                    description: products[i].description,
                    price: products[i].price,
                    stock: products[i].stock,
                    id_category: products[i].id_category,
                    image_product: "https://localhost3000/img/productImages/" + products[i].image_product
                }    

                productArray.push(oneProduct);
            }
            
            return res.status(200).json({
                count: productArray.length,
                products: productArray,
                status: 200
            })
        })
    },

    lamorita: (req,res) => {
        res.render("lamorita")
    }

}

module.exports = indexController;


