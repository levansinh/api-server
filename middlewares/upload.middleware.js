const multer = require('multer')
const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage

const cloudinary = require('../configs/cloudinary')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "store",
        format: 'jpg'
    },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
})

const upload = multer({storage})

module.exports = upload 