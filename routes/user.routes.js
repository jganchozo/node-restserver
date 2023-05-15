
const { Router } = require('express');
const { getUsers, postUsers, putUsers, deleteUsers, patchUsers } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, existEmail } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and contains more than 6 letters').isLength({ min: 6 }),
    check('mail', 'Invalid email').isEmail(),
    check('mail').custom(existEmail),
    //check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
], postUsers);

router.put('/:id', putUsers);

router.patch('/', patchUsers);

router.delete('/', deleteUsers);

module.exports = router;