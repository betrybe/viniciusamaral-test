const ERROR_MSG_GENERIC = {
    httpStatus: 500,
    message: 'An unexpected error has ocurred'
};


// General
const ERROR_MSG_INVALID_ENTRIES = {
    httpStatus: 400,
    message: 'Invalid entries. Try again.'
};


// Login - Generate token
const ERROR_MSG_LOGIN_EMPTY_FIELDS = {
    httpStatus: 401,
    message: 'All fields must be filed'
};

const ERROR_MSG_LOGIN_INVALID = {
    httpStatus: 401,
    message: 'Incorret username or password'
};


// Login - Validate Token
const ERROR_MSG_LOGIN_MISSING_TOKEN = {
    httpStatus: 401,
    message: 'missing auth token'
};

const ERROR_MSG_INCORRECT_TOKEN = {
    httpStatus: 401,
    message: 'jwt malformed'
};


// User - Creation
const ERROR_MSG_USER_ALREADY_EXISTS = {
    httpStatus: 409,
    message: 'Email already registered'
};












module.exports = {
    ERROR_MSG_GENERIC,

    // General
    ERROR_MSG_INVALID_ENTRIES,

    // Login - Generate token
    ERROR_MSG_LOGIN_EMPTY_FIELDS,
    ERROR_MSG_LOGIN_INVALID,

    // Login - Validate Token
    ERROR_MSG_LOGIN_MISSING_TOKEN,
    ERROR_MSG_INCORRECT_TOKEN,
    
    // User - Creation
    ERROR_MSG_USER_ALREADY_EXISTS
};