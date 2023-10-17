const User = require("../models/user.model");
const Token = require('../models/token.model');
const moment = require('moment');

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const register = async ({ body,cookie }, res) => {
  
  try {
    const { email, password } = body;
    const user = await User.findOne({ email });
    // check user
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    }

    // ALl good

    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ ...body, password: hashedPassword,role:true});
    await newUser.save();

    // Return accessToken

    res.json({
      success: true,
      message: "User create successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const gennerateAccessToken = (user) => jwt.sign(
  user,
  process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:'1m'
  }
);

const gennerateRefreshToken = (user) => jwt.sign(
  user,
  process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:'365d'
  }
);

const removeToken = async (data) => {
  const refreshTokenDoc = await Token.findOneAndRemove(data);
  if (!refreshTokenDoc) {
    return res.status(401).json({success: false, message: 'User is not authenticated'})
  }
}

const saveToken =async (data) => {
      const newToken = new Token(data)
      await newToken.save()
}


const login = async (req, res) => {
  try{
    const { email, password } = req.body;

    // Check email not found

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password!!!" });
    }

    // Email found

    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Incorrect username or password!!!",
        });
    }

    // Return accessToken
    if(user && passwordValid){
      const {password, ...information} = user._doc
      const accessToken = gennerateAccessToken({ userId: user._id, isAdmin: user.isAdmin })
      const refreshToken = gennerateRefreshToken({ userId: user._id, isAdmin: user.isAdmin })
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure:false,
        path:'/',
        sameSite:'strict'
      })
   const expires = moment().add(365,'days')
   saveToken({ token: refreshToken,user:user._id,expires});
      res.status(200).json({ success: true, message: "User login successfully!!!",accessToken,information });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ success: false, message: "Internal server error" });
  }
};
const requestRefreshToken = (req,res) => {
  const refreshToken = req.cookies.refreshToken
  if(!refreshToken) {
    return res.status(401).json({success:false, message: 'User is not authenticated'})
  }
  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,user) => {
    if(err){
      console.log(err)
    }
    const newAccessToken = gennerateAccessToken(user);
    const newRefreshToken = gennerateRefreshToken(user);
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure:false,
      path:'/',
      sameSite:'strict'
    })
    res.status(200).json({accessToken:newAccessToken})
  })
}
const logout = (req, res) => {
  const refreshToken = req.cookies.refreshToken
  removeToken({ token: refreshToken})
  res.status(200).json({success: true, message: 'Logout successfully'})
};

module.exports = { register, login, logout, requestRefreshToken };
