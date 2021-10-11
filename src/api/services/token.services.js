const jwt = require('jsonwebtoken');

const FunctionalErrorException = require('../utilities/exceptions/functional-error-exception');
const { 
    ERROR_MSG_LOGIN_MISSING_TOKEN, 
    ERROR_MSG_INCORRECT_TOKEN,
} = require('../utilities/constants/error-messages');

const { TOKEN } = require('../config/constants/settings');

const generate = ({ id, email, role }) => {
    const userClaims = { id, email, role };

    const token = jwt.sign(
        userClaims, 
        TOKEN.SECRET, 
        { 
            subject: userClaims.id, 
            expiresIn: TOKEN.EXPIRES_IN,
        },
    );

    return token;
};

const validate = (tokenHeader) => {
    if (!tokenHeader) {
        throw new FunctionalErrorException(ERROR_MSG_LOGIN_MISSING_TOKEN);
    }

    const splitedTokenHeader = tokenHeader.split(' ');
    if (!splitedTokenHeader || !splitedTokenHeader.length === 2) {
        throw new FunctionalErrorException(ERROR_MSG_LOGIN_MISSING_TOKEN);
    }

    try {
        return jwt.verify(splitedTokenHeader[1], TOKEN.SECRET);
    } catch (err) {
        throw new FunctionalErrorException(ERROR_MSG_INCORRECT_TOKEN);
    }
};

module.exports = {
    generate,
    validate,
};