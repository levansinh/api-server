const jwt = require("jsonwebtoken");

const verryToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Access Token Not Found!!",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

const verryTokenAdmin = (req,res,next) => {
  verryToken(req,res, () =>  {
    if(req.user.isAdmin){
      next()
    }else {
      return res.json({success:false, message: 'You are not admin'})
    }
  })
}

module.exports = { verryToken, verryTokenAdmin };
