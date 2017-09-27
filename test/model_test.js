//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../models/Post');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = 'http://localhost:8080';
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Post', () => {
  describe('/GET Posts', () => {
      it('it should GET all the Posts', (done) => {
        chai.request(server)
            .get('/post')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              done();
            });
      });
  });

});
