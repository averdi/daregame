var express = require('express');
var router = express.Router();

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

module.exports = router;
