const usersService = require('../services/users.services');

const create = async (req, res, next) => {
    const creationResult = await usersService.create(req.body);

    return res.status(201).json(creationResult);
};

module.exports = { create };