const chai = require("chai");
const request = require("supertest");
const app = require("../../app");

const { expect } = chai;

let token;
describe("testing favourites using unit test", function () {
    it("should be valid username and password", function (done) {
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

    it("should be valid username and password", function (done) {
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


    it("should be valid searchOptions object", function (done) {
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

    it("should be valid searchOptions object", function (done) {
        request(app)
            .post("/favourites")
            .set({ "x-auth-token": token, "Content-Type": "application/json" })
            .send({ origin: "unimelb", destination: "CBD", poi: "KFC", mode: "Cycling" })
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });
    });

    let id;
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

    it("should get all favourites with the right token", function (done) {
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

    const randomId = 4439991;
    it("should delete the favourites with the right id", function (done) {
        request(app)
            .delete("/favourites/" + randomId)
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