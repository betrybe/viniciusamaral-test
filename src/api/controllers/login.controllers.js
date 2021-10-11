const userService = require('../services/users.services');

const authenticate = async (req, res, next) => {
    const token = await userService.authenticate(req.body);
    
    return res.status(200).json({token});
};

module.exports = { 
    authenticate 
};