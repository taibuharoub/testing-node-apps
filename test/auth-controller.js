const expect = require("chai").expect;
const sinon = require("sinon");

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

    AuthController.login(req, {}, () => {}).then((result) => {
    //   console.log(result);
    expect(result).to.be.an("error");
    expect(result).to.have.property("statusCode", 500);
    // expect(result).to.have.property("statusCode", 401); //to tigger error
    done() //will signal to mocha to wait for this code to finish to execute 
    }).catch(done)

    User.findOne.restore();
  });
});
