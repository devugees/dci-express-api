//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
require('dotenv').config({ path: 'variables.env' });

let mongoose = require("mongoose");
let Book = require('../models/Category');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = 'http://localhost:' + process.env.PORT;
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);
//Our parent block
describe('Category', () => {
  describe('/GET Categorys', () => {
      it('it should GET all the Categorys', (done) => {
        chai.request(server)
            .get('/category')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              done();
            });
      });
  });

});

