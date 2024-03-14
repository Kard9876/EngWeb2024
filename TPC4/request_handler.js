const templates = require('./templates')
const axios = require('axios')
const { error } = require('console')
const { parse } = require('querystring')

let json_server_url = 'http://localhost:3000'

async function get_period_data(period_id){
    return new Promise( (resolve, reject) => {
        axios.get(json_server_url + `/compositores?periodo=${period_id}`)
        .then( response => {
            resolve({"error": null, "data": {"id": period_id, "compositores": response.data }})
        }).catch( error => {
            reject({"error": error, "data": null})
        })
    })
}

async function update_composer_period_data(composer){
    return new Promise( (resolve, reject) => {
        axios.put(json_server_url + `/compositores/${composer.id}`, composer)
        .then( _ => {
            resolve({"error": null})
        }).catch( error => {
            reject({"error": error})
        })
    })
}

async function get_all_period_data(period_ids){
    let ans = []

    for(p of period_ids){
        let tmp = await get_period_data(p.id)

        if (!tmp.error) {
            ans.push({"id": tmp.data.id, "compositores": tmp.data.compositores })
        } else {
            return {"error": tmp.error, "data": null}
        }
    }

    return {"error": null, "data": ans}
}

async function update_all_composer_period_data(composers, new_period){
    for(c of composers){
        c.period = new_period

        let tmp = await update_composer_period_data(c)

        if (tmp.error) {
            console.error(error)
        }
    }
}

function collecReqBodyData(req, callback){
    if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){
        let body = ''

        req.on('data', chunck => {
            body += chunck.toString()
        })

        req.on('end', () => {
            callback(parse(body))
        })

    } else {
        callback(null)
    }
}

function process_get_request(res, url){
    if(url == '/'){
        good_request_html(res, templates.mainPage())
    }

    else if (url == '/compositores'){
        axios.get(json_server_url + url)
        .then( ans => {
            good_request_html(res, templates.composerListPage(ans.data))
        }).catch( error => {
            bad_axios_response(res, `There has been a error loading ${url}. Error: ${error}`)
        })
    }

    else if (/\/compositores\/C\d+$/.test(url)){
        axios.get(json_server_url + url)
        .then( ans => {
            good_request_html(res, templates.composerPage(ans.data))
        }).catch( error => {
            bad_axios_response(res, `There has been a error loading ${url}. Error: ${error}`)
        })
    }

    else if (/\/compositores\/edit\/(\w|\d)+/.test(url)){
        let pieces = url.split('/')

        let idCompositor = pieces[pieces.length - 1]

        axios.get(json_server_url + '/compositores/' + idCompositor)
        .then( ans => {
            good_request_html(res, templates.composerEditPage(ans.data))
        }).catch( error => {
            bad_axios_response(res, `There has been a error loading ${url}. Error: ${error}`)
        })
    }

    else if (/\/compositores\/delete\/(\w|\d)+/.test(url)){
        let pieces = url.split('/')

        let idCompositor = pieces[pieces.length - 1]

        axios.delete(json_server_url + '/compositores/' + idCompositor)
        .then( ans => {
            good_request_html(res, templates.composerDeletePage(ans.data))
        }).catch( error => {
            bad_axios_response(res, `There has been a error loading ${url}. Error: ${error}`)
        })
    }

    else if (url == '/compositores/add'){
        good_request_html(res, templates.composerAddPage())
    }

    else if (url == '/periodos'){
        axios.get(json_server_url + url)
        .then( async ans => {
            let response = await get_all_period_data(ans.data)
            
            if(!response.error) {
                good_request_html(res, templates.periodListPage(response.data))
            }
            else {
                bad_axios_response(res, `There has been a error acquiring period's data (${url}). Error: ${response.error}`)
            }

        }).catch( error => {
            bad_axios_response(res, `There has been a error loading ${url}. Error: ${error}`)
        })
    }

    else if (url == '/periodos/add'){
        good_request_html(res, templates.periodAddPage())
    }

    else if (/\/periodos\/(\w|\d)+$/.test(url)){
        let pieces = url.split('/')
        
        let period_id = pieces[pieces.length - 1]

        axios.get(json_server_url + `/periodos/${period_id}`)
        .then( async ans => {
            let response = await get_period_data(period_id)

            if(!response.error) {
                let period = {
                    "id": ans.data.id,
                    "start": ans.data.start,
                    "end": ans.data.end,
                    "compositores": response.data.compositores
                }

                good_request_html(res, templates.periodPage(period))
            }
            else {
                bad_axios_response(res, `There has been a error acquiring period's data (${url}). Error: ${response.error}`)
            }
        }).catch( error => {
            bad_axios_response(res, `There has been a error loading ${url}. Error: ${error}`)
        })
    }

    else if (/\/periodos\/edit\/(\w|\d)+/.test(url)){
        let pieces = url.split('/')

        let id_periodo = pieces[pieces.length - 1]

        axios.get(json_server_url + '/periodos/' + id_periodo)
        .then( async ans => {
            good_request_html(res, templates.periodEditPage(ans.data))
        }).catch( error => {
            bad_axios_response(res, `There has been a error loading ${url}. Error: ${error}`)
        })
    }

    else if (/\/periodos\/delete\/(\w|\d)+/.test(url)){
        let pieces = url.split('/')

        let id_periodo = pieces[pieces.length - 1]

        axios.delete(json_server_url + '/periodos/' + id_periodo)
        .then( ans => {
            good_request_html(res, templates.periodDeletePage(ans.data))
        }).catch( error => {
            bad_axios_response(res, `There has been a error loading ${url}. Error: ${error}`)
        })
    }

    else {
        bad_request(res, `The given route (${url}) is not supported.`)
    }
}

