const express = require('express');
const router = express.Router();
const indexController = require('../controller/indexController');

router.get('/' , indexController.index);

router.get('/error', indexController.error);


module.exports = router;