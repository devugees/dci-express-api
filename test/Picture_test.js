"use strict";
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const Picture = require('../models/Picture');
const { removeDB } = require('../helpers');
//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = require('should');
chai.use(chaiHttp);
//Our parent block
describe('Pictures', () => {
removeDB(Picture)
  describe('/GET Pictures', () => {
      it('it should GET all the Pictures from data base', (done) => {
        chai.request(server)
            .get('/api/images')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              done();
            });
      });
  });

});
