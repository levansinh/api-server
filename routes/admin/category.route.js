const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category.controller");
const { verryToken } = require("../../middlewares/auth.middleware");

router.delete("/:id", verryToken, categoryController.deleteCategory);
router.put("/:id", verryToken, categoryController.updateCategory);
router.post("/", verryToken, categoryController.createCategory);
router.get("/:id", categoryController.getCategoryById);
router.get("/", categoryController.getAllCategory);

module.exports = router;
