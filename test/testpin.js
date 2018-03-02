'use strict';

var expect = require('chai').expect;

var db = require('../models');
var Pin = db.Pin;


describe('pissedtrest', () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(async () => {
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  // it('should have all associations', async () => {
  //   const user = await db.User.findOne({id: 1 });
  //   const pin = await user.getPins();
  //   expect(user.length).to.equal(1);
  //   expect(user[0].get().name).to.equal('Trish');
  // });
});
