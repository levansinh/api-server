const express = require("express");
const cors = require("cors");;
const cookieParser = require('cookie-parser')
const passport = require('passport');
const cookieSession = require('cookie-session')

require("dotenv").config();
require('./configs/passport')
const routes = require("./routes/v1/index");
const adminRoutes = require("./routes/admin/index")
const initRouteAdmin = require("./routes/admin")

const app = express();

// cors config

// cookiesParser

app.use(cookieParser())

// bodyParser
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// passport
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: 'production'
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Routes
// app.use('/v1', routes);

// app.use('/api',adminRoutes);
initRouteAdmin(app)

module.exports = app;
