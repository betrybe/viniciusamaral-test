const recipesService = require('../services/recipes.services');

const list = async (req, res, next) => {
    var result = await recipesService.list();
    
    return res.status(200).json(result);
};

const get = async (req, res, next) => {
    var result = await recipesService.get(req.params.id);
    
    return res.status(200).json(result);
};

const insert = async (req, res, next) => {
    const result = await recipesService.insert(req.body, req.user.id);

    return res.status(201).json(result);
};

const update = async (req, res, next) => {
    const result = await recipesService.update(req.params.id, req.body, req.user.id, req.user.role);
    
    return res.status(200).json(result);
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
    insert,
    update,
    addImage,
    getImage
};