exports.process_get_request = process_get_request

function process_post_request(req, res, url){
    if (/\/compositores\/edit\/C\d+/.test(url)){
        let pieces = url.split('/')

        let id_compositor = pieces[pieces.length - 1]

        collecReqBodyData(req, response => {
            axios.get(json_server_url + `/periodos/${response.periodo}`)
                .then( _ => {
                    axios.put(json_server_url + `/compositores/${id_compositor}`, response)
                        .then( ans => {
                            good_request_html(res, templates.composerPage(ans.data))
                        }).catch( error => {
                            bad_axios_response(res, `There has been a error updating the desired compositor (${url}). Error: ${error}`)
                        })
                }).catch(_ => {
                    response.id = id_compositor
                    good_request_html(res, templates.composerFailedEditPage(response))
                })
        })

    }

    else if (url == '/compositores/add'){
        collecReqBodyData(req, response => {
            if(response.id == "" || response.nome == "" || response.dataNasc == "" || response.dataObito == "" || response.periodo == "" || response.bio == ""){

                good_request_html(res, templates.composerEmptyAddPage(response))

            } else {
                axios.get(json_server_url + `/periodos/${response.periodo}`)
                    .then(_ => {
                        axios.get(json_server_url + `/compositores/${response.id}`)
                            .then( _ => {

                                good_request_html(res, templates.composerFailedAddIdPage(response))

                            }).catch( _ => {
                                axios.post(json_server_url + `/compositores`, response)
                                    .then( ans => {
                                        good_request_html(res, templates.composerPage(ans.data))
                                    }).catch( error => {
                                        bad_axios_response(res, `There has been a error inserting the desired compositor (${url}). Error: ${error}`)
                                    })
                            })
                    }).catch(_ => {
                        good_request_html(res, templates.composerFailedAddPeriodPage(response))
                    })
            }

        })
    }

    else if (url == '/periodos/add'){
        collecReqBodyData(req, response => {
            if(response.id == "" || response.start == "" || response.end == ""){

                good_request_html(res, templates.periodEmptyAddPage(response))

            } else {
                axios.get(json_server_url + `/periodos/${response.id}`)
                    .then( _ => {

                        good_request_html(res, templates.periodFailedAddIdPage(response))

                    }).catch( _ => {
                        axios.post(json_server_url + `/periodos`, response)
                            .then( async ans => {
                                let response = await get_period_data(ans.data.id)

                                    if(!response.error) {
                                        let period = {
                                            "id": ans.data.id,
                                            "start": ans.data.start,
                                            "end": ans.data.end,
                                            "compositores": response.data.compositores
                                        }

                                        good_request_html(res, templates.periodPage(period))
                                    }
                                    else {
                                        bad_axios_response(res, `There has been a error acquiring period's data (${url}). Error: ${response.error}`)
                                    }
                            }).catch( error => {
                                bad_axios_response(res, `There has been a error inserting the desired period (${url}). Error: ${error}`)
                            })
                    })
            }

        })
    }

    else if (/\/periodos\/edit\/(\w|\d)+/.test(url)){
        let pieces = url.split('/')

        let id_periodo = pieces[pieces.length - 1]

        axios.get(json_server_url + '/periodos/' + id_periodo)
        .then( _ => {
            collecReqBodyData(req, response => {
                if(response.id == id_periodo){
                        axios.put(json_server_url + `/periodos/${id_periodo}`, response)
                            .then(async ans => {
                                let compositores = await get_period_data(id_periodo)
                                
                                if(!compositores.error){
                                    let period = {
                                        "id": ans.data.id,
                                        "start": ans.data.start,
                                        "end": ans.data.end,
                                        "compositores": compositores.data.compositores
                                    }
    
                                    good_request_html(res, templates.periodPage(period))
                                } else {
                                    bad_axios_response(res, `There has been a error acquiring given period's composers (${url}). Error: ${compositores.error}`)
                                }

                            }).catch( error => {
                                bad_axios_response(res, `There has been a error updating the desired period (${url}). Error: ${error}`)
                            })
                        
                        
                        /* TODO Can i modify the id of the period? Even though json-server won't let me alter the id?       
                        let compositores = await get_period_data(id_periodo)

                        console.log(compositores)

                        update_all_composer_period_data(compositores, response.id)

                        good_request_html(res, templates.periodPage(response)) 
                        */
                } else {
                    response.id = id_periodo
                    good_request_html(res, templates.periodFailedEditPage(response))
                }
            })
        }).catch( error => {
            bad_axios_response(res, `There has been a error loading ${url}. Error: ${error}`)
        })
    }
}

