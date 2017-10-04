//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../models/Picture');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = 'http://localhost:8080';
const should = require('should');
chai.use(chaiHttp);
//Our parent block
describe('Pictures', () => {
  describe('/GET Pictures', () => {
      it('it should GET all the Pictures', (done) => {
        chai.request(server)
            .get('/pictureUpload')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              done();
            });
      });
  });

});
