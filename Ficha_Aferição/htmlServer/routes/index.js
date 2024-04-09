var express = require('express');
var router = express.Router();
const axios = require('axios')

const dataAPI = 'http://localhost:7777/'

var alert = false
var message = ''

/*
morada: [Object],
partido_politico: [Object],
atributos: [Object],
_id: '10569221-6',
nome: 'Jairo Marzagoo',
idade: 54,
sexo: 'outro',
'descrição': 'Reprehenderit aliqua nulla culpa consequat eu minim sunt. Amet cupidatat Lorem eu ex mollit aute mollit in tempor ad dolor occaecat ex. Esse eiusmod dolor id in incididunt cillum laboris elit sint voluptate ullamco.',
profissao: 'Médico de Ginecologia e obstetrícia',
desportos: [Array],
animais: [Array],
figura_publica_pt: [Array],
marca_carro: 'Kia',
destinos_favoritos: [Array]
*/

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
				res.render('edit', { title: 'Edit Athlets', alert: alert, message: message, data: data.data });
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

router.post('/add', function (req, res, next) {
	console.log(req.body)

	return

	axios.post(dataAPI, req.body)
		.then(_ => {
			alert('Athlet added sucessfully!')
			res.redirect('/')
		})
		.catch(error => {
			res.render('error', { message: 'There has been an error adding the given athlet.', error: error });
		})
})

router.post('/edit/:id', async function (req, res, next) {
	alert = false
	message = ''

	let keys = Object.keys(req.body)

	for (let key = 0; key < keys.length; key++) {
		if (req.body[keys[key]] == '') {
			alert = true
			message = 'Empty fields'
			res.redirect(`/edit/${req.params.id}`)
		}
	}

	/* TODO Process dictionary and list fields */

	return

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
