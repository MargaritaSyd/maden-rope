
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

    editPrice: function(req , res){
        res.render("editPrice")
    },

    priceEdited: function(req,res){
        db.product.update(
            {
                price: (product.price * req.body.priceUp)/100
            }
        ).then(function(){
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

   // oneProduct: (req,res)=>{
       
        // function imageFunction(array){
        //     for(let i=0; i<array.length; i++){
        //         return "https://localhost:8000/img/productImages/" + array[i]
        //     }
        // }

       
    //     function getImage(item){
    //         return "https://localhost:8000/img/productImages/" + item
    //     }
       
    //     function images(item){
    //         item.map(getImage)
    //     }
    //     db.product.findByPk(req.params.id)
    //     .then(oneProduct => {
    //         let theProduct = {
    //             id: oneProduct.id,
    //             name: oneProduct.name,
    //             id_category: oneProduct.id_category,
    //             price: oneProduct.price,
    //             description: oneProduct.description,
    //             image_product: images(oneProduct.image_product),
    //             stock : oneProduct.stock
    //         }
    //         return res.status(200).json({
    //             data: theProduct,
    //             status: 200
    //         })
    //     })

   //  }
   
}

module.exports = indexController;


