const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => console.log(err));

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))



const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart')

app.use('/guitar.shop/auth', authRoutes);
app.use('/guitar.shop/products', productRoutes);
app.use('/guitar.shop/categories', categoryRoutes);
app.use('/guitar.shop/carts', cartRoutes);


module.exports = app;