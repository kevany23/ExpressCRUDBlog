const express = require('express');
const router = express.Router();

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
  res.render('home.ejs', {posts: posts});
})

router.get('/post/:postId', function(req, res) {
  let {postId} = req.params;
  if (postId < 0 || postId >= posts.length) {
    console.log("Error");
    res.status(404);
    res.send("Comment not found.")
  }
  res.render('post.ejs', {post: posts[postId]});
})

router.post('/addPost', function(req, res) {
  const {username, content} = req.body;
  posts.push({
    id: posts.length,
    username: username,
    content: content
  });
  res.redirect('/');
})

router.post('/editPost/:postId', function(req, res) {
  const {postId} = req.params;
  const {username, content} = req.body;
  if(postId < 0 ||postId >= posts.length) {
    res.status(404);
    res.send("Comment not found");
  }
  posts[postId].username = username;
  posts[postId].content = content;
  res.redirect('/');
})

router.post('/deletePost/:postId', function(req, res) {
  const {postId} = req.params;
  if(postId < 0 ||postId >= posts.length) {
    res.status(404);
    res.send("Comment not found");
  }
  posts.splice(postId, 1);
  for (let i = 0; i < posts.length; i++) {
    posts[i].id = i;
  }
  res.redirect('/');
})

module.exports = router;