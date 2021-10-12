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
  ERROR_MSG_ONLY_ADMINS_ACTION 
} = require('../api/utilities/constants/error-messages');

describe('POST /users', () => {
  let connection;
  let db;

  let userInfo = {};

  before(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('Cookmaster');
  });

  beforeEach(async () => {
    userInfo = {
      "name": "vinicius2",
      "email": "vinicius.amaral@gmail.com",
      "password": "12345"
    };

    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
  });

  after(async () => {
    await connection.close();
  });

  describe('POST /users', () => {
    it('Será validado que não é possível incluir um usuário sem o campo "nome".', (done) => {
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
  
    it('Será validado que não é possível incluir um usuário sem o campo "email".', (done) => {
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
  
    it('Será validado que não é possível incluir um usuário sem o campo "password".', (done) => {
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
  
    it('Será validado que não é possível incluir um usuário com email inválido.', (done) => {
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
  
    it('Será validado que é possível incluir um user com sucesso.', (done) => {
      chai.request(url)
        .post('/users')
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(201);  
          done();
        });
    });
  });

  describe('POST /users/admin', () => {
    beforeEach(async () => {
      const users = {
        name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
      await db.collection('users').insertOne(users);
    });

    it('Será validado que não é possível incluir um usuário adminstrador sem estar autenticado.', (done) => {
      chai.request(url)
        .post('/users/admin')
        .send(userInfo)
        .end((err, res) => {
          console.log(res);
          res.should.have.status(ERROR_MSG_LOGIN_MISSING_TOKEN.httpStatus);
          res.body.should.have.property('message').equal(ERROR_MSG_LOGIN_MISSING_TOKEN.message);
          done();
        });
    });
  });
});