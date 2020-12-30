const express = require('express');
const app = express();
const path = require('path');
const db = require('./database.js');
const router = require('./blog.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({extended: true}));
app.use('/', router);

const port = 3000;
app.listen(port, () => {
  console.log("Server started!")
});


app.get('/about', (req, res) => {
  res.send("About page");
})
