// const express = require('express');

// const router = express.Router();

const userRoute = require('./user.route');
const productRoute = require('./product.route');
const categoryRoute = require('./category.route');
const orderRoute = require('./order.route');
const authRoute = require('./auth.route');
const imageRoute = require('./upload.route')

const {notFound, errHandler} = require('../../middlewares/errorHandler')

const initRouteAdmin = (app) => {
  app.use('/api/auth', authRoute)
  app.use('/api/user', userRoute)
  app.use('/api/image', imageRoute)
  app.use('/api/products', productRoute)
  app.use('/api/category', categoryRoute)

  app.use(notFound)
  app.use(errHandler)
} 
module.exports = initRouteAdmin