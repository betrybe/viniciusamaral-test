const mongoose = require('mongoose');

const getRecipe = () => {
    return {
        _id:  new mongoose.Types.ObjectId,
        name: 'frango com quiabo',
        ingredients: 'frango, quiabo e tomate',
        preparation: 'cozinhe por 10 minutos.',
    };
};

const getListOfRecipes = () => {
    return [
        {
            _id: new mongoose.Types.ObjectId,
            name: 'frango com quiabo',
            ingredients: 'frango, quiabo e tomate',
            preparation: 'cozinhe por 10 minutos.',
        },
        {
            _id: new mongoose.Types.ObjectId,
            name: 'bife com batata',
            ingredients: 'bife, batata',
            preparation: 'frite por 20 minutos.',
        },
        {
            _id: new mongoose.Types.ObjectId,
            name: 'bolo de cenoura',
            ingredients: 'cenoura, ovos, leite e fermento',
            preparation: 'asse por 35 minutos.',
        },
    ];  
};

module.exports = {
    getRecipe,
    getListOfRecipes,
};