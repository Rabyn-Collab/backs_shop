const express = require('express');
const router = express.Router();
const order = require('../controllers/orderController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const check = require('../middlewares/authCheck');


const methodNotAllow = (req, res) => res.status(405).json('method not allowed');



router.get('/api/orders', check.checkUser, check.checkAdmin, order.getAllOrders);

router.post('/api/createOrder', check.checkUser, order.createOrder);

router.get('/api/user/order', check.checkUser, order.getOrderByUser);
router.get('/api/order/:id', check.checkUser, order.getOrderById);

module.exports = router;