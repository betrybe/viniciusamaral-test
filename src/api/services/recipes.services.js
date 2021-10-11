const FunctionalErrorException = require('../utilities/exceptions/functional-error-exception');
const { ERROR_MSG_RECIPE_NOT_FOUND } = require('../utilities/constants/error-messages');

const Recipe = require('../models/recipe.models');

const get = async (_id) => {
    var recipe = await Recipe.findOne({_id});
    if (recipe) {
        return recipe;
    }

    throw new FunctionalErrorException(ERROR_MSG_RECIPE_NOT_FOUND);
};

const list = async () => {
    return await Recipe.find();
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

const edit = async () => {

};

const addImage = async () => {

};

const getImage = async () => {

};

module.exports = { 
    get, 
    list,
    create,
    edit,
    addImage,
    getImage
};