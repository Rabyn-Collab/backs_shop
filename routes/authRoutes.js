const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');


router.get('/', auth.userLogin
  // (req, res) => auth.userLogin(req, res)
);


module.exports = router;