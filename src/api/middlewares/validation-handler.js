const { validationResult } = require('express-validator');
const { ERROR_MSG_GENERIC } = require('../utilities/constants/error-messages');

const validate = (validations) => async (req, res, next) => {
    await Promise.all(validations.map(async (v) => {
        const result = await v.run(req);
        if (result.length > 0) {
            Promise.resolve(false);
        }
    }));
  
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
  
    const finalError = errors.array().length > 0 ? errors.array()[0] : ERROR_MSG_GENERIC;
    res.status(finalError.msg.httpStatus).json({ message: finalError.msg.message });
};

module.exports = {
    validate,
};