const express = require('express');

const multer = require('multer');
const { body } = require('express-validator');
const storage = require('../services/storage.services');

const validationHandler = require('../middlewares/validation-handler');
const authenticationHandler = require('../middlewares/authentication-handler');

const upload = multer(storage);
const router = express.Router();

const { 
    ERROR_MSG_INVALID_ENTRIES,
} = require('../utilities/constants/error-messages');

const resource = require('../controllers/recipes.controllers');

router.get(
    '/:id',
    resource.get,
);

router.get(
    '',
    resource.list,
);

router.post(
    '',  
    authenticationHandler,
    validationHandler.validate(
        [
            body('name').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('ingredients').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('preparation').exists().withMessage(ERROR_MSG_INVALID_ENTRIES),
        ],
    ),
    resource.insert,
);

router.put(
    '/:id',  
    authenticationHandler,
    validationHandler.validate(
        [
            body('name').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('ingredients').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('preparation').exists().withMessage(ERROR_MSG_INVALID_ENTRIES),
        ],
    ),
    resource.update,
);

router.delete(
    '/:id',  
    authenticationHandler,
    resource.erase,
);

router.post(
    '/:id/image',  
    authenticationHandler,
    upload.single('image'),
    resource.addImage,
);

module.exports = router;
