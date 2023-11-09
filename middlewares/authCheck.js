const jwt = require('jsonwebtoken');


module.exports.checkAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.decode(token, 'jsonToken');
    if (decoded) {
      const { id, isAdmin } = decoded;
      if (isAdmin) return next();
    }
    return res.status(401).json('you are not authorised');
  } else {
    return res.status(401).json('you are not authorised');
  }


}