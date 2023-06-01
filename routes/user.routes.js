
const { Router } = require('express');
const { getUsers, postUsers, putUsers, deleteUsers, patchUsers } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, existEmail, existUserById } = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-roles');

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

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validateFields
], putUsers);

router.patch('/', patchUsers);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], deleteUsers);

module.exports = router;