const recipesService = require('../services/recipes.services');

const create = async (req, res, next) => {
    const creationResult = await recipesService.create(req.body, req.user.id);

    return res.status(201).json(creationResult);
};

module.exports = { create };