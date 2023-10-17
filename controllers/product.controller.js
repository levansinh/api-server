const  slugify = require('slugify')
const Product = require("../models/product.model");

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.json({ success: true, product, message: "Get Product Successfully!!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

const getProductById = async ({ params }, res) => {
  try {
    const productById = await Product.findById(params.id);
    if (!productById) {
      return res
        .status(400)
        .json({ success: false, message: "Product is not found" });
    }
    res.json({
      success: true,
      productById,
      message: "Get Product Successfully!!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

const createProduct = async ({ body }, res) => {
  try {
    const newProduct = new Product({
      ...body,
      slug: slugify(body.title, { replacement: "-", lower: true }),
    });
    await newProduct.save();
    res.json({ success: true, message: "Create Product Successfully!!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

const updateProduct = async ({ params, body }, res) => {
  const product = await Product.findById(params.id);

  if (!product) {
    return res
      .status(400)
      .json({ success: false, message: "Product is not found" });
  }
  body
  const updateProduct = await Product.findOneAndUpdate(params.id, {
    ...body,
    slug: slugify(body.title, { replacement: "-", lower: true }),
  });
  if (!updateProduct)
    return res.status(401).json({
      success: false,
      message: "Product not found or user not authorised",
    });

  res.json({
    success: true,
    message: "Update successfully!",
    product: updateProduct,
  });
};

const deleteProduct = async ({ params }, res) => {
  const deleteProduct = await Product.findOneAndDelete(params);
  if (!deleteProduct) {
    return res.status(401).json({
      success: false,
      message: "Product not found or user not authorised",
    });
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
