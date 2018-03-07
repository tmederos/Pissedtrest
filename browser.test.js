var nightmare = require("nightmare");
var expect = require('chai').expect;

describe("can start server and browser", function() {
  this.timeout(30000);

  it("should load a page", function(done) {
    nightmare({ show: true })
    .goto("http://localhost:3000")
    .evaluate(function() {
        return document.title;
      })
      .then(function(title) {
        console.log(title);
        expect(title).to.equal("Pissedtrest");
        done();
      });
  });

  it("should login a user", function(done) {
    nightmare({ show: true })
      .goto("http://localhost:3000")
      .cookies.clearAll()
      .then(function(){
        nightmare({ show: true })
          .goto("http://localhost:3000")
          .click("#nav-login")
          .wait(5000)
          .screenshot("login.png")
          .then(function() {
            console.log("Login Image");
            done();
        });
      });
  });

  after(function() {
    process.exit();
  });

});