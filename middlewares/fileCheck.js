const path = require('path');




module.exports.fileCheck = (req, res, next) => {

  if (req.files?.product_image) {
    const file = req.files.product_image;

    const extTypes = ['.jpg', '.jpeg', '.png'];
    if (extTypes.includes(path.extname(file.name))) {
      file.mv(`./uploads/${file.name}`, (err) => {

      });
      req.image = `/uploads/${file.name}`;
      return next();
    } else {
      return res.status(400).json('please provide valid image');
    }



  } else {
    return res.status(400).json('please provide image');
  }






}





module.exports.updateCheck = (req, res, next) => {

  if (req.files?.product_image) {
    const file = req.files.product_image;
    const extTypes = ['.jpg', '.jpeg', '.png'];
    if (extTypes.includes(path.extname(file.name))) {
      file.mv(`./uploads/${file.name}`, (err) => {

      });
      req.image = `/uploads/${file.name}`;
      return next();
    } else {
      return res.status(400).json('please provide valid image');
    }



  } else {
    return next();
  }






}