var express = require('express');
var router = express.Router();
const axios = require('axios')

const dataAPI = 'http://localhost:7777/'

/* GET home page. */
router.get('/', function (req, res, next) {
	axios.get(dataAPI)
		.then(data => {
			if (data.status == 200) {
				let headers = ['nome', 'idade', 'sexo', 'profissao'];

				res.render('index', { title: 'Athlets', data: data.data, headers: headers });
			}

			else res.render('error', { message: 'There has been an error retriving the athlets.', error: { status: data.status, stack: 'No stack to be shown.' } });
		})
		.catch(error => {
			res.render('error', { message: 'There has been an error retriving the athlets.', error: error });
		});
});

router.get('/add', function (req, res, next) {
	res.render('add', { title: 'Add Athlet' })
})

router.get('/edit/:id', function (req, res, next) {
	axios.get(dataAPI + req.params.id)
		.then(data => {
			if (data.status == 200) {
				res.render('edit', { title: 'Edit Athlets', data: data.data });
			}

			else res.render('error', { message: 'There has been an error retrieving the given athlet.', error: { status: data.status, stack: 'No stack to be shown.' } });
		})
		.catch(error => {
			res.render('error', { message: 'There has been an error retrieving the given athlet.', error: error });
		});
});

router.get('/delete/:id', function (req, res, next) {
	axios.delete(dataAPI + req.params.id)
		.then(_ => {
			res.redirect('/')
		})
		.catch(error => {
			res.render('error', { message: 'There has been an error deleting the given athlet.', error: error });
		});
});

router.get('/:id', function (req, res, next) {
	axios.get(dataAPI + req.params.id)
		.then(data => {
			if (data.status == 200) {
				res.render('athlet', { title: 'Athlet', data: data.data });
			}

			else res.render('error', { message: 'There has been an error retrieving the given athlet.', error: { status: data.status, stack: 'No stack to be shown.' } });
		})
		.catch(error => {
			res.render('error', { message: 'There has been an error retrieving the given athlet.', error: error });
		});
});

// TODO Como mandar informação de erro ao jquery?
router.post('/add', function (req, res, next) {
	axios.post(dataAPI, req.body)
		.then(_ => {
			alert('Athlet added sucessfully!')
			res.redirect('/')
		})
		.catch(error => {
			res.render('error', { message: 'There has been an error adding the given athlet.', error: error });
		})
})

// TODO Como mandar informação de erro ao jquery?
router.post('/edit/:id', async function (req, res, next) {
	axios.put(dataAPI + req.params.id, req.body)
		.then(_ => {
			alert('Athlet edited sucessfully sucessfully!')
			res.redirect(`/${req.params.id}`)
		})
		.catch(error => {
			res.render('error', { message: 'There has been an error editing the given athlet.', error: error });
		})
})

module.exports = router;
