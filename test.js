var expect = require("chai").expect;
var titleize = require ("../titleize.js");

describe("titleize", function() {

  it("should return a string with init caps", function() {
    expect(titleize ("mr jones")).to.equal("Mr Jones");
  });

});