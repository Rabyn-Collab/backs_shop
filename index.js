const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb+srv://Babyn900:moles900@cluster0.jzgyqaw.mongodb.net/Shopy').then((val) => {
  app.listen(port, () => {
    console.log('connected');
  });
}).catch((err) => {
  console.log(err);
});


app.use(authRoutes);

app.use(fileUpload({
  limits: { fileSize: 15 * 1024 * 1024 },
  abortOnLimit: true
}));
app.use(productRoutes);

app.use((req, res) => {
  return res.status(404).json("not found");
})

