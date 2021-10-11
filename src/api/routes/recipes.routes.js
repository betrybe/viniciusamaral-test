const express = require("express");
const { body } = require('express-validator');

const router = express.Router();

const { ERROR_MSG_INVALID_ENTRIES, ERROR_MSG_LOGIN_INVALID_EMAIL } = require('../utilities/constants/error-messages');

const validationHandler = require('../middlewares/validation-handler');
const authenticationHandler = require('../middlewares/authentication-handler');

const resource = require('../controllers/recipes.controllers');

router.post(
    '',  
    authenticationHandler,
    validationHandler.validate(
        [
            body('name').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('ingredients').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('preparation').exists().withMessage(ERROR_MSG_INVALID_ENTRIES)
        ]),
    resource.create);

module.exports = router;
