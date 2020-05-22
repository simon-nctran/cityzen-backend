require ("../../models/users.js");
const mongoose = require('mongoose');
const users = mongoose.model('users')


var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();

var usersController = require('../../controllers/usersController');

describe('usersController', function () {
    const mockResponse = (fake) => {
        const res = {};
        res.json = (obj) => {res.json=obj}; //res.json is a property I made on a whim jsut to store the res.send obj being passed
        return res;
    }
       
    const mockRequest = (session, body) => ({ 
        session,
        body,
    });

    describe('getUsersByUsername test', function() {
        it("Username Test should exist", function() {
            const req = mockRequest({params:{username:Test}},{});
            const fake = {data: {username:"Test", password:"Test", email: "test@mail.com"}};
            const res = mockResponse(fake);
            usersController.getUsersByUsername(req, res);
            const result = fake.lastArg;
            expect(result).to.have.lengthOf(2);
            result.should.have.lengthOf(2);
            assert.equal(result.length, 2);
        })
    }); 
});