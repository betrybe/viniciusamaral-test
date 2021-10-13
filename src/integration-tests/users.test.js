const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
const url = 'http://localhost:3000';

const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const { 
  ERROR_MSG_INVALID_ENTRIES, 
  ERROR_MSG_LOGIN_MISSING_TOKEN,
  ERROR_MSG_USER_ALREADY_EXISTS,
  ERROR_MSG_ONLY_ADMINS_ACTION,
} = require('../api/utilities/constants/error-messages');

const userStub = require('./stubs/user.stubs');

describe('1 - Users', () => {
  let connection;
  let db;
  let userInfo;

  before(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
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
    beforeEach(() => {
      userInfo = userStub.getNormalUser();
    });

    it('should not be possible to insert a new user with "name" field missing.', (done) => {
      delete userInfo.name;
  
      chai.request(url)
        .post('/users')
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });
  
    it('should not be possible to insert a new user with "email" field missing.', (done) => {
      delete userInfo.email;
  
      chai.request(url)
        .post('/users')
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });
  
    it('should not be possible to insert a new user with "password" field missing.', (done) => {
      delete userInfo.password;
  
      chai.request(url)
        .post('/users')
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });
  
    it('should not be possible to insert a new  with an invalid "email".', (done) => {
      userInfo.email = "vinicius.com";
  
      chai.request(url)
        .post('/users')
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });

    it('should not be possible to insert a new with an already registered "email".', (done) => {
      db.collection('users').insertOne(userInfo);
  
      chai.request(url)
        .post('/users')
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_USER_ALREADY_EXISTS.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_USER_ALREADY_EXISTS.message);
          done();
        });
    });
  
    it('should be possible to insert a new user.', (done) => {
      chai.request(url)
        .post('/users')
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
    beforeEach(() => {
      userInfo = userStub.getAdminUser();
    });

    it('should not be possible to insert a new admin user without being logged in.', (done) => {
      chai.request(url)
        .post('/users/admin')
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_LOGIN_MISSING_TOKEN.httpStatus);
          res.body.should.have.property('message').equal(ERROR_MSG_LOGIN_MISSING_TOKEN.message);
          done();
        });
    });

    it('should not be possible to insert a new admin user logged in as a normal user.', (done) => {
      chai.request(url)
        .post('/users/admin')
        .set({ 'Authorization': userStub.getNormalUserToken() })
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_ONLY_ADMINS_ACTION.httpStatus);
          res.body.should.have.property('message').equal(ERROR_MSG_ONLY_ADMINS_ACTION.message);
          done();
        });
    });

    it('should be possible to insert a new admin user.', (done) => {
      chai.request(url)
        .post('/users/admin')
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