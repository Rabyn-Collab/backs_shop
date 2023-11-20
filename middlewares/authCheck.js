const jwt = require('jsonwebtoken');
const User = require('../model/User');


module.exports.checkUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.decode(token, 'jsonToken');
    if (decoded) {
      const { id } = decoded;
      const user = await User.findById(id).select('-password');
      req.user = user;
      return next();
    }
    return res.status(401).json('you are not authorised');
  } else {
    return res.status(401).json('you are not authorised');
  }


}



module.exports.checkAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json('you are not admin to authorised');
  }

}