process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app')
const should = chai.should();

const { removeDB } = require('../helpers');


chai.use(chaiHttp);

describe('User Testing', () => {

  describe('/GET', () => {
    it('it should GET all the users', done => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
          done()
        })
    })
  })

  describe('/GET', () => {
    it('it should GET a single progile', done => {
      chai.request(server)
        .get('/afuh')
        .end((err, res) => {
            res.should.have.status(200);
          done()
        })
    })
  })
})
