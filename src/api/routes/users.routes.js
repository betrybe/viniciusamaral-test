const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const { 
    ERROR_MSG_INVALID_ENTRIES, 
    ERROR_MSG_LOGIN_INVALID_EMAIL,
} = require('../utilities/constants/error-messages');

const validationHandler = require('../middlewares/validation-handler');
const { 
    authenticationHandler, 
    isAdminAuthenticationHandler, 
} = require('../middlewares/authentication-handler');

const resource = require('../controllers/users.controllers');

router.post(
    '',  
    authenticationHandler,
    validationHandler.validate(
        [
            body('name').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('email').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('password').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('email').isEmail().withMessage(ERROR_MSG_LOGIN_INVALID_EMAIL),
        ],
    ),
    resource.create,
);

router.post(
    '/admin',  
    authenticationHandler,
    isAdminAuthenticationHandler,
    validationHandler.validate(
        [
            body('name').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('email').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('password').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('email').isEmail().withMessage(ERROR_MSG_LOGIN_INVALID_EMAIL),
        ],
    ),
    resource.createAdmin,
);

module.exports = router;