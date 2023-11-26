const slugify = require("slugify");
const Brand = require("../models/category.model");
const asyncHandler = require("express-async-handler");

const getAllBrand = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  res.status(response ? 200 : 400 ).json({
    status: response ? "success" : "failed",
    data: response ? response : "Brand invalid",
  });
});

const createBrand = asyncHandler(async ({ body }, res) => {
  if(!(Object.keys(body).length === 0) ) throw new Error('Data is empty');
  if(body && body.name) body.slug = slugify(body.name, { replacement: "-", lower: true })
    const response = await Brand.create(body);
    res.status(response ? 200 : 400 ).json({
      status: response ? "success" : "failed",
      message: response ? "Create successfully" : "Create failed",
    });
  });

const updateBrand = async ({ params, body }, res) => {
  if(!params.id || !(Object.keys(body).length === 0)) throw new Error("Missing inputs")
  if(body && body.name) body.slug = slugify(body.name, { replacement: "-", lower: true })
  const response = await Brand.findByIdAndUpdate(params.id, body, {new: true})
  res.status(response ? 200 : 400 ).json({
    status: response ? "success" : "failed",
    message: response ? "Update successfully" : "Update failed",
  });
};

const deleteBrand = async ({ params }, res) => {
  const { id } = params
  const response = await Brand.findOneAndDelete(id);
  res.status(response ? 200 : 400 ).json({
    status: response ? "success" : "failed",
    message: response ? "Update successfully" : "Update failed",
  });
};

module.exports = {
  getAllBrand,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
