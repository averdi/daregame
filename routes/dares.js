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
  var user = req.session.igUserName;  // assign the session variable to a local variable
  var id = req.params.id;
  Dare.findOneAndUpdate({ _id: id }, {accepted: "true"} ,function(err, dare){
    console.log(dare);
    User.findOneAndUpdate(
        { instagramID: req.session.igUserID },
        {$push: {"dares": dare }},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
            console.log('from dares.js .patch /:id route model = ' + model);
            res.render("userdare", { user: user, daresArray: model }); // pass the view this key: val pair
        }
    );
  });
});

//get the user variable
router.get('/layout',function(req,res){
  res.render("layout.",{user:req.session.igUserID});
});


// router.get('/api', function(req, res, next){
//   User.find({ accepted: true }, 'hashtag', function(err, dares) {
//     if (err) console.log(err);
//     console.log(dares);
//     res.render('/dares', { dare: dares });
//   });
// });

// handle post to mark a dare as complete //
// must pass in key: value pairs as hidden fields dareID: and category:
// router.post('/complete', function(req, res, next) {
//   if (req.session.igUserID){ // if the session has been associated with an instagram ID allow this action
//     var dareID = { dareID: {$in: [req.body.dareId]}}; // create a key: value pair called filter
//     var catID = { category: {$in: [req.body.category]}}; // create a key: value pair called filter
//     Dare.find({ _id : dareID }, 'hashtag', function (Err, currentDareHash){ // get the hashtag of the user's dare from the database
//       if (userErr) console.log(userErr);
//       var id = process.env.INSTAGRAM_ID;
//       var accessToken = req.session.igUserAccessToken;  //copy the session variable to a local
//       var url = 'http://localhost:3000/auth';//the environment variable

//       // this builds the 'options' variable that will be used in the next block of code 'request'
//       var options = {
//         url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN'
//         url: 'https://api.instagram.com/oauth/access_token',
//         method: 'POST',
//         body: querystring.stringify(body)// turn body into a string
//       };

//       request(options, function (error, response, body) {// make the call to Instagram
//         if (!error && response.statusCode == 200) { // if no error and status is good,
//           console.log(body); // show body
//           var name = JSON.parse(body).user.username; // put name in a variable
//     })
//   }
//   else { // otherwise, we know the user has not signed in.  Send them to sign in.
//     res.redirect('/sign-in');
//   }
// });

// copied from the sign in routine
        // router.get('/sign-in', function(req, res){
        //   console.log('in /sign-in')
        //   var id = process.env.INSTAGRAM_ID;
        //   var url = 'http://localhost:3000/auth';//the environment variable
        //   //redirect the browser to this address, passing it INSTAGRAM_ID for 'client_id'.
        //   //have it send the response back to /auth
        //   res.redirect(`https://api.instagram.com/oauth/authorize/?client_id=${id}&redirect_uri=${url}&response_type=code`)
        // })


    // User.findOne('instagramID', '_id', function(userErr, currentUser) {// get the user _id by searching out DB for instagramID
    //   if (userErr) console.log(userErr);
    //   console.log('users=' + currentUser);

    //   User.findOne(filter, function(dareErr, dare) {
    //     res.render('dare', {
    //       title: 'Dares',
    //       dare: dare,
    //       user: currentUser
    //        });
    //     });
    // })


module.exports = router;
