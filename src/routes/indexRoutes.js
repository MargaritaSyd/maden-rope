const express = require('express');
const path = require ('path');
const router = express.Router();
const indexController = require('../controller/indexController');
const fileUpload = require("../middlewares/productMiddleware");

router.get('/' , indexController.index);

router.get('/error', indexController.error);

router.get('/detail/:id' , indexController.detail)

router.get('/create' , indexController.create);

router.post('/create' , fileUpload.single('image_product') , indexController.newProduct);

router.get('/edit/:id' , indexController.edit);

router.post('/edit/:id' , indexController.editProduct);

router.get('/user/register' , indexController.register);

router.post('user/register' , indexController.newUser);

router.get('user/login' , indexController.login);

module.exports = router;