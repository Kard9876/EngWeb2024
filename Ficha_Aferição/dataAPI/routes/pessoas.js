var express = require('express');
var router = express.Router();

const Pessoa = require('../controllers/pessoa')

router.get('/', function (req, res, next) {
    Pessoa.list()
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(520).jsonp(error))
});

router.get('/modalidades', function (req, res, next) {
    Pessoa.modalidadesList()
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(520).jsonp(error))
})

router.get('/modalidades/:id', function (req, res, next) {
    Pessoa.modalidade(req.params.id)
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(520).jsonp(error))
})

router.get('/:id', function (req, res, next) {
    Pessoa.findById(req.params.id)
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(520).jsonp(error))
});

router.post('/', function (req, res, next) {
    Pessoa.create(req.body)
        .then(data => res.status(201).jsonp(data))
        .catch(error => res.status(521).jsonp(error))
});

router.put('/:id', function (req, res, next) {
    Pessoa.update(req.params.id, req.body)
        .then(data => res.status(201).jsonp(data))
        .catch(error => res.status(522).jsonp(error))
});

router.delete('/:id', function (req, res, next) {
    Pessoa.delete(req.params.id)
        .then(data => res.status(202).jsonp(data))
        .catch(error => res.status(523).jsonp(error))
})


module.exports = router;
