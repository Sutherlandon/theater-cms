/**
 * Author: Landon Sutherland
 * This is the server for the application.
 */

// import required packages
var express = require('express'),
    path = require('path'),
    imdb = require('imdb-api');

// build an express app
var app = express();

// serves public files like html, css, js, and img
app.use(express.static(path.join(__dirname, './../../dist/')));

// gets movie meta-data based on title from the imbd-api
app.get('/movie/:title', function (req, res) {
  imdb.getReq({
    name: req.params.title
  }, (err, data) => {
    res.send(data);
  });
});

// gets movie meta-data based on title from the imbd-api
app.get('/movie/:title/:year', function (req, res) {
  imdb.getReq({
    name: req.params.title,
    year: req.params.year
  }, (err, data) => {
    res.send(data);
  });
});

// fires up the server to listen on port 3000
app.listen(3000, function () {
  console.log('Theater-CMS running (port: 3000)');
});
