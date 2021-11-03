
//const { promiseImpl } = require('ejs');
let fs = require ('fs');
let path = require ('path');
let db = require("../database/models");
let Op = db.Sequelize.Op;
const {validationResult} = require ('express-validator');
const bcrypt = require('bcryptjs')

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
    }    
}

module.exports = indexController;


