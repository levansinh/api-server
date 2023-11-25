const express = require("express");
const router = express.Router();
const imageController = require('../../controllers/image.controller')
const upload = require('../../middlewares/upload.middleware')

router.post('/upload', upload.array('images', 10) , imageController.upload)
router.get('/remove/:id', imageController.remove)

module.exports = router;