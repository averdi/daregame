var express = require('express');
var router = express.Router();

var Dare = require('../models/dare');
var User = require('../models/user');

/* GET home page. */
router.post('/', function(req, res, next) {
var filter = { category: {$in: [req.body.category]}}

  Dare.findOneRandom(filter, function(err, dare) {
    res.render('dare', {
      title: 'Dares',
      dare: dare
       });
    });
});


module.exports = router;
