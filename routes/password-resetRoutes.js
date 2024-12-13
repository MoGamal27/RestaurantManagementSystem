const { resetPassword, resetUserPassword } = require('../controllers/password-resetController');

const router = require('express').Router();

router.post('/reset-password', resetPassword);

router.post('/reset-password/:userId/:token', resetUserPassword);

module.exports = router;