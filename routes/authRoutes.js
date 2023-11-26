const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const check = require('../middlewares/authCheck');

const loginSchema = Joi.object({
  email: Joi.string().email().required('mail is req'),
  password: Joi.string().min(5).max(20).required(),
})





router.post('/api/userLogin', validator.body(loginSchema), auth.userLogin);
router.post('/api/userRegister', auth.userRegister);
router.patch('/api/userUpdate', check.checkUser, auth.userUpdate);



module.exports = router;