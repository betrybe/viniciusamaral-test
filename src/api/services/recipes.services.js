const FunctionalErrorException = require('../utilities/exceptions/functional-error-exception');

const Recipe = require('../models/recipe.models');

const get = async ({ name, email, password, role }) => {

};

const list = async ({ name, email, password, role }) => {

};

const create = async ({ name, ingredients, preparation }, userId) => {
    const newRecipe = await Recipe.create({ name, ingredients, preparation, userId });
    
    return {
        _id: newRecipe.id,
        name: newRecipe.name,
        ingredients: newRecipe.ingredients,
        preparation: newRecipe.preparation,
        userId: newRecipe.userId
    };
};

const edit = async ({ name, email, password, role }) => {

};

const addImage = async ({ name, email, password, role }) => {

};

const getImage = async ({ name, email, password, role }) => {

};

module.exports = { 
    get, 
    list,
    create,
    edit,
    addImage,
    getImage
};