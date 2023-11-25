const asyncHandler = require("express-async-handler");

const User = require("../models/user.model");
const _CONF = require("../configs");
const { sendMail } = require("../helpers/sendMailer");

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
  res.status(200).json({
    status: "success",
    data: user ? user : "User not found",
  });
});
const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find().select("-refreshToken -password -role");
  res.status(200).json({
    status: "success",
    data: user ? user : "User not found",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = await user.createPasswordChangedToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi tài khoản của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${_CONF.BASE_URL_SERVER}/user/reset-password/${resetToken}>Click here!</a> `;
  const data = {
    to: email,
    html,
  };
  const result = await sendMail(data);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date().now() },
  });
  if (!user) throw new Error("User not found");
  user.password = password;
  user.passwordChangedAt = Date.now();
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.status(200).json({
    status: user ? "success" : "failed",
    data: user ? "Updated successfully" : "Failed to update",
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id)
  res.status(200).json({
    status: "success",
    data: user ? "Delete user successfully" : "User not found",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if(!_id || !Object.keys(req.body).length === 0 ) throw new Error("User not found");
  const user = await User.findByIdAndUpdate(_id, req.body, {new: true})
  res.status(200).json({
    status: "success",
    data: user ? "Update user successfully" : "User not found",
  });
});

module.exports = {
  getCurrent,
  forgotPassword,
  resetPassword,
  deleteUser,
  updateUser,
  getAllUser
};
