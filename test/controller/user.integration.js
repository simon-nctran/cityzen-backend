var app = require('../../app'),
    chai = require('chai'),
    request = require('supertest');

var expect = chai.expect;
describe('API Tests', function() {
    const task = {
        "username": "just_a_test",
        "password": "just_a_test"
    };
    describe('# Get all users', function() {
        it('should get all tasks', function(done) {
            request(app) .get('/users') .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });

    describe('## Create new user ', function() {
        it('should create a new user', function(done) {
            request(app). post('/users/new') .send(task) .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
    });
});
