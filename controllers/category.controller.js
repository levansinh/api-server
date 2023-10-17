const slugify = require('slugify')
const Category = require("../models/category.model");

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.json({ success: true, category, message: "Get Category Successfully!!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

const getCategoryById = async ({ params }, res) => {
  try {
    const categoryById = await Category.findById(params.id);
    if (!categoryById) {
      return res
        .status(400)
        .json({ success: false, message: "Category is not found" });
    }
    res.json({
      success: true,
      categoryById,
      message: "Get Category Successfully!!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

const createCategory = async ({ body }, res) => {
  try {
    const newCategory = new Category({
      ...body,
      slug: slugify(body.name, { replacement: "-", lower: true }),
    });
    await newCategory.save();
    res.json({ success: true, message: "Create Category Successfully!!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

const updateCategory = async ({ params, body }, res) => {
  const category = await Category.findById(params.id);

  if (!category) {
    return res
      .status(400)
      .json({ success: false, message: "Category is not found" });
  }
  body
  const updateCategory = await Category.findOneAndUpdate(params.id, {
    ...body,
    slug: slugify(body.name, { replacement: "-", lower: true }),
  });
  if (!updateCategory)
    return res.status(401).json({
      success: false,
      message: "Category not found or user not authorised",
    });

  res.json({
    success: true,
    message: "Update successfully!",
    category: updateCategory,
  });
};

const deleteCategory = async ({ params }, res) => {
  const deleteCategory = await Category.findOneAndDelete(params);
  if (!deleteCategory) {
    return res.status(401).json({
      success: false,
      message: "Category not found or user not authorised",
    });
  }
};

module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
