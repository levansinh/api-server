const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")

const User = require("../models/user.model");
const {gennerateAccessToken, gennerateRefreshToken} = require("../middlewares/jwt")
const _CONF = require("../configs")


const register = asyncHandler(
  async ({ body }, res) => {
    const { email, password, firstName, lastName } = body;
    if (!email || !password || !lastName || !firstName)
    return res.status(400).json({
        status: 'failed',
        message: 'Missing inputs'
    })
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({  status: 'failed', message: "User has existed" });
    }

    await User.create(body);

    res.status(200).json({
      status: 'success',
      message: "User create successfully!",
    });
  }
) 

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({  status: 'failed', message: "Incorrect username or password!!!" });
    }

    const response = await User.findOne({ email });

    if(response && await response.isCorrectPassword(password)){
      const { password, role, ...dataUser } = response.toObject();
      const accessToken = gennerateAccessToken(response._id, role)
      const refreshToken = gennerateRefreshToken(response._id)
      await User.findByIdAndUpdate(response._id, {refreshToken}, { new: true })
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      res
      .status(200)
      .json({
        status: "success",
        dataUser,
        accessToken
      });
    }else {
      throw new Error('Invalid password')
    }

})
const refreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if(!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookie')
 const result = await jwt.verify(cookie.refreshToken, _CONF.SECRET)
 const response = await User.findOne({_id: result._id, refreshToken: cookie.refreshToken})
 return res.status(200).json({
  status: response ? 'success' : "failed",
  newAccessToken: response ? gennerateAccessToken(response._id,response.role) : "Refresh token invalid"
 })
})
const logout = asyncHandler( async (req, res) => {
  const cookie = req.cookies
  if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
  await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true})
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true
})
  res.status(200).json({  status: 'success', message: "Logout successfully" });
})

module.exports = { register, login, logout,refreshToken };
