const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const { MongoClient } = require('mongodb');
const { MONGO_DB_URL } = require('../api/config/constants/settings');

const userStub = require('./stubs/users.stubs');

const app = require('../api/server');

const { 
    ERROR_MSG_LOGIN_EMPTY_FIELDS,
    ERROR_MSG_INVALID_LOGIN,
  } = require('../api/utilities/constants/message-constants');

describe('2 - Login', function() {
    let connection;
    let db;
    let userInfo;

    this.timeout(60000);

    before(async () => {
        connection = await MongoClient.connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        db = connection.db('Cookmaster');
    });

    beforeEach(async () => {
        await db.collection('users').deleteMany({});
        await db.collection('recipes').deleteMany({});

        userInfo = userStub.getNormalUser();
        await db.collection('users').insertOne(userInfo);
    });

    after(async () => {
        await connection.close();
    });

    describe('POST /login', () => {
        const route = '/login';       

        it('should not be possible to log in without passing "email".', (done) => {
            const loginInfo = {
                password: userInfo.password
            };

            chai
                .request(app)
                .post(route)
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_LOGIN_EMPTY_FIELDS.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_LOGIN_EMPTY_FIELDS.message);
                    done();
                });
        });

        it('should not be possible to log in without passing "password".', (done) => {
            const loginInfo = {
                email: userInfo.email
            };

            chai
                .request(app)
                .post(route)
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_LOGIN_EMPTY_FIELDS.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_LOGIN_EMPTY_FIELDS.message);
                    done();
                });
        });

        it('should not be possible to log in with an invalid "email".', (done) => {
            const loginInfo = {
                email: "invalid-email.com",
                password: userInfo.password
            };

            chai
                .request(app)
                .post(route)
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_INVALID_LOGIN.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_INVALID_LOGIN.message);
                    done();
                });
        });

        it('should not be possible to log in with an inexisting user.', async () => {
            const loginInfo = {
                email: 'unexisting-user@email.com',
                password: '12345'
            };

            chai
                .request(app)
                .post(route)
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_INVALID_LOGIN.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_INVALID_LOGIN.message);
                });
        });

        it('should be possible to log in.', (done) => {
            const loginInfo = {
                email: userInfo.email,
                password: userInfo.password
            };

            chai
                .request(app)
                .post(route)
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(200);  
                    res.body.should.have.property('token');
                    done();
                });
        });
    });
});