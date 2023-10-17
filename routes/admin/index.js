const express = require('express');

const router = express.Router();

const userRoute = require('./user.route');
const productRoute = require('./product.route');
const categoryRoute = require('./category.route');
const orderRouter = require('./order.route');
const authRoute = require('./auth.route');


const publicRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
]
const privateRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/order',
    route: orderRouter,
  },
]

publicRoutes.forEach(route => {
  router.use(route.path, route.route);
})
privateRoutes.forEach(route => {
  router.use(route.path, route.route);
})

module.exports = router;