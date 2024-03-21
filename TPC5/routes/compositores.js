var express = require('express');
var router = express.Router();

const axios = require('axios')

const json_server_url = 'http://localhost:3000'

/*
----------------------------------------------------------------------
Método GET
----------------------------------------------------------------------
*/

/* GET composers listing */
router.get('', function (req, res, next) {

  axios.get(json_server_url + '/compositores')
    .then(ans => {

      res.render('list_composers', { title: 'Compositores', composers: ans.data })
    }).catch(error => {

      res.render('error', { title: 'Erro lista compositores', message: 'There has been a error loading "/compositores"', error: error })
    })
});

/* GET composers add page */
router.get('/add', function (req, res, next) {
  res.render('add_composer', { title: 'Adicionar Compositor' });
});

/* GET composers edit page */
router.get('/edit/:id', function (req, res, next) {

  axios.get(json_server_url + `/compositores/${req.params.id}`)
    .then(ans => {

      res.render('edit_composer', { title: 'Editar Compositor', composer: ans.data })
    }).catch(error => {

      res.render('error', { title: 'Erro editar compositor', message: `There has been a error loading "/compositores/edit/${req.params.id}"`, error: error })
    })
});

/* GET composers delete page */
router.get('/delete/:id', function (req, res, next) {

  axios.delete(json_server_url + `/compositores/${req.params.id}`)
    .then(ans => {

      res.render('deleted_composer', { title: 'Compositor apagado', composer: ans.data })
    }).catch(error => {

      res.render('error', { title: 'Erro apagar compositor', message: `There has been a error loading "/compositores/delete/${req.params.id}"`, error: error })
    })
});

/* GET composer's page */
router.get('/:id', function (req, res, next) {
  axios.get(json_server_url + `/compositores/${req.params.id}`)
    .then(ans => {

      res.render('composer', { title: ans.data.nome, composer: ans.data })
    }).catch(error => {

      res.render('error', { title: 'Erro consultar compositor', message: `There has been a error loading "/compositores/${req.params.id}"`, error: error })
    })
});

/*
----------------------------------------------------------------------
Método POST
----------------------------------------------------------------------
*/

/* POST add new composer */
router.post('/add', (req, res, next) => {
  if (req.body.id == "" || req.body.nome == "" || req.body.dataNasc == "" || req.body.dataObito == "" || req.body.periodo == "" || req.body.bio == "") {

    res.render('empty_add_page_composer', { title: 'Adicionar Compositor', composer: req.body })
  } else {
    axios.get(json_server_url + `/periodos/${req.body.periodo}`)
      .then(_ => {
        axios.get(json_server_url + `/compositores/${req.body.id}`)
          .then(_ => {

            res.render('failed_add_id_composer', { title: 'Adicionar Compositor', composer: req.body })
          }).catch(_ => {
            axios.post(json_server_url + `/compositores`, req.body)
              .then(ans => {

                res.render('composer', { title: ans.data.nome, composer: ans.data })
              }).catch(error => {

                res.render('error', { title: 'Erro adicionar compositor', message: `There has been a error inserting the desired composer (/compositores/add)`, error: error })
              })
          })
      }).catch(_ => {

        res.render('failed_add_period_composer', { title: 'Adicionar Compositor', composer: req.body })
      })
  }
})

/* POST edit current composer */
router.post('/edit/:id', (req, res, next) => {
  axios.get(json_server_url + `/periodos/${req.body.periodo}`)
    .then(_ => {
      axios.put(json_server_url + `/compositores/${req.params.id}`, req.body)
        .then(ans => {

          res.render('composer', { title: ans.data.nome, composer: ans.data })
        }).catch(error => {

          res.render('error', { title: 'Erro editar compositor', message: `There has been a error updating the desired compososer (/compositores/edit/${req.body.id})`, error: error })
        })
    }).catch(_ => {
      req.body.id = req.params.id
      res.render('failed_edit_composer', { title: 'Editar Compositor', composer: req.body })
    })
})

module.exports = router;
