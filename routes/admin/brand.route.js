const express = require("express");
const router = express.Router();
const brandController = require("../../controllers/brand.controller");
const { verryToken, isAdmin } = require("../../middlewares/verryToken");

router.delete("/:id",[verryToken, isAdmin], brandController.deleteBrand);
router.put("/:id", [verryToken, isAdmin], brandController.updateBrand);
router.post("/",[verryToken, isAdmin], brandController.createBrand);
router.get("/", brandController.getAllBrand);

module.exports = router;
