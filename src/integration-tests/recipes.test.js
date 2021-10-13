const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
const url = 'http://localhost:3000';

const { MongoClient } = require('mongodb');

const recipesStub = require('./stubs/recipes.stubs');

const { 
    ERROR_MSG_RECIPE_NOT_FOUND,
} = require('../api/utilities/constants/error-messages');

describe('3 - Recipes', () => {
    let connection;
    let db;
    let recipeInfo;
    let listOfRecipes;

    before(async () => {
        connection = await MongoClient.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = connection.db('Cookmaster');
    });

    beforeEach(async () => {
        await db.collection('recipes').deleteMany({});
    });

    after(async () => {
        await connection.close();
    });

    describe('GET /recipes', () => {
        const route = '/recipes';

        beforeEach(() => {
            listOfRecipes = recipesStub.getListOfRecipes();
        });          

        it('should be possible to list recipes.', (done) => {
            db.collection('recipes').insertMany(listOfRecipes);

            chai.request(url)
                .get(route)
                .end((err, res) => {
                    res.should.have.status(200);  
                    res.body.should.have.lengthOf(listOfRecipes.length);
                    done();
                });
        });
    });

    describe('GET /recipes/:id', () => {
        const route = '/recipes/:id';

        beforeEach(() => {
            recipeInfo = recipesStub.getRecipe();
        }); 

        it('should not be possible to get an unexisting recipe.', (done) => {
            const recipeId = recipeInfo._id.toString();

            chai.request(url)
                .get(route.replace(':id', recipeId))
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_RECIPE_NOT_FOUND.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_RECIPE_NOT_FOUND.message);
                    done();
                });
        });

        it('should not be possible to get a recipe passing an invalid recipe id.', (done) => {
            const recipeId = '123456';

            chai.request(url)
                .get(route.replace(':id', recipeId))
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_RECIPE_NOT_FOUND.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_RECIPE_NOT_FOUND.message);
                    done();
                });
        });

        it('should be possible to get a specific recipe.', (done) => {
            db.collection('recipes').insertOne(recipeInfo);
            
            chai.request(url)
                .get(route.replace(':id', recipeInfo._id.toString()))
                .end((err, res) => {
                    res.should.have.status(200);  
                    res.body.should.have.property('_id').equal(recipeInfo._id.toString());
                    done();
                });
        });
    });
});