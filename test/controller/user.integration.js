/* eslint-disable no-undef */
const chai = require("chai");
const request = require("supertest");

const app = require("../../app");

const { expect } = chai;
describe("API Tests", () => {
  const task = {
    username: "just_a_test",
    password: "just_a_test",
  };
  describe("# Get all users", () => {
    it("should get all tasks", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("## Create new user ", () => {
    it("should create a new user", (done) => {
      request(app)
        .post("/users/new")
        .send(task)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
});
