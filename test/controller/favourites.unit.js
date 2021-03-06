/* eslint-disable no-undef,func-names,prefer-template,no-underscore-dangle,node/no-unpublished-require */
const chai = require("chai");
const request = require("supertest");
const app = require("../../app");

const { expect } = chai;

let token;
let id;
const invalidID = "invalid";

describe("Testing validity of login in", function () {
  it("valid username and password will return status code 200", function (done) {
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

  it("valid username with invalid password will return status code 401", function (done) {
    request(app)
      .post("/users/login")
      .set("Content-Type", "application/json")
      .send({ username: "just_a_test", password: "brokenpassword" })
      .expect(401)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Testing the validity of search options", function () {
  it("Valid origin, destination, poi and mode will return status code 200", function (done) {
    request(app)
      .post("/favourites")
      .set({ "x-auth-token": token, "Content-Type": "application/json" })
      .send({ origin: "unimelb", destination: "CBD", poi: "Cafe", mode: "cycling" })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("valid origin, destination and mode, but with invalid poi 'KFC' will return status code 400", function (done) {
    request(app)
      .post("/favourites")
      .set({ "x-auth-token": token, "Content-Type": "application/json" })
      .send({ origin: "unimelb", destination: "CBD", poi: "KFC", mode: "cycling" })
      .expect(400)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("testing validity of token with getAllFavourites", function () {
  it("should get all favourites with the right token", function (done) {
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

  it("should not get all favourites with the wrong token", function (done) {
    request(app)
      .get("/favourites")
      .set("x-auth-token", "randomTokenValue")
      .expect(400)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("testing correctness of deleteFavourite with id", function () {
  it("should delete the favourites with the right id", function (done) {
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

  it("should not delete the favourites with the wrong id", function (done) {
    request(app)
      .delete("/favourites/" + invalidID)
      .set("x-auth-token", token)
      .expect(500)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
