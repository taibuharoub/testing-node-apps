const expect = require("chai").expect;
const authMiddleware = require("../middleware/is-auth");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

//will test the behaviour when it returns null.

it("should throw an error if no header is present", function () {
  const req = {
    get: function (headerName) {
      return null;
    },
  };
  expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
    "Not authenticated."
  );
});

it("should throw an error if the authorization is only one string", function () {
  const req = {
    get: function (headerName) {
      return "xghs";
    },
  };
  expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
});

//Grouping tests
describe("Auth middleware", function () {
  it("should throw an error if no header is present", function () {
    const req = {
      get: function (headerName) {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("should throw an error if the authorization is only one string", function () {
    const req = {
      get: function (headerName) {
        return "xghs";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yeild a userId after decoding the token", function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyziiwoowddawwwsas";
      },
    };

    //will replace the verify function with a stub or mock
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });

    // will manually call the authMiddleware function
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc"); //optional
    expect(jwt.verify.called).to.be.true; //optional
    jwt.verify.restore(); //will restore the original function
  });

  it("should throw an error if the token cannot be verified", function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});

/***
 * Manually stubbing/mocking
 * Example
 */

/* it("should yeild a userId after decoding the token", function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyziiwoowddawwwsas";
      },
    };

    //will replace the verify function with a stub or mock
    jwt.verify = function() {
        return { userId: "abc"}
    };

    // will manually call the authMiddleware function
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
  }); */
