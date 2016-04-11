var express = require('express');
var router = express.Router();

var Dare = require('../models/dare');

/* GET home page. */
router.post('/', function(req, res, next) {
console.log(req.body);
var filter = { category: {$in: [req.body.category]}}

  Dare.findOneRandom(filter, function(err, dare) {
    res.render('dare', {
      title: 'Dares',
      dare: dare
       });
    });
});

module.exports = router;
