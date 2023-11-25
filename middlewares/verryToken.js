const jwt = require("jsonwebtoken");
const _CONF = require("../configs");
const asyncHandler = require("express-async-handler");

const verryToken = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, _CONF.SECRET, (err, decode) => {
      if (err) {
        res.status(400).json({
          status: "failed",
          message: "Invalid access token",
        });
      }
      req.user = decode;
      next();
    });
  } else {
    res.status(400).json({
      status: "failed",
      message: "Invalid authentication",
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (!role === "admin")
    return res.status(401).json({
      status: "success",
      mes: " REQUIRE ADMIN ROLE",
    });
  next();
});

module.exports = { verryToken, isAdmin };
