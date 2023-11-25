const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");
const { verryToken } = require("../../middlewares/verryToken");

router.delete("/:id", verryToken, productController.deleteProduct);
router.put("/:id", verryToken, productController.updateProduct);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProductById);
router.get("/", productController.getProducts);

module.exports = router;
