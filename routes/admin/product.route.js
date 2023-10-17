const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");
const { verryToken } = require("../../middlewares/auth.middleware");

router.delete("/:id", verryToken, productController.deleteProduct);
router.put("/:id", verryToken, productController.updateProduct);
router.post("/", verryToken, productController.createProduct);
router.get("/:id", productController.getProductById);
router.get("/", productController.getAllProduct);

module.exports = router;
