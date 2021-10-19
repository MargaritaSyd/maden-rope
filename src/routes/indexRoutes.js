const express = require('express');
const path = require ('path');
const router = express.Router();
const indexController = require('../controller/indexController');
const fileUploadProduct = require("../middlewares/productMiddleware");
const fileUploadUser = require("../middlewares/userMulter")
const userValidations = require('../middlewares/userValidation')

router.get('/' , indexController.index);

router.get('/error', indexController.error);

router.get('/detail/:id' , indexController.detail)

router.get('/create' , indexController.create);

router.post('/create' , fileUploadProduct.single('image_product') , indexController.newProduct);

router.get('/edit/:id' , indexController.edit);

router.post('/edit/:id' , fileUploadProduct.single('image_product')  , indexController.editProduct);

router.get('/user/register' , indexController.register);

router.post('/user/register', fileUploadUser.single('user_image') , userValidations , indexController.newUser);

router.get('/user/login' , indexController.login);

router.post('/user/login' , indexController.logged);

router.get('/user/profile' , indexController.profile);

module.exports = router;