const recipesService = require('../services/recipes.services');

const list = async (req, res, next) => {
    var result = await recipesService.list();
    
    return res.status(200).json(result);
};

const get = async (req, res, next) => {
    var result = await recipesService.get(req.params.id);
    
    return res.status(200).json(result);
};

const create = async (req, res, next) => {
    const result = await recipesService.create(req.body, req.user.id);

    return res.status(201).json(result);
};

const edit = async (req, res, next) => {
    return res.status(204);
};

const addImage = async (req, res, next) => {
    return res.status(204);
};

const getImage = async (req, res, next) => {
    return res.status(204);
};

module.exports = { 
    list,
    get,
    create,
    edit,
    addImage,
    getImage
};