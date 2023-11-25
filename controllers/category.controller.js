const slugify = require("slugify");
const Category = require("../models/category.model");
const asyncHandler = require("express-async-handler");

const getAllCategory = asyncHandler(async (req, res) => {
  const response = await Category.find();
  res.status(response ? 200 : 400 ).json({
    status: response ? "success" : "failed",
    data: response ? response : "Category invalid",
  });
});

const getCategoryById = asyncHandler(async ({ query }, res) => {
    const {id} = query
    if(!id) throw new Error("Category not found")
    const response = await Category.findById(id);
    res.status(response ? 200 : 400 ).json({
      status: response ? "success" : "failed",
      data: response ? response : "Category invalid",
    });
});

const createCategory = asyncHandler(async ({ body }, res) => {
  if(!(Object.keys(body).length === 0) ) throw new Error('Data is empty');
  if(body && body.name) body.slug = slugify(body.name, { replacement: "-", lower: true })
    const response = await Category.create(body);
    res.status(response ? 200 : 400 ).json({
      status: response ? "success" : "failed",
      message: response ? "Create successfully" : "Create failed",
    });
  });

const updateCategory = async ({ params, body }, res) => {
  if(!params.id || !(Object.keys(body).length === 0)) throw new Error("Missing inputs")
  if(body && body.name) body.slug = slugify(body.name, { replacement: "-", lower: true })
  const response = await Category.findByIdAndUpdate(params.id, body, {new: true})
  res.status(response ? 200 : 400 ).json({
    status: response ? "success" : "failed",
    message: response ? "Update successfully" : "Update failed",
  });
};

const deleteCategory = async ({ params }, res) => {
  const { id } = params
  const response = await Category.findOneAndDelete(id);
  res.status(response ? 200 : 400 ).json({
    status: response ? "success" : "failed",
    message: response ? "Update successfully" : "Update failed",
  });
};

module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
