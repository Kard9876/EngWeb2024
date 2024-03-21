var express = require('express');
var router = express.Router();

const axios = require('axios')

const mongo_server_url = 'http://localhost:9876'

async function get_period_data(period_id) {
  return new Promise((resolve, reject) => {
    axios.get(mongo_server_url + `/compositores?periodo=${period_id}`)
      .then(response => {
        resolve({ "error": null, "data": { "_id": period_id, "compositores": response.data } })
      }).catch(error => {
        reject({ "error": error, "data": null })
      })
  })
}

async function get_all_period_data(period_ids) {
  let ans = []

  for (p of period_ids) {
    let tmp = await get_period_data(p._id)

    if (!tmp.error) {
      ans.push({ "_id": tmp.data._id, "compositores": tmp.data.compositores })
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
  axios.get(mongo_server_url + `/periodos`)
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

  axios.get(mongo_server_url + '/periodos/' + req.params.id)
    .then(async ans => {
      res.render('edit_period', { title: 'Editar Periodo', period: ans.data })
    }).catch(error => {
      res.render('error', { title: 'Erro editar período', message: `There has been a error loading /periodos/edit/${req.params.id}`, error: error })
    })
})


/* GET delete period page */
router.get('/delete/:id', function (req, res, next) {
  axios.get(mongo_server_url + '/periodos/' + req.params.id)
    .then(async ans => {
      if(ans.data){
        axios.delete(mongo_server_url + '/periodos/' + req.params.id)
          .then(async _ => {
            res.render('delete_period', { title: 'Periodo apagado', period: ans.data })
          }).catch(error => {
            res.render('error', { title: 'Erro apagar período', message: `There has been a error loading /periodos/delete/${req.params.id}`, error: error })
          })
      } else {
        res.render('error_message', { title: 'Erro apagar período', message: `There is no such period ${req.params.id}`})
      }
    }).catch(error => {
      res.render('error', { title: 'Erro apagar período', message: `There has been a error loading /periodos/delete/${req.params.id}`, error: error })
    })
})


/* GET period's page. */
router.get('/:id', function (req, res, next) {
  axios.get(mongo_server_url + `/periodos/${req.params.id}`)
    .then(async ans => {
      let response = await get_period_data(req.params.id)

      if (!response.error) {
        let period = {
          "_id": ans.data._id,
          "start": ans.data.start,
          "end": ans.data.end,
          "compositores": response.data.compositores
        }

        res.render('period', { title: period._id, period: period })
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
  if (req.body._id == "" || req.body.start == "" || req.body.end == "") {

    res.render('empty_add_page_period', { title: 'Adicionar Periodo', period: req.body })
  } else {
    axios.get(mongo_server_url + `/periodos/${req.body._id}`)
      .then(ans => {
        if(ans.data) res.render('failed_add_id_period', { title: 'Adicionar Periodo', period: req.body })

        else {
          axios.post(mongo_server_url + `/periodos`, req.body)
          .then(async ans => {
            let response = await get_period_data(req.params.id)

            if (!response.error) {
              let period = {
                "_id": req.body._id,
                "start": req.body.start,
                "end": req.body.end,
                "compositores": response.data.compositores
              }

              res.render('period', { title: period._id, period: period })
            } else {

              res.render('error', { title: 'Erro adicionar período', message: `There has been a error acquiring period's data (/periodos/${req.params.id})`, error: response.error })
            }
          }).catch(error => {

            res.render('error', { title: 'Erro adicionar período', message: `There has been a error loading "/periodos/add"`, error: error })
          })
        }
      }).catch(error => {
        res.render('error', { title: 'Erro adicionar período', message: `There has been a error getting periodo's data"`, error: error })
      })
  }
})

/* POST edit period */
router.post('/edit/:id', function (req, res, next) {
  axios.get(mongo_server_url + '/periodos/' + req.params.id)
    .then(_ => {
        if (req.body._id == req.params.id) {
          axios.put(mongo_server_url + `/periodos/${req.params.id}`, req.body)
            .then(async ans => {
              let compositores = await get_period_data(req.params.id)

              if (!compositores.error) {
                let period = {
                  "_id": req.body._id,
                  "start": req.body.start,
                  "end": req.body.end,
                  "compositores": compositores.data.compositores
                }

                res.render('period', { title: period._id, period: period })
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
          req.body._id = req.params.id

          res.render('failed_edit_period', {title: 'Editar Periodo', period: req.body})
        }
    }).catch(error => {
      res.render('error', { title: 'Erro editar período', message: `There has been a error loading "/periodos/edit/${req.params.id}"`, error: error })
    })
})

module.exports = router;
