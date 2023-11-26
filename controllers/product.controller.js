const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const productValid = require("../validator/product.validate");
const { findByIdAndUpdate } = require("../models/user.model");

const getProducts = asyncHandler(async (req, res) => {
  // /coppy req.query
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  let query = JSON.parse(queryString);

  if (queryObj?.name) query.name = { $regex: queryObj.name, $options: "i" };
  if (queryObj?.category) query.category = queryObj.category;
  let queryCommand = Product.find(query);

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  queryCommand.skip(skip).limit(limit);

  queryCommand
    .then(async (response) => {
      const counts = await Product.find(query).countDocuments();

      res.status(response ? 200 : 400).json({
        status: response ? "success" : "failed",
        counts,
        data: response ? response : "Product not found",
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

const getProductById = asyncHandler(async ({ params }, res) => {
  const { id } = params;
  if (!id) throw new Error("Missing inputs");
  const response = await Product.findById(id, { new: true });
  res.status(response ? 200 : 400).json({
    status: response ? "success" : "failed",
    data: response ? response : "Product not found",
  });
});

const createProduct = asyncHandler(async ({ body }, res) => {
  if (!Object.keys(body).length === 0) throw new Error("Missing inputss");
  if (body && body.name)
    body.slug = slugify(body.name, { replacement: "-", lower: true });
  const response = await Product.create(body);
  res.status(response ? 200 : 400).json({
    status: response ? "success" : "failed",
    message: response ? "Create successfully" : "Create failed",
  });
});

const updateProduct = asyncHandler(async ({ params, body }, res) => {
  if (!params.id || !(Object.keys(body).length === 0))
    throw new Error("Missing inputs");
  if (body && body.name)
    body.slug = slugify(body.name, { replacement: "-", lower: true });
  const response = await findByIdAndUpdate(params.id, newData, { new: true });
  res.status(response ? 200 : 400).json({
    status: response ? "success" : "failed",
    message: response ? "Update successfully" : "Update failed",
  });
});

const deleteProduct = asyncHandler(async ({ params }, res) => {
  const { id } = params;
  if (!id) throw new Error("Missing inputs");
  const response = await Product.findOneAndDelete(id);
  res.status(response ? 200 : 400).json({
    status: response ? "success" : "failed",
    message: response ? "Delete successfully" : "Delete failed",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star || !comment || !pid) throw new Error("Missing inputs");
  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings.find(
    (el) => el.postedBy.toString() === _id
  );

  if (alreadyRating) {
    // update comments
    await Product.updateOne(
      { ratings: { $elemMatch: alreadyRating } },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      { new: true }
    );
  } else {
    // create comment

    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id } },
      },
      {
        new: true,
      }
    );
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  ratings,
};
