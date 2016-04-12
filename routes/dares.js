var express = require('express');
var router = express.Router();

var Dare = require('../models/dare');
var User = require('../models/user');

/* GET home page. */
router.post('/', function(req, res, next) {
  if (req.session.igUserID){ // if the session has been associated with an instagram ID, render the page
    console.log('req.session was found :' + req.session.id);
    var filter = { category: {$in: [req.body.category]}};

    User.findOne('instagramID', '_id', function(userErr, currentUser) {
      if (userErr) console.log(userErr);
      console.log('users=' + currentUser);

      Dare.findOneRandom(filter, function(dareErr, dare) {
        res.render('dare', {
          title: 'Dares',
          dare: dare,
          user: currentUser
           });
        });
    })
  }
  else { // otherwise, we know the user has not signed in.  Send them to sign in.
    res.redirect('/sign-in');
  }

});

router.get('/api/random', function(req, res, next) {
  var filter = { category: {$in: [req.query.category]}};

  User.findOne('instagramID', '_id', function(userErr, currentUser) {
    if (userErr) console.log(userErr);
    console.log('users=' + currentUser);

    Dare.findOneRandom(filter, function(dareErr, dare) {
      if (dareErr) console.log(dareErr);

      res.json(dare);
    });
  })
});



module.exports = router;
