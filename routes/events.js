var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const editEvent = require('./put.event.controller.js')

router.put('/api/event/:id', editEvent)

module.exports = router;
