process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app')
const should = chai.should();

const { removeDB } = require('../helpers');

const Comment = require('../models/Comment');
const Picture = require('../models/Picture');

chai.use(chaiHttp);

describe('Comments Testing', () => {
  removeDB(Comment)
  removeDB(Picture)

  const test = {
    content: 'Automatic test message',
    author: "",
    image: ""
  }

  const makeFakeImage = async () => {
    const image = await new Picture({
      author: '59d5e14670fb720b42ab6799',
      path: 'fake/path'
    })

    image.save((err, ima) => {
      test.author = ima.author;
      test.image = ima._id
    })
  }

  makeFakeImage()


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
        .post(`/c/${test.image}`)
        .send({ content: test.content })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
          done()
        })
    })
  })

  describe('/GET/:item_id', () => {
    it('it should GET a comment by the given id', done => {
      const comment = new Comment({
        content: test.content,
        author: test.author,
        image: test.image
      })

      comment.save((err, comment) => {
        chai.request(server)
          .get(`/api/comments/${comment.id}`)
          .send(comment)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('content');
            res.body.should.have.property('_id').eql(comment.id);
          done()
          })
        })
    })
  })

  describe('/get/:id', () => {
    it('it should DELETE a comment given the id', done => {
      const comment = new Comment({
        content: test.content,
        author: test.author,
        image: test.image
      })

      comment.save((err, comment) => {
        chai.request(server)
          .get(`/c/${comment.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
          done()
          })
        })
    })
  })

  describe('/PUT/:item_id', () => {
    it('it should UPDATE a comment given the id', done => {
      const comment = new Comment({
        content: test.content,
        author: test.author,
        image: test.image
      })

      comment.save((err, comment) => {
        chai.request(server)
          .put(`/api/comments/${comment.id}`)
          .send({content: "This is an updated comment, pickle rick!"})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('content');
            res.body.should.have.property('_id').eql(comment.id);
          done()
          })
        })
    })
  })

})
