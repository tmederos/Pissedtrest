'use strict';

var expect = require('chai').expect;

var db = require('../models');
var Pin = db.Pin;

describe('pissedterest-model', function () {
  it('should load', function (done) {
    Pin.create({
      id: '10',
      title: 'Test Title',
      description: 'The Description',
      category: 'Annoying',
      filepath: "/pubic/images/sample/toilet_paper.jpg"
    }).then( function (article) {
      // do some tests on article here
      done();
    });
  });
});

