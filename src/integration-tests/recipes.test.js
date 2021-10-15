const app = require('../api/server');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
const url = 'http://localhost:3000';
var requester = chai.request.agent(url);

const { MongoClient } = require('mongodb');

const recipesStub = require('./stubs/recipes.stubs');
const userStub = require('./stubs/users.stubs');

const { 
    ERROR_MSG_RECIPE_NOT_FOUND,
} = require('../api/utilities/constants/message-constants');

const { UPLOAD_DIRECTORY } = require('../api/config/constants/settings')

describe('3 - Recipes', () => {
    let connection;
    let db;
    let recipeInfo;
    let listOfRecipes;

    before(async () => {
        // connection = await MongoClient.connect(mongoDbUrl, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        // db = connection.db('Cookmaster');
    });

    beforeEach(async () => {
        //await db.collection('recipes').deleteMany({});
    });

    after(async () => {
        //await connection.close();
    });

    // describe('GET /recipes', () => {
    //     const route = '/recipes';

    //     beforeEach(() => {
    //         listOfRecipes = recipesStub.getListOfRecipes();
    //     });          

    //     it('should be possible to list recipes.', async () => {
    //         await db.collection('recipes').insertMany(listOfRecipes);

    //         requester
    //             .get(route)
    //             .end((err, res) => {
    //                 res.should.have.status(200);  
    //                 res.body.should.have.lengthOf(listOfRecipes.length);
    //             });
    //     });
    // });

    describe('GET /recipes/:id', () => {
        const route = '/recipes/:id';

        beforeEach(() => {
            recipeInfo = recipesStub.getRecipe();
        }); 

        it('should not be possible to get an unexisting recipe.', (done) => {
            const recipeId = recipeInfo._id.toString();

            requester
                .get(route.replace(':id', recipeId))
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_RECIPE_NOT_FOUND.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_RECIPE_NOT_FOUND.message);
                    done();
                });
        });

        it('should not be possible to get a recipe passing an invalid recipe id.', (done) => {
            const recipeId = '123456';

            requester
                .get(route.replace(':id', recipeId))
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_RECIPE_NOT_FOUND.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_RECIPE_NOT_FOUND.message);
                    done();
                });
        });

        // it('should be possible to get a specific recipe.', async () => {
        //     await db.collection('recipes').insertOne(recipeInfo);
            
        //     requester
        //         .get(route.replace(':id', recipeInfo._id.toString()))
        //         .end((err, res) => {
        //             res.should.have.status(200);  
        //         });
        // });
    });

    describe('POST /recipes', () => {
        const route = '/recipes';

        beforeEach(() => {
            recipeInfo = recipesStub.getRecipe();
        }); 

        it('should be possible to insert a new recipe.', (done) => {
            requester
                .post(route)
                .set({ 'Authorization': userStub.getAdminUserToken() })
                .send(recipeInfo)
                .end((err, res) => {
                    res.should.have.status(201);  
                    res.body.should.have.property('recipe').that.has.property('name').equal(recipeInfo.name);
                    res.body.should.have.property('recipe').that.has.property('ingredients').equal(recipeInfo.ingredients);
                    res.body.should.have.property('recipe').that.has.property('preparation').equal(recipeInfo.preparation);
                    done();
                });
        });
    });

    describe('GET /image/:id', () => {
        const route = '/images/:id';

        beforeEach(() => {
            recipeInfo = recipesStub.getRecipe();
        }); 

        it('should be possible to get a recipe image.', (done) => {
            requester
                .get(route.replace(':id', 'ratinho.jpg'))
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});