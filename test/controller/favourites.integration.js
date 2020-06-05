/* eslint-disable no-undef,node/no-unpublished-require,func-names,prefer-template */
const chai = require("chai");
const request = require("supertest");
const app = require("../../app");

const { expect } = chai;

/* learnt from
https://stackoverflow.com/questions/19594611/node-js-express-mocha-supertest-rest-api-empty-request-body */
describe("testing a simple application", function () {
  let token;
  it("should return code 200", function (done) {
    request(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("should return the token", function (done) {
    request(app)
      .post("/users/login")
      .set("Content-Type", "application/json")
      .send({ username: "just_a_test", password: "just_a_test" })
      .expect(200, "Login successful")
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          token = res.headers["x-auth-token"];
          done();
        }
      });
  });

  it("should add the favourites", function (done) {
    request(app)
      .post("/favourites")
      .set({ "x-auth-token": token, "Content-Type": "application/json" })
      .send({ origin: "unimelb", destination: "CBD", poi: "Coffee", mode: "Cycling" })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  let id;
  it("should find the favourites", function (done) {
    request(app)
      .get("/favourites")
      .set("x-auth-token", token)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          id = res.body[0]._id;
          expect(res.body).to.be.an("array");
          done();
        }
      });
  });

  it("should delete the favourites", function (done) {
    request(app)
      .delete("/favourites/" + id)
      .set("x-auth-token", token)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
