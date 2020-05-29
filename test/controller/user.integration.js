/* eslint-disable no-undef,node/no-unpublished-require,func-names */
const chai = require("chai");
const request = require("supertest");
const app = require("../../app");

const { expect } = chai;
describe("API Tests", function () {
  const task = {
    username: "just_a_test",
    password: "just_a_test",
  };
  const taskUpdate = {
    username: "just_a_test",
    searchOptions: [{ origin: "unimelb", destination: "CBD", poi: "KFC", mode: "transporting" }],
  };
  describe("# Get all users", function () {
    it("should get all tasks", function (done) {
      request(app)
        .get("/users")
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("## Create new user ", function () {
    it("should create a new user", function (done) {
      request(app)
        .post("/users/new")
        .send(task)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({});
          done();
        });
    });
  });
  describe("## Get user by username ", function () {
    it("should create a new user", function (done) {
      request(app)
        .get("/users/:username")
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({});
          done();
        });
    });
  });
  describe("## Login a user ", function () {
    it("should create a new user", function (done) {
      request(app)
        .post("/users/login")
        .send(task)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({});
          done();
        });
    });
  });
  describe("## Update a user ", function () {
    it("should create a new user", function (done) {
      request(app)
        .put("/users/update")
        .send(taskUpdate)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({});
          done();
        });
    });
  });
});
