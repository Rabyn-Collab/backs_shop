const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const check = require('../middlewares/authCheck');
const fileC = require('../middlewares/fileCheck');


router.post('/api/createOrder', fileC.fileCheck, product.createOrder);


module.exports = router;