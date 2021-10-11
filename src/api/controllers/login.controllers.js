const userService = require('../services/user.services');

const authenticate = async (req, res, next) => {
    const token = await userService.authenticate(req.body);
    
    return res.status(200).json({token});
};

module.exports = { 
    authenticate 
};