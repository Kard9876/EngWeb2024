var express = require('express');
var router = express.Router();

var Compositor = require('../controllers/compositor')

/* GET composers listing. */
router.get('', function(req, res, next) {
  if(req.query.periodo) {
    Compositor.listPeriod(req.query.periodo)
      .then( data => res.status(200).jsonp(data) )
      .catch( err => res.status(520).jsonp(err) )
  } else {
    Compositor.list()
      .then( data => res.status(200).jsonp(data) )
      .catch( err => res.status(520).jsonp(err) )
  }
});

/* Get composer */
router.get('/:id', function(req, res, next) {
  Compositor.findById(req.params.id)
  .then( data => res.status(200).jsonp(data) )
  .catch( err => res.status(521).jsonp(err) )
});

/* Add composer */
router.post('', function(req, res) {
  Compositor.create(req.body)
  .then( data => res.status(201).jsonp(data) )
  .catch( err => res.status(521).jsonp(err) )
});

/* Edit composer */
router.put('/:id', function(req, res) {
  Compositor.update(req.params.id, req.body)
  .then( data => res.status(201).jsonp(data) )
  .catch( err => res.status(521).jsonp(err) )
});

/* Edit composer */
router.delete('/:id', function(req, res) {
  Compositor.delete(req.params.id, req.body)
  .then( data => res.status(202).jsonp(data) )
  .catch( err => res.status(521).jsonp(err) )
});

module.exports = router;
