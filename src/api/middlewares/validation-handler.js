const { validationResult } = require('express-validator');
const { ERROR_MSG_GENERIC } = require('../utilities/constants/error-messages');

const validate = (validations) => async (req, res, next) => {
    for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) 
            break;
    }
  
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
  
    const finalError = errors.array().length > 0 ? errors.array()[0] : ERROR_MSG_GENERIC;
    res.status(finalError.msg.httpStatus).json({ message: finalError.msg.message});
};

module.exports = {
    validate
};