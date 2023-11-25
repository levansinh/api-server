const asyncHandler = require('express-async-handler')
const _CONF = require('../configs')
const sendMail = asyncHandler(async (data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: _CONF.EMAIL_NAME,
          pass: _CONF.EMAIL_PASSWORD,
        },
      });
      // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Shop store👻" <no-relply@shopstore.com>', // sender address
    to:data.to,
    subject: "Forgot Password", // Subject line
    html: data.hmlt
  });
  return info

})
module.exports = sendMail