const expect = require("chai").expect;
const authMiddleware = require("../middleware/is-auth");

//will test the behaviour when it returns null

it("should throw an error if no header is present", function() {
    const req = {
        get: function(headerName) {
            return null;
        }
    }
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw("Not authenticated.");
})
