const express = require('express');
const mongo = require('mongodb');
const router = express.Router();
const db = require('./database.js');
const database = db.database;

var posts = [
  {
    id: 0,
    username: "bob",
    content: "Hello World!"
  },
  {
    id: 1,
    username: "crow",
    content: "Lorem ipsum dolor sit amet."
  }
];

router.get('/', function(req, res) {
  let posts = [];
  db.database.collection("posts").find({}).toArray(function(err, result) {
    if (err) {
      res.status(404).send("Not found");
    }
    posts = result;
    console.log(posts);
    res.render('home.ejs', {posts: posts});
  });
})

router.get('/post/:postId', function(req, res) {
  let {postId} = req.params;
  db.database.collection('posts').findOne({_id: new  mongo.ObjectID(postId)}, function (err, result) {
    if (err) {
      console.log("Error");
      res.status(404);
      res.send("Comment not found");
    }
    let post = result;
    res.render('post.ejs', {post: post});
  });
})

router.post('/addPost', function(req, res) {
  const {username, content} = req.body;
  db.database.collection('posts').insertOne({
    username: username,
    content: content
  }, function(err, result) {
    if (err) {
      res.status(404);
      res.send("Comment submit failed");
    }
    res.redirect('/');
  });
})

router.post('/editPost/:postId', function(req, res) {
  const {postId} = req.params;
  const {username, content} = req.body;
  let query = {_id: mongo.ObjectID(postId)};
  let newValues = { $set:
    {
    username: username,
    content: content
  }};
  db.database.collection('posts').updateOne(query, newValues, function(err, result) {
    if (err) {
      res.status(404);
      res.send("Comment to update not found");
    }
    res.redirect('/');
  });
})

router.post('/deletePost/:postId', function(req, res) {
  const {postId} = req.params;
  console.log(postId);
  let query = {_id: mongo.ObjectID(postId)};
  db.database.collection('posts').deleteOne(query, function(err, result) {
    if (err) {
      res.status(404);
      res.send("Comment to delete not found");
    }
    res.redirect('/');
  });
})

module.exports = router;