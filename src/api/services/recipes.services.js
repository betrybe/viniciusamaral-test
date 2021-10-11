const FunctionalErrorException = require('../utilities/exceptions/functional-error-exception');
const { 
    ERROR_MSG_RECIPE_NOT_FOUND, 
    ERROR_MSG_INCORRECT_TOKEN, 
    ERROR_MSG_RECIPE_ALREADY_EXISTS,
} = require('../utilities/constants/error-messages');

const { ROLES } = require('../config/constants/settings');

const Recipe = require('../models/recipe.models');

const get = async (_id) => {
    const recipe = await Recipe.findOne({ _id });
    if (recipe) {
        return recipe;
    }

    throw new FunctionalErrorException(ERROR_MSG_RECIPE_NOT_FOUND);
};

const list = async () => Recipe.find();

const insert = async ({ name, ingredients, preparation }, userId) => {
    const recipe = await Recipe.findOne({ name });
    if (recipe) {
        throw new FunctionalErrorException(ERROR_MSG_RECIPE_ALREADY_EXISTS);
    }
    
    const newRecipe = await Recipe.create({ name, ingredients, preparation, userId });
    
    return {
        _id: newRecipe.id,
        name: newRecipe.name,
        ingredients: newRecipe.ingredients,
        preparation: newRecipe.preparation,
        userId: newRecipe.userId,
    };
};

const runUpdateValidations = async (_id, name, userId, userRole) => {
    const recipe = await Recipe.findOne({ _id });
    if (!recipe) {
        FunctionalErrorException(ERROR_MSG_RECIPE_NOT_FOUND);
    }

    const recipeSameName = await Recipe.findOne({ _id: { $ne: _id }, name });
    if (recipeSameName) {
        throw new FunctionalErrorException(ERROR_MSG_RECIPE_ALREADY_EXISTS);
    }

    if (recipe.userId != userId && userRole !== ROLES.ADMIN) {
        throw new FunctionalErrorException(ERROR_MSG_INCORRECT_TOKEN);
    }
};

const update = async (_id, { name, ingredients, preparation }, userId, userRole) => {
    await runUpdateValidations(_id, name, userId, userRole);

    const newRecipe = await Recipe.findOneAndUpdate(
        { _id }, { name, ingredients, preparation }, { returnOriginal: false },
    );

    return {
        _id: newRecipe.id,
        name: newRecipe.name,
        ingredients: newRecipe.ingredients,
        preparation: newRecipe.preparation,
        userId: newRecipe.userId,
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
    getImage,
};