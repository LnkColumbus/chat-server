const { Router } = require('express');
const { check } = require('express-validator');

const { getChat } = require('../controllers/messages');
const { validateJWT, validateFields } = require('../middlewares');

const router = Router();

router.get('/:from', [
    validateJWT,
    check('from', 'Debe de ser un id válido de Mongo').isMongoId(),
    validateFields
], getChat);

module.exports = router;