const express = require('express');
const path = require ('path');
const router = express.Router();
const indexController = require('../controller/indexController');
const fileUploadProduct = require("../middlewares/productMiddleware");
const fileUploadUser = require("../middlewares/userMulter");
const userValidations = require('../middlewares/userValidation');
const logged = require("../middlewares/logged");
const notLogged = require("../middlewares/notLogged");
const notAdmin = require("../middlewares/notAdmin");

//const cpUpload = fileUploadProduct.fields([{ name: "image_product", maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

const { index } = require('../controller/indexController');

router.get('/' , indexController.index);

router.get('/error', indexController.error);

router.get('/detail/:id' , indexController.detail)

router.get('/create' , indexController.create);

router.post('/create' , fileUploadProduct.array("image_product", 10) , indexController.newProduct);

router.get('/edit/:id' ,notAdmin, indexController.edit);

router.post('/edit/:id' , fileUploadProduct.single('image_product')  , indexController.editProduct);

router.get('/user/register' , logged , indexController.register);

router.post('/user/register', fileUploadUser.single('user_image') , userValidations , indexController.newUser);

router.get('/user/login' , logged , indexController.login);

router.post('/user/login' , indexController.logged);

router.get('/user/profile' , notLogged , indexController.profile);

router.get("/user/logout" , indexController.logout);

router.get("/user/cart" , notLogged , indexController.cart);

router.post("/checkout" , indexController.checkout)


router.get('/lamorita' , indexController.lamorita);

router.get('/talles' , indexController.talles)

router.get('/como_comprar' , indexController.compra)
//router.get('/one_product/:id' , indexController.oneProduct)

router.get("/whatsapp" , indexController.whatsapp)

router.get("/sales_dashboard" ,notAdmin, indexController.salesDashboard)
router.post("/sales_dashboard" , indexController.salesDashboardPost)

router.get("/all_products" , indexController.allProducts)

router.post("/all_products" , indexController.prices)

router.get("/user/registro_compras" , notLogged , indexController.shoppingRecord);
router.get('/api/sales' , indexController.allSalesApi);
router.get('/api/products' , indexController.allproductsApi);

//router.get('/api/one_sale/:id' , indexController.oneSale)


module.exports = router;