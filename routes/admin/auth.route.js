const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');

router.post('/register', authController.register );
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.requestRefreshToken);
router.get('/', (req,res) => {
    res.send('This is admin page!')
})

module.exports = router