var express = require('express');
var router = express.Router();
var request = require('request'); // for the http calls
var querystring = require('querystring');
var User = require('../models/user');
var session = require('express-session');
var cookieParser = require('cookie-parser');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Almost Shameless' });
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

  // this builds the 'options' variable that will be used in the next block of code 'request'
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
      req.session.igUserAccessToken = JSON.parse(body).user.access_token; //store the access token as a session variable
      req.session.igUserID = JSON.parse(body).user.id; //store the Instagram user ID as a session variable
      var iID = req.session.igUserID;
      console.log('iID = ' + parseInt(iID));
      User.findOne({ instagramID: iID }, '_id', function(err, user) { //get our user id based on a search for the instagram user ID
      //User.findOne({}, 'instagramID', function(err, user) {
        console.log('error in index.js = ' + err);
        console.log('user in index.js = ' + user);
        if (user === null){ // if the query returns user as null, the instagram ID was not found
          var user = new User({ instagramID: iID, dares: [] }); // this is a new user, add them to DB
          user.save(function (err) {
            if (err) return handleError(err);
          });
        }


      })

      // show result, passing the user and image to the view
      res.render('welcome', {user: name, image: photo});
    }
  });
});

//  route for Instagram sign-out
router.get('/sign-out',function(req, res){
  req.session.destroy(function() {
  //redirect the browser to index
  res.redirect('/');
})
});

module.exports = router;
