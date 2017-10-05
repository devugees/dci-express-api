"use strict";
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const Picture = require('../models/Picture');

const { removeDB } = require('../helpers');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app')
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Pictures', () => {

  const makeFakeImages = (n = 1) => {
    before(async () => {
      await Picture.remove()

      const images = []
      for (let i = 0; i < n; i++) {
        images.push(i)
      }

      for (let i of images) {
        await new Picture({
          author: '59d5e14670fb720b42ab6799',
          path: `/fake/path/${i}`
        }).save()
      }
    })
    console.log(`\n\n\t ${n} fake images were created 👍\n\n`)
  }

  makeFakeImages(10)

  describe('/GET Pictures', () => {
      it('it should GET all the Pictures from data base', (done) => {
        chai.request(server)
            .get('/pictureUpload')
            .end((err, res) => {
                res.should.have.status(200);
                // res.body.should.be.a('array');
              done();
            });
      });
  });

});
