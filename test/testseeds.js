// test/seed.js

export default function seed(models) {
    return models.User.create({
      firstName: 'Jared',
      lastName: 'Palmer',
      email: 'jared@blah.com',
      Chapter: {
        name: 'New York',
        location: '10016',
      },
      Company: {
        name: 'Acme',
        email: 'info@acme.com',
      }
    }, {
      include: [models.Chapter, models.Company] // super cool shortcut to make related rows in one step
    })
  .catch(e => console.log(e))
}
Leverage Sequelize's Sync to reset the DB for each test.
// test/routes_spec.js

process.env.NODE_ENV = 'test'

import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import app from '../app'
import models from '../db/models/index'
import seed from './seed'
import logger from 'logfmt'

chai.use(chaiHttp)

const app = api(models)

describe('API Routes', () => {

  // start with a fresh DB 
  beforeEach(done => {
    models.sequelize.sync({ force: true, match: /_test$/, logging: false })
    .then(() => {
      return seed(models)
    }).then(() => {
      done()
    })

  })
  
  describe('GET /v1/users', (done) => {
    it('should get a list of users', (done) => {
      chai.request(app)
      .get('/v1/users')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        done()
      })
    })
  })
  
})