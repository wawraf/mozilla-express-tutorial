var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/catalog')
});

// Test
router.get('/test/*', function(req, res, next) {
  res.send(req.params[0])
});

// ocpp test
router.get('/ocpp', function(req, res, next) {
  console.log(req)
});

module.exports = router;
