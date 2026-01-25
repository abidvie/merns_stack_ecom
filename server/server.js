const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authrouter = require('./routes/auth/authroute');
const adminproductrouter = require('./routes/admin_routes/products_route');
const client_products=require('./routes/client_routes/client_products')

const client_cart=require('./routes/client_routes/cart')
const app = express();

mongoose.connect('mongodb+srv://sarkerdipto2055_db_user:abid1234@cluster0.s80w84p.mongodb.net/')
  .then(() => {
    console.log('DB Connected');
  }).catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authrouter);
app.use('/api/admin/products', adminproductrouter);
app.use('/api/shop/listing',client_products);
app.use('/api/shop',client_products);
app.use('/api/shop/', client_cart);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});