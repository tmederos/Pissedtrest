'use strict';
// NODE_ENV=test mocha ./test
var expect = require('chai').expect;
var prepare = require('mocha-prepare');

var db = require('../models');
var Pin = db.Pin;
var User = db.User;
var Board = db.Board;

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
      google_id: "t18723409322",
      username: 'tmederos'
    };
    User
    .create( userObj )
    .then( function (user) {
      // do some tests on user here
      // console.log( "New User Id - " + user.id );
      return User
      .findOne({ where: { id: user.id } })
      })
    .then((foundUser) => {
      // expect(foundUser).to.not.be.null
      // console.log( "Query New User:", foundUser);
      // console.log( "Query New User:  " + foundUser.username);
      // console.log( "Query New User:  " + foundUser.google_id);
      done();
    })
  });

  it('should load pin', function (done) {
    var userPin = {
      title: 'Test Title',
      description: 'The Description',
      category: 'Annoying',
      filepath: "/pubic/images/sample/toilet_paper.jpg"
    };
    Pin
    .create( userPin )
    .then( function (pin) {
      // do some tests on pin here
      // console.log( "New Pin Id - " + pin.id );
      return Pin
      .findOne({ where: { id: pin.id } })
    })
    .then((foundPin) => {
      // expect(foundPin).to.not.be.null
      // console.log( "Query New User:  ", foundPin);
      // console.log( "Query New Pin title:  " + foundPin.title);
      // console.log( "Query New Pin description:  " + foundPin.description);
      // console.log( "Query New Pin category:  " + foundPin.category);
      done();
    })
  });


  it('should load board', function (done) {
    var userBoard = {
      category: "Annoying",
      user_id: "1",
      pin_id: 1
    };
    Board
    .create( userBoard )
    .then( function (board) {
      // do some tests on board here
      console.log( "New Board Id - " + board.id );
      return Board
      .findOne({ where: { id: board.id } })
    })
    .then((foundBoard) => {
      // expect(foundPin).to.not.be.null
      console.log( "Query New Board:  ", foundBoard);
      console.log( "Query New Board category:  " + foundBoard.category);
      console.log( "Query New Board:  " + foundBoard.user_id);
      console.log( "Query New Board:  " + foundBoard.pin_id);
      done();
    })
  });


  after(function() {
    process.exit();
  });
 
 });

