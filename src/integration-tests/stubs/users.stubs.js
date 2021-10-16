var mongoose = require('mongoose');

const { ROLES } = require('../../api/config/constants/settings');

const getNormalUser = () => {
    return {
        _id: mongoose.Types.ObjectId('6169d84d5ba9bad14f5001f9'),
        name: 'user',
        email: 'user@email.com',
        password: '12345',
        role: ROLES.USER
    };
};

const getNormalUserToken = () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjlkODRkNWJhOWJhZDE0ZjUwMDFmOSIsImVtYWlsIjoidXNlckBlbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNDMyNjYwOCwiZXhwIjoyNDk4MzI2NjA4LCJzdWIiOiI2MTY5ZDg0ZDViYTliYWQxNGY1MDAxZjkifQ.8hhtDeXZEnEi9w4A77Y1oJ2DA4sLNAIQRz8DrFXU1yU';
};

const getAdminUser = () => {
    return {
        _id: mongoose.Types.ObjectId('6166d9b3d2a49e17f1964c3c'),
        name: 'admin', 
        email: 'admin@email.com', 
        password: 'admin', 
        role: ROLES.ADMIN
    };
};

const getAdminUserToken = () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjZkOWIzZDJhNDllMTdmMTk2NGMzYyIsImVtYWlsIjoicm9vdEBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQxMzAzNTcsImV4cCI6MjQ5ODEzMDM1Nywic3ViIjoiNjE2NmQ5YjNkMmE0OWUxN2YxOTY0YzNjIn0.LpwmWLqdD5RgkzPcZRXsUBGNluRIopigO93UxVWdh3o';
};

module.exports = {
    getNormalUser,
    getNormalUserToken,
    getAdminUser,
    getAdminUserToken
};