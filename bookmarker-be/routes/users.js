const express = require('express');
const checkForAuthentication  = require('../middlewares/auth');

const {
    handleUserRegister,
    handleUserLogin,
    handleUserDelete,
    handleUserUpdate,
} = require('../controllers/users');

const router = express.Router();

router.route('/register')
    .post(handleUserRegister);

router.route('/login')
    .post(handleUserLogin);

router.use(checkForAuthentication);

router.route('/:id')
    .delete(handleUserDelete)
    .put(handleUserUpdate);

module.exports = router;