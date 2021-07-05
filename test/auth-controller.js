const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller - Login", function () {
  it("should throw an error with code 500 if accessing the database fails", function (done) {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "ty@ty.com",
        password: "tester",
      },
    };

    AuthController.login(req, {}, () => {})
      .then((result) => {
        //   console.log(result);
        expect(result).to.be.an("error");
        expect(result).to.have.property("statusCode", 500);
        // expect(result).to.have.property("statusCode", 401); //to tigger error
        done(); //will signal to mocha to wait for this code to finish to execute
      })
      .catch(done);

    User.findOne.restore();
  });

  //will use a dedicated database instead of stubs
  it("should send a response with a valid user status for an existing user", function (done) {
    //connect to test dataabse
    mongoose
      .connect("mongodb://localhost:27017/nodetestDB")
      .then((result) => {
        //Define testing logic
        const user = new User({
            email: "ty@ty.com",
            password: "tester",
            name: "taibu",
            posts: []
        });
        return user.save()
      })
      .then(() => {})
      .catch((err) => console.log(err));
  });
});
