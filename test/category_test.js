"use strict";
//During the test the env variable is set to test
process.env.NODE_ENV = "test";
require("dotenv").config({ path: ".env" });

const mongoose = require("mongoose");
const Category = require("../models/Category");

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require('../app');
const should = chai.should();
const expect = chai.expect;

const { removeDB } = require('../helpers');

chai.use(chaiHttp);

describe("Category", () => {
   removeDB(Category)
  describe("/GET", () => {
    it("it should GET all the Categories", done => {
      chai
        .request(server)
        .get("/api/category")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/GET/:CategoryId", () => {
    it("it should GET a Category ", done => {
      const category = new Category({ name: "animales" });
      category.save((err, category) => {
        chai
          .request(server)
          .get("/api/category/" + category.id)
          .send(category)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("name");
            res.body.should.have.property("_id").eql(category.id);

            done();
          });
      });
    });
  });
});

/*describe("/POST", () => {
    it("it should POST a category", done => {
      chai
        .request(server)
        .post("/category")
        .send({ category: "animals" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.category.should.have.property("category");
          done();
        });
    });
  });*/