exports.process_post_request = process_post_request

function process_unkown_request(res){
    bad_request(res, `The application does not support HTTP methods other than GET and POST.`)
}

exports.process_unkown_request = process_unkown_request

function good_request_html(res, data) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(data)
}

exports.good_request_html = good_request_html

function good_request_css(res, data) {
    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' })
    res.end(data)
}

exports.good_request_css = good_request_css

function good_request_favicon(res, data) {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' })
    res.end(data)
}

exports.good_request_favicon = good_request_favicon

function bad_request(res, message) {
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write('<h1>There as been an error with the required service.</h1>')
    res.write('<h2>We are sorry for the inconvenience.</h2>')
    res.end(`<p>Details: ${message}</p>`)
}

exports.bad_request = bad_request

function bad_file_request(res, message) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write('<h1>There as been an error aquiring the needed file.</h1>')
    res.write('<h2>We are sorry for the inconvenience.</h2>')
    res.end(`<p>File: ${message}</p>`)
}

exports.bad_file_request = bad_file_request

function bad_axios_response(res, message) {
    res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write('<h1>There as been an error with the required service.</h1>')
    res.write('<h2>We are sorry for the inconvenience.</h2>')
    res.end(`<p>Details: ${message}</p>`)
}

exports.bad_axios_response = bad_axios_response