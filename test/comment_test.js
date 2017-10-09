process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app')
const should = chai.should();

const { removeDB } = require('../helpers');

const mongoose = require("mongoose");
const Comment = require('../models/Comment');

chai.use(chaiHttp);

describe('Comments Testing', () => {
  removeDB(Comment)
  describe('/GET', () => {
    it('it should GET all the comments', done => {
      chai.request(server)
        .get('/api/comments')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
          done()
        })
    })
  })

  describe('/POST', () => {
    it('it should POST a comment', done => {
      chai.request(server)
        .post('/api/comments')
        .send({comment: 'this a test comment'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.comment.should.have.property('comment');
          done()
        })
    })
  })

  describe('/GET/:item_id', () => {
    it('it should GET a comment by the given id', done => {
      const comment = new Comment({ comment: "this a test comment"})

      comment.save((err, comment) => {
        chai.request(server)
          .get(`/api/comments/${comment.id}`)
          .send(comment)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('comment');
            res.body.should.have.property('_id').eql(comment.id);
          done()
          })
        })
    })
  })

  describe('/DELETE/:item_id', () => {
    it('it should DELETE a comment given the id', done => {
      const comment = new Comment({ comment: "this a test comment" })

      comment.save((err, book) => {
        chai.request(server)
          .delete(`/api/comments/${comment.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Message deleted');
          done()
          })
        })
    })
  })

  describe('/PUT/:item_id', () => {
    it('it should UPDATE a comment given the id', done => {
      const comment = new Comment({ comment: "this a test comment"})

      comment.save((err, book) => {
        chai.request(server)
          .put(`/api/comments/${comment.id}`)
          .send({comment: "This is an updated comment, pickle rick!"})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('comment');
            res.body.should.have.property('_id').eql(comment.id);
          done()
          })
        })
    })
  })

})
