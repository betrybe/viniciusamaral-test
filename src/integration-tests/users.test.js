const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const mongoDbUrl = 'mongodb://mongodb:27017/Cookmaster';
const { MongoClient } = require('mongodb');

const userStub = require('./stubs/users.stubs');

const app = require('../api/server');

const userModel = require('../api/models/user.models');
const recipesModel = require('../api/models/user.models');
const settings = require('../api/config/constants/settings')

const { 
  ERROR_MSG_INVALID_ENTRIES, 
  ERROR_MSG_LOGIN_MISSING_TOKEN,
  ERROR_MSG_USER_ALREADY_EXISTS,
  ERROR_MSG_ONLY_ADMINS_ACTION,
} = require('../api/utilities/constants/message-constants');

describe('1 - Users', function() {
  let connection;
  let db;
  let userInfo;

  this.timeout(60000);

  before(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      connectTimeoutMS: 3000,
      serverSelectionTimeoutMS: 3000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('Cookmaster');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
  });

  after(async () => {
    await connection.close();
  });

  describe('POST /users', () => {
    const route = '/users';

    beforeEach(() => {
      userInfo = userStub.getNormalUser();

      const a = userModel.userSchema;
      const b = recipesModel.recipeSchema;
      const c = settings.TOKEN;
    });

    it('should not be possible to insert a new user with "name" field missing.', (done) => {
      delete userInfo.name;
  
      chai
        .request(app)
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });
  
    it('should not be possible to insert a new user with "email" field missing.', (done) => {
      delete userInfo.email;
  
      chai
        .request(app)
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });
  
    it('should not be possible to insert a new user with "password" field missing.', (done) => {
      delete userInfo.password;
  
      chai
        .request(app)
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });
  
    it('should not be possible to insert a new  with an invalid "email".', (done) => {
      userInfo.email = "vinicius.com";
  
      chai
        .request(app)
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });

    // it('should not be possible to insert a new user with an already registered "email".', async () => {
    //   await db.collection('users').insertOne(userInfo);
  
    //   chai
     //   .request(app)
    //     .post(route)
    //     .send(userInfo);
        
    //   res.should.have.status(ERROR_MSG_USER_ALREADY_EXISTS.httpStatus);  
    //   res.body.should.have.property('message').equal(ERROR_MSG_USER_ALREADY_EXISTS.message);
    // });
  
    it('should be possible to insert a new user.', (done) => {
      chai
        .request(app)
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(201); 
          res.body.should.have.property('user').that.has.property('name').equal(userInfo.name);
          res.body.should.have.property('user').that.has.property('email').equal(userInfo.email);
          res.body.should.have.property('user').that.has.property('email').equal(userInfo.email); 
          done();
        });
    });
  });

  describe('POST /users/admin', () => {
    const route = '/users/admin';

    beforeEach(() => {
      userInfo = userStub.getAdminUser();
    });

    it('should not be possible to insert a new admin user without being logged in.', (done) => {
      chai
        .request(app)
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_LOGIN_MISSING_TOKEN.httpStatus);
          res.body.should.have.property('message').equal(ERROR_MSG_LOGIN_MISSING_TOKEN.message);
          done();
        });
    });

    it('should not be possible to insert a new admin user logged in as a normal user.', (done) => {
      chai
        .request(app)
        .post(route)
        .set({ 'Authorization': userStub.getNormalUserToken() })
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_ONLY_ADMINS_ACTION.httpStatus);
          res.body.should.have.property('message').equal(ERROR_MSG_ONLY_ADMINS_ACTION.message);
          done();
        });
    });

    it('should be possible to insert a new admin user.', (done) => {
      chai
        .request(app)
        .post(route)
        .set({ 'Authorization': userStub.getAdminUserToken() })
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('user').that.has.property('name').equal(userInfo.name);
          res.body.should.have.property('user').that.has.property('email').equal(userInfo.email);
          res.body.should.have.property('user').that.has.property('email').equal(userInfo.email);
          done();
        });
    });
  });
});