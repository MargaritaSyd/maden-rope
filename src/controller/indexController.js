
//const { promiseImpl } = require('ejs');
let fs = require ('fs');
let path = require ('path');
let db = require("../database/models");
let Op = db.Sequelize.Op;
const {validationResult} = require ('express-validator');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const mercadopago = require('mercadopago');
const { array } = require('../middlewares/productMiddleware');
//const fetch = require("node-fetch");

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

    error: function(req,res){
        res.render("error")
    },

    create: function(req,res){  
        db.category.findAll()
         .then(function(category){
             res.render('createProduct' , {category})
        })
    },
    newProduct: function(req,res){
        
        let imageProduct;
        let imagePath = []
        
        if(req.files){
            imageProduct=req.files
        
         for(let i=0; i<imageProduct.length; i++){
        
            imagePath.push(imageProduct[i].filename)
             
         }}

        // console.log(imagePath[4])
         

        //   else {
        //       imagesPath = "";
        //   }
       
        db.product.create(
            {
                name: req.body.name,
                id_category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                image_product: imagePath[0]|| "",
                image_product_1: imagePath[1] || "",
                image_product_2: imagePath[2] || "",
                image_product_3: imagePath[3] || "",
                stock : req.body.stock
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
        if(req.body.prices){
      //  let product = db.product.findAll() 
        db.product.findAll()
        .then(function(products){
            let theId
            for(let i=0; i<products.length; i++){
                theId = products[i].id
                //console.log(theId)
                db.product.update(
                    {
                        price: req.body.prices,
                    }, {
                        where: {id: theId}
                    })
            }
           
        })
        .then(function(){
            res.redirect('/')
        })
        .catch(function(e){
            res.send("error")
        })
    } else {
    
        let imageProduct;
        let imagePath = []
        
        if(req.files){
            imageProduct=req.files
        
         for(let i=0; i<imageProduct.length; i++){
        
            imagePath.push(imageProduct[i].filename)
             
         }
        //    fs.unlinkSync(path.join(__dirname+'../../../public/img/productImages/'+ imgProduct));
        }
        let product = db.product.findByPk(req.params.id) 
         db.product.update(
            {
                name: req.body.name,
                id_category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                image_product: imagePath[0] || product.image_product,
                image_product_1: imagePath[1] || product.image_product_1,
                image_product_2: imagePath[2] || product.image_product_2,
                image_product_3: imagePath[3] || product.image_product_3,
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
        }
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
        
        let item = req.body.name
        if(Array.isArray(item) == true){
            function Object (title, unit_price, quantity) {
                this.title = title;
                this.unit_price = unit_price;
                this.quantity = quantity;
            };
        
            let items = [];
    
            for(let i=0; i<req.body.name.length && i<req.body.price.length && i<req.body.quantity.length; i++){
             //   items.push( new Object (req.body.name[i] , parseInt(req.body.price[i]) ,parseInt(req.body.quantity[i])));
             items.push( new Object (req.body.name[i] , parseInt(req.body.price[i]) ,parseInt(req.body.quantity[i])));
        
            }
    
             mercadopago.configure({
                 access_token: "TEST-3018045663051609-111311-ab28f7e43cf70af5931312d9954fef97-185541546"
             })
             
             let preference = {
    
                
                  items,
    
                 back_urls: {
                     success: "http://localhost:8000/user/registro_compras",
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
           
        } else {
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
                    success: "http://localhost:8000/user/registro_compras",
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
          
        }

          
     },

    
    lamorita: (req,res) => {
        res.render("lamorita")
    },

    talles: (req,res) => {
        res.render("tablaDeTalles")
    },

    compra: (req, res) => {
        res.render("comprar")
    },

    whatsapp: (req,res) => {
        res.redirect("https://api.whatsapp.com/send?phone=5491134223248&text=Hola!%20Quiero%20comprar%20todo!")
    },

    shoppingRecord: (req,res)=>{
        let userToLog = req.session.user;

        var query = require('url').parse(req.url,true).query;

        let payment_id = query.payment_id;
        let payment_type = query.payment_type;
        let collection_id = query.collection_id;
        let merchant_order_id = query.merchant_order_id;
        let status = query.status;
        let preference_id = query.preference_id;
        let merchant_account_id = query.merchant_account_id;;
        let id_user = userToLog.id;
        
        if (payment_id == null){
            res.render("shoppingRecord" , {userToLog})
        } else {
         db.sales.create(
            
              {
                collection_id: collection_id,
                payment_type: payment_type,
                payment_id: payment_id,
                merchant_order_id: merchant_order_id,
                status: status,
                preference_id: preference_id,
                merchant_account_id: merchant_account_id,
                id_user: id_user,
              }
         )
         .then(function(){
            res.render("shoppingRecord" , {userToLog})
         })
         .catch(function(e){
             console.log(e)
         })
        }

    },

   allSalesApi: (req , res) => {
        db.sales.findAll({include: [{association: "user"}] })
        .then (sales => {
           let saleArray = [];
             for(let i=0; i<sales.length; i++){
                 let oneSale = {
                     collection_id: sales[i].collection_id,
                     payment_id: sales[i].payment_id,
                     payment_type: sales[i].payment_type,   
                     merchant_order_id: sales[i].merchant_order_id,
                     status: sales[i].status,  
                     preference_id: sales[i].preference_id,   
                     merchant_account_id: sales[i].merchant_account_id, 
                     created_at: sales[i].created_at,
                     active: sales[i].active,
                     id_user: sales[i].id_user,       
                     user_mail: sales[i].user.mail,
                     user_name: sales[i].user.user_name,
                     last_name: sales[i].user.last_name,
                     tel: sales[i].user.tel,
                     dni: sales[i].user.dni,
                     adress: sales[i].user.adress,
                } 
                 saleArray.push(oneSale);
             }
            
             return res.status(200).json({
                 count: saleArray.length,
                 sales: saleArray,
                 status: 200
             })
         })
    },

    salesDashboard: (req,res) => {
    //    fetch("http://localhost:8000/api/sales")
    //     .then(r => r.json())
    //     .then(sales => {
            res.render("salesDashboard")
     //   })
        
    },
    salesDashboardPost: (req,res)=>{

  //      let delivered = req.body;

   //    console.log(delivered)

  let delivered = req.body.delivered;
        if(Array.isArray(delivered) == true){
            let theItem = delivered[0]
        
            db.sales.update(
                    {
                        active: 0
                    }, {
                        where: {collection_id: theItem}
                    })
                    .then(function(){
                        res.redirect('/sales_dashboard')
                    })
                    .catch(function(e){
                        res.send("error")
                    })
        } else {
            db.sales.update(
                {
                    active: 0
                }, {
                    where: {collection_id: delivered}
                })
                .then(function(){
                    res.redirect('/sales_dashboard')
                })
                .catch(function(e){
                    res.send("error")
                })
      }

      },
      allProducts: (req,res)=> {
          res.render("productsPrueba")
      },
      /*
      allProducts: (req,res)=> {
        db.product.findAll()
        .then(function(productos){
           let productosC1 = productos.filter(productos=>productos.id_category==1);
           let productosC2 = productos.filter(productos=>productos.id_category==2);
           let productosC3 = productos.filter(productos=>productos.id_category==3);
           res.render("products" , {productosC1,productosC2,productosC3})
        })
      },
*/
      prices: (req,res) => {
          let number = req.body
          console.log(number)
      },

      allproductsApi: (req,res) => {
        db.product.findAll({include: [{association: "category"}] })
       //db.product.findAll()
       .then (product => {
           let productsArray = [];
             for(let i=0; i<product.length; i++){
                 let oneProduct = {
                    id: product[i].id,
                    name: product[i].name,
                    id_category: product[i].id_category,
                    description: product[i].description,
                    price: product[i].price,
                    stock: product[i].stock,
                    id_category: product[i].id_category,
                    category_name: product[i].category.name,
                    image_product: "/img/productImages/"+product[i].image_product,
                    image_product_1: "/img/productImages/"+product[i].image_product_1,
                    image_product_2: "/img/productImages/"+product[i].image_product_2,
                    image_product_3: "/img/productImages/"+product[i].image_product_3,
               
                } 
                productsArray.push(oneProduct);
             }
            
             return res.status(200).json({
                 count: productsArray.length,
                 products: productsArray,
                 status: 200
             })
         })
    
      }
    }

module.exports = indexController;


