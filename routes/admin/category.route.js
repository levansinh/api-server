const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category.controller");
const { verryToken, isAdmin } = require("../../middlewares/verryToken");

router.delete("/:id",[verryToken, isAdmin], categoryController.deleteCategory);
router.put("/:id", [verryToken, isAdmin], categoryController.updateCategory);
router.post("/",[verryToken, isAdmin], categoryController.createCategory);
router.get("/:id", categoryController.getCategoryById);
router.get("/", categoryController.getAllCategory);

module.exports = router;
