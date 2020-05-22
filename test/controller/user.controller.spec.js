var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();

var usersController = require('../../controllers/usersController');
const users = require('../../models/users');

describe('usersController', function () {
    const mockResponse = (fake) => {
        return {
            send: fake
        };
    }
       
    const mockRequest = (session, body) => ({ 
        session,
        body,
    });

    describe('getUsersByUsername test', function() {
        it("should have length of 2", function() {
        })
        it("should have id, first_name, and last_name", function() {
        })
        it('should return all authors', function() {
        });
    }); 
});