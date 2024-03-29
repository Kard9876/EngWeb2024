var express = require('express');
var router = express.Router();

const axios = require('axios')

const json_server_url = 'http://localhost:3000'

async function get_period_data(period_id) {
  return new Promise((resolve, reject) => {
    axios.get(json_server_url + `/compositores?periodo=${period_id}`)
      .then(response => {
        resolve({ "error": null, "data": { "id": period_id, "compositores": response.data } })
      }).catch(error => {
        reject({ "error": error, "data": null })
      })
  })
}

async function get_all_period_data(period_ids) {
  let ans = []

  for (p of period_ids) {
    let tmp = await get_period_data(p.id)

    if (!tmp.error) {
      ans.push({ "id": tmp.data.id, "compositores": tmp.data.compositores })
    } else {
      return { "error": tmp.error, "data": null }
    }
  }

  return { "error": null, "data": ans }
}

/*
----------------------------------------------------------------------
Método GET
----------------------------------------------------------------------
*/


/* GET period list page. */
router.get('', function (req, res, next) {
  axios.get(json_server_url + `/periodos`)
    .then(async ans => {
      let response = await get_all_period_data(ans.data)

      if (!response.error) {
        res.render('list_periods', { title: 'Períodos', periodos: response.data })
      }
      else {

        res.render('error', { title: 'Erro lista periodos', message: `There has been a error acquiring period's "/periodos"`, error: response.error })
      }

    }).catch(error => {
      res.render('error', { title: 'Erro lista periodos', message: `There has been a error loading "/periodos"`, error: error })
    })
})


/* GET add period page. */
router.get('/add', function (req, res, next) {
  res.render('add_period', { title: 'Adicionar Periodo' })
});


/* GET edit period page */
router.get('/edit/:id', function (req, res, next) {

  axios.get(json_server_url + '/periodos/' + req.params.id)
    .then(async ans => {
      res.render('edit_period', { title: 'Editar Periodo', period: ans.data })
    }).catch(error => {
      res.render('error', { title: 'Erro editar período', message: `There has been a error loading /periodos/edit/${req.params.id}`, error: error })
    })
})


/* GET delete period page */
router.get('/delete/:id', function (req, res, next) {

  axios.delete(json_server_url + '/periodos/' + req.params.id)
    .then(async ans => {
      res.render('delete_period', { title: 'Periodo apagado', period: ans.data })
    }).catch(error => {
      res.render('error', { title: 'Erro apagar período', message: `There has been a error loading /periodos/delete/${req.params.id}`, error: error })
    })
})


/* GET period's page. */
router.get('/:id', function (req, res, next) {
  axios.get(json_server_url + `/periodos/${req.params.id}`)
    .then(async ans => {
      let response = await get_period_data(req.params.id)

      if (!response.error) {
        let period = {
          "id": ans.data.id,
          "start": ans.data.start,
          "end": ans.data.end,
          "compositores": response.data.compositores
        }

        res.render('period', { title: period.id, period: period })
      }
      else {

        res.render('error', { title: 'Erro obter período', message: `There has been a error acquiring period's data (/periodos/${req.params.id})`, error: response.error })
      }
    }).catch(error => {

      res.render('error', { title: 'Erro obter período', message: `There has been a error loading /periodos/${req.params.id}`, error: error })
    })
})


/*
----------------------------------------------------------------------
Método POST
----------------------------------------------------------------------
*/

/* POST add new period */
router.post('/add', function (req, res, next) {
  if (req.body.id == "" || req.body.start == "" || req.body.end == "") {

    res.render('empty_add_page_period', { title: 'Adicionar Periodo', period: req.body })
  } else {
    axios.get(json_server_url + `/periodos/${req.body.id}`)
      .then(_ => {

        res.render('failed_add_id_period', { title: 'Adicionar Periodo', period: req.body })
      }).catch(_ => {

        axios.post(json_server_url + `/periodos`, req.body)
          .then(async ans => {
            let response = await get_period_data(req.params.id)

            if (!response.error) {
              let period = {
                "id": ans.data.id,
                "start": ans.data.start,
                "end": ans.data.end,
                "compositores": response.data.compositores
              }

              res.render('period', { title: period.id, period: period })
            } else {

              res.render('error', { title: 'Erro adicionar período', message: `There has been a error acquiring period's data (/periodos/${req.params.id})`, error: response.error })
            }
          }).catch(error => {

            res.render('error', { title: 'Erro adicionar período', message: `There has been a error loading "/periodos/add"`, error: error })
          })
      })
  }
})

/* POST edit period */
router.post('/edit/:id', function (req, res, next) {
  axios.get(json_server_url + '/periodos/' + req.params.id)
    .then(_ => {
        if (req.body.id == req.params.id) {
          axios.put(json_server_url + `/periodos/${req.params.id}`, req.body)
            .then(async ans => {
              let compositores = await get_period_data(req.params.id)

              if (!compositores.error) {
                let period = {
                  "id": ans.data.id,
                  "start": ans.data.start,
                  "end": ans.data.end,
                  "compositores": compositores.data.compositores
                }

                res.render('period', { title: period.id, period: period })
              } else {

                res.render('error', { title: 'Erro editar período', message: `There has been a error acquiring given period's composers ("/periodos/edit/${req.params.id}")`, error: compositores.error })
              }

            }).catch(error => {
              res.render('error', { title: 'Erro editar período', message: `There has been a error updating the desired period ("/periodos/edit/${req.params.id}")`, error: error })
            })


          /* TODO Can i modify the id of the period? Even though json-server won't let me alter the id?       
          let compositores = await get_period_data(id_periodo)

          console.log(compositores)

          update_all_composer_period_data(compositores, response.id)

          good_request_html(res, templates.periodPage(response)) 
          */

        } else {
          req.body.id = req.params.id

          res.render('failed_edit_period', {title: 'Editar Periodo', period: req.body})
        }
    }).catch(error => {
      res.render('error', { title: 'Erro editar período', message: `There has been a error loading "/periodos/edit/${req.params.id}"`, error: error })
    })
})

module.exports = router;
