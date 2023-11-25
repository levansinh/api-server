const cloudynary = require("../configs/cloudinary");
const asyncHandler = require("express-async-handler")
const upload = asyncHandler(async (req, res) => {
  if(!req.files.length === 0) throw new Error("Missing files")
  const images = req.files.map((file) => file.path);
  const uploadedImages = [];
  for (let image of images) {
    const results = await cloudynary.uploader.upload(image);
    uploadedImages.push({
      url: results.secure_url,
      publicId: results.public_id,
    });
  }
  res.status(200).json({
    status: "success",
    data: uploadedImages
  });
});
const remove = asyncHandler(async (req, res) => {
  const {publicId} = req.params
  const public_id = publicId
  const response = await cloudynary.uploader.destroy(public_id)
  res.status(response ? 200 : 400).json({
    status: response ? "success" : "failed",
    data: response ? response : "Product not found",
  });
});

module.exports = { upload, remove };
