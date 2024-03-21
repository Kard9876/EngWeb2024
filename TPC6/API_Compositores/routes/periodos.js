var express = require('express');
var router = express.Router();

var Periodo = require('../controllers/periodo')

/* GET periods listing. */
router.get('', function(req, res) {
  Periodo.list()
  .then( data => res.status(200).jsonp(data) )
  .catch( err => res.status(520).jsonp(err) )
});

/* Get period */
router.get('/:id', function(req, res) {
  Periodo.findById(req.params.id)
  .then( data => res.status(200).jsonp(data) )
  .catch( err => res.status(521).jsonp(err) )
});

/* Add period */
router.post('', function(req, res) {
  Periodo.create(req.body)
  .then( data => res.status(201).jsonp(data) )
  .catch( err => res.status(521).jsonp(err) )
});

/* Edit period */
router.put('/:id', function(req, res) {
  Periodo.update(req.params.id, req.body)
  .then( data => res.status(201).jsonp(data) )
  .catch( err => res.status(521).jsonp(err) )
});

/* Edit period */
router.delete('/:id', function(req, res) {
  Periodo.delete(req.params.id, req.body)
  .then( data => res.status(202).jsonp(data) )
  .catch( err => res.status(521).jsonp(err) )
});

module.exports = router;
