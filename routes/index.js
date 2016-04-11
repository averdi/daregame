var express = require('express');
var router = express.Router();
var request = require('request'); // for the http calls
var querystring = require('querystring');


var Dare = require('../models/dare');

/* GET home page. */
router.get('/', function(req, res, next) {
  Dare.findOneRandom({}, function(err, dare) {
    res.render('dare', {
      title: 'Dares',
      dare: dare
       });
    });
});

// route for Instagram sign-in
router.get('/sign-in', function(req, res){
  var id = process.env.INSTAGRAM_ID;
  var url = 'http://localhost:3000/auth';//the environment variable
  //redirect the browser to this address, passing it INSTAGRAM_ID for 'client_id'.
  //have it send the response back to /auth
  res.redirect(`https://api.instagram.com/oauth/authorize/?client_id=${id}&redirect_uri=${url}&response_type=code`)
})

// route to recieve the request token and continue to log in with Instagram
router.get('/auth', function(req, res, next){
  var body = { // create body for the request
    client_id: process.env.INSTAGRAM_ID,
    client_secret: process.env.INSTAGRAM_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:3000/auth',
    code: req.query.code // the code variable from the URI returned by Instagram
  };

console.log("req.query.code= " + req.query.code); // I want to see it
  var options = {
    url: 'https://api.instagram.com/oauth/access_token',
    method: 'POST',
    body: querystring.stringify(body)// turn body into a string
  };

request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) { // if no error and status is good,
      console.log(body); // show body
      var name = JSON.parse(body).user.username; // put name in a variable
      var photo = JSON.parse(body).user.profile_picture;// put profile pic in a variable
      // show result, passing the user and image to the view
      res.render('welcome', {user: name, image: photo});
    }
  });
})

module.exports = router;
