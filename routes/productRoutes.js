const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const check = require('../middlewares/authCheck');



router.post('/api/createOrder', check.checkAdmin, product.createOrder);


module.exports = router;