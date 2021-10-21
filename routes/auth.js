const { Router } = require('express');
const { body } = require('express-validator');

const { login, renewJWT, register } = require('../controllers/auth');
const { existsEmail } = require('../helpers');
const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

// Renovar JWT
router.get('/renew', validateJWT, renewJWT);

// Login de la aplicación
router.post('/login', [
    body('email', 'El correo es obligatorio').notEmpty(),
    body('email', 'Debe ser un correo válido').isEmail(),
    body('password', 'La contraseña es obligatoria').notEmpty(),
    validateFields
], login);

// Registrar un nuevo usuario
router.post('/register', [
    body('name', 'El nombre es obligatorio').notEmpty(),
    body('email', 'El correo es obligatorio').notEmpty(),
    body('email', 'Debe ser un correo válido').isEmail(),
    body('email').custom( existsEmail ),
    body('password', 'La contraseña es obligatoria').notEmpty(),
    body('password', 'La contraseña debe de ser de más de 6 caracteres').isLength({ min: 6 }),
    validateFields
], register);

module.exports = router;