const express = require('express');
const router = express.Router();
const { verryToken, isAdmin } = require("../../middlewares/verryToken")
const userController = require("../../controllers/user.controller")

router.get('/forgot-password',verryToken, userController.forgotPassword)
router.put('/reset-password',verryToken, userController.resetPassword)
router.put('/',verryToken, userController.updateUser)
router.delete('/:id',verryToken, userController.deleteUser)

router.get('/users',[verryToken, isAdmin], userController.getAllUser)
router.get('/current',[verryToken], userController.getCurrent)

module.exports = router