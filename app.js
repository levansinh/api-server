const express = require("express");
const cors = require("cors");;
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require("dotenv").config();
const routes = require("./routes/v1/index");
const adminRoutes = require("./routes/admin/index")

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
// Routes
// app.use('/v1', routes);

app.use('/admin',adminRoutes);

module.exports = app;
