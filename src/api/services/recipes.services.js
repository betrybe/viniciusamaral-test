const FunctionalErrorException = require('../utilities/exceptions/functional-error-exception');
const { ERROR_MSG_RECIPE_NOT_FOUND, ERROR_MSG_INCORRECT_TOKEN } = require('../utilities/constants/error-messages');

const { ROLES } = require('../config/constants/settings');

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

const insert = async ({ name, ingredients, preparation }, userId) => {
    const newRecipe = await Recipe.create({ name, ingredients, preparation, userId });
    
    return {
        _id: newRecipe.id,
        name: newRecipe.name,
        ingredients: newRecipe.ingredients,
        preparation: newRecipe.preparation,
        userId: newRecipe.userId
    };
};

const update = async (_id, { name, ingredients, preparation }, userId, userRole) => {
    var recipe = await Recipe.findOne({_id});
    if (!recipe) {
        FunctionalErrorException(ERROR_MSG_RECIPE_NOT_FOUND);
    }

    if (!(recipe.userId == userId) && !(userRole == ROLES.ADMIN)) {
        throw new FunctionalErrorException(ERROR_MSG_INCORRECT_TOKEN);
    }

    var newRecipe = await Recipe.findOneAndUpdate(
        { _id }, 
        { 
            name, 
            ingredients, 
            preparation 
        }, 
        { returnOriginal: false});

    return {
        _id: newRecipe.id,
        name: newRecipe.name,
        ingredients: newRecipe.ingredients,
        preparation: newRecipe.preparation,
        userId: newRecipe.userId
    };
};

const addImage = async () => {

};

const getImage = async () => {

};

module.exports = { 
    get, 
    list,
    insert,
    update,
    addImage,
    getImage
};