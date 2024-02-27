import http from 'http'
import url from 'url'
import axios from 'axios'

import fs_abstraction from './fs_abstraction.js'
import http_response from './http_response.js'
import generate_html from './generate_html.js'

// import * as config from './config.json'

const port = 12345// config.PORT
const json_server = "http://localhost:3000"// config.JSON_SERVER

function process_axios_request(res, path){
    let general_film = /\/filmes$/
    let specific_film = /\/filmes\/[a-zA-Z0-9 .,;:\-_?!%]*$/

    let general_genre = /\/generos$/
    let specific_genre = /\/generos\/[a-zA-Z0-9 .,;:\-_?!%]*$/

    let general_actor = /\/atores$/
    let specific_actor = /\/atores\/[a-zA-Z0-9 .,;:\-_?!%]*$/

    if(general_film.test(path)){
        path = path.replace(/\/filmes/g, '/films')

        axios.get(json_server + path).then( (resp) => {
            http_response.good_request_html(res, generate_html.films_html(resp.data))
        }).catch((err) => {
            http_response.bad_axios_response(res, err)
        })
    } else if(specific_film.test(path)){
        path = path.replace(/\/filmes/g, '/films')
        
        axios.get(json_server + path).then( (resp) => {
            http_response.good_request_html(res, generate_html.specific_film_html(resp.data))
        }).catch((err) => {
            http_response.bad_axios_response(res, err)
        })
    } else if(general_genre.test(path)){
        path = path.replace(/\/generos/g, '/genres')

        axios.get(json_server + path).then( (resp) => {
            http_response.good_request_html(res, generate_html.genres_html(resp.data))
        }).catch((err) => {
            http_response.bad_axios_response(res, err)
        })
    } else if(specific_genre.test(path)){
        path = path.replace(/\/generos/g, '/genres')

        axios.get(json_server + path).then( (resp) => {
            http_response.good_request_html(res, generate_html.specific_genre_html(resp.data))
        }).catch((err) => {
            http_response.bad_axios_response(res, err)
        })
    } else if(general_actor.test(path)){
        path = path.replace(/\/atores/g, '/actors')

        axios.get(json_server + path).then( (resp) => {
            http_response.good_request_html(res, generate_html.actors_html(resp.data))
        }).catch((err) => {
            http_response.bad_axios_response(res, err)
        })
    } else if(specific_actor.test(path)){
        path = path.replace(/\/atores/g, '/actors')

        axios.get(json_server + path).then( (resp) => {
            http_response.good_request_html(res, generate_html.specific_actor_html(resp.data))
        }).catch((err) => {
            http_response.bad_axios_response(res, err)
        })
    } else http_response.bad_request(res, "The specified url doesn't exist.") // Should never happen
}

function process_get_request(req, res){
    let q = url.parse(req.url, true)

    let path = q.pathname

    let film_genres_actors_regex = /\/(filmes|generos|atores).*/

    if(path == '/'){
        http_response.good_request_html(res, generate_html.index_html())
    } else if(path == '/w3.css' || path == '/style.css'){
        let filename = path.substring(1)

        fs_abstraction.read_file_send_response(filename, res)
    } else if(film_genres_actors_regex.test(path)){
        process_axios_request(res, path)
    } else http_response.bad_request(res, "It is not possible to provide the required file.")
}

http.createServer( (req, res) => {
    let method = req.method

    if(method == 'GET'){
        process_get_request(req, res)
    } else bad_request(res, "The only http methos supported is the GET method.")
}).listen(port)