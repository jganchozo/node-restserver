const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { existEmail } = require('../helpers/db-validators');

const router = Router();

router.post('/login', [
    check('mail', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
], login);

module.exports = router;