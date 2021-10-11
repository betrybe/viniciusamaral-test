const express = require("express");
const { body } = require('express-validator');
const router = express.Router();

const { ERROR_MSG_LOGIN_EMPTY_FIELDS, ERROR_MSG_LOGIN_INVALID_EMAIL } = require('../utilities/constants/error-messages');
const validationHandler = require('../middlewares/validation-handler');

const resource = require('../controllers/login.controllers');

router.post(
    '', 
    validationHandler.validate(
        [
            body('email').exists().withMessage(ERROR_MSG_LOGIN_EMPTY_FIELDS), 
            body('password').exists().withMessage(ERROR_MSG_LOGIN_EMPTY_FIELDS), 
            body('email').isEmail().withMessage(ERROR_MSG_LOGIN_INVALID_EMAIL)
        ]),
    resource.authenticate);

module.exports = router;