'use strict';
// NODE_ENV=test mocha ./test
var expect = require('chai').expect;
var prepare = require('mocha-prepare');

var db = require('../models');
var Pin = db.Pin;
var User = db.User;

describe('Pissedterest Database Testing', function (){ 
before(function(done) {
  // runs before all tests in this block
  // drops table and re-creates it
  db.sequelize.sync({ force: true }) 
    .then(() => {
      done();
    })
    .catch((error) => {
      done(error);
    });
  });
  // Insert a user
  it('should load user', function (done) {
    var userObj = {
      username: 'tmederos',
      email: 'trish@gmail.com'
    };
    User.create( userObj )
    .then( function (user) {
      // do some tests on user here
      console.log( "New User Id - " + user.id );
      User.findOne({ where: { id: user.id } }).then((foundUser) => {
        // expect(foundUser).to.not.be.null
        // console.log( "Query New User:  ", foundUser);
        console.log( "Query New User:  " + foundUser.username);
        console.log( "Query New User:  " + foundUser.email);
        // done();
      })
      done();
    });
  });

  // it('should load pin', function (done) {
  //   var userPin = {
  //     title: 'Test Title',
  //     description: 'The Description',
  //     category: 'Annoying',
  //     filepath: "/pubic/images/sample/toilet_paper.jpg"
  //   };
  //   Pin.create( userPin )
  //   .then( function (pin) {
  //     // do some tests on pin here
  //     console.log( "New Pin Id - " + pin.id );
  //     Pin.findOne({ where: { id: pin.id } }).then((foundPin) => {
  //       // expect(foundPin).to.not.be.null
  //       console.log( "Query New User:  ", foundPin);
  //       // console.log( "Query New Pin:  " + foundPin.title);
  //       // console.log( "Query New Pin:  " + foundPin.description);
  //       // console.log( "Query New Pin:  " + foundPin.category);
  //       done();
  //     })
  //     done();
  //   });
  // });
  after(function() {
    process.exit();
  });
 
 });

