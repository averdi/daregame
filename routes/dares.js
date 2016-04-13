var express = require('express');
var router = express.Router();

var Dare = require('../models/dare');
var User = require('../models/user');

/* selected a dare category on the home page */
router.post('/', function(req, res, next) {
  if (req.session.igUserID){ // if the session has been associated with an instagram ID, render the page
    var filter = { category: {$in: [req.body.category]}};

    User.findOne('instagramID', '_id', function(userErr, currentUser) {
      if (userErr) console.log(userErr);
      Dare.findOneRandom(filter, function(dareErr, dare) {
        var user = req.session.igUserName;
        res.render('dare', {
          title: 'Dares',
          dare: dare,
          user: user
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
  // the following four lines were not being used.  Jason H
  // var igUserID = req.session.igUserID; // get the session variable and store it locally
  // User.findOne(igUserID, '_id', function(userErr, currentUser) {
  //   if (userErr) console.log(userErr);
  //   console.log('/api/random users=' + currentUser);

    Dare.findOneRandom(filter, function(dareErr, dare) {
      if (dareErr) console.log(dareErr);
      res.json(dare);
    });
  // })
});

//A user accepts a Dare
router.patch('/:id', function(req, res, next){
  var id = req.params.id;
  Dare.findOneAndUpdate({ _id: id }, {accepted: "true"} ,function(err, dare){
    console.log(dare);
    User.findOneAndUpdate(
        { instagramID: req.session.igUserID },
        {$push: {"dares": dare }},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(model);
            console.log(err);
            res.send("Success!");
        }
    );
  });
  // User.find({_id: req.session.user}, function(err, userDocument) {
  //   if (err) console.log(err);
  //   console.log(userDocument);
  //   console.log(req.session.user);
  //  res.redirect('/dares');
  //   console.log(req.session.ourUserID);
  //   user = req.session.igUserName; // copy the Instagram user name session variable to a local variable
  //   res.render('userdare', {
  //     user: user // user is required to render the conditional log in / log out on layouts.ejs
  //   });
  // });
// res.send(req.body)
});

// router.get('/api', function(req, res, next){
//   User.find({ accepted: true }, 'hashtag', function(err, dares) {
//     if (err) console.log(err);
//     console.log(dares);
//     res.render('/dares', { dare: dares });
//   });
// });

// handle post to mark a dare as complete //
router.post('/complete', function(req, res, next) {
  if (req.session.igUserID){ // if the session has been associated with an instagram ID allow this action
    var dareID = { dareID: {$in: [req.body.dareId]}}; // create a key: value pair called filter
    var catID = { category: {$in: [req.body.category]}}; // create a key: value pair called filter


    User.findOne('instagramID', '_id', function(userErr, currentUser) {// get the user _id by searching out DB for instagramID
      if (userErr) console.log(userErr);
      console.log('users=' + currentUser);

      User.findOne(filter, function(dareErr, dare) {
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

module.exports = router;
