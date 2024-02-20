const http = require('http')
const url = require('url')
const fs = require('fs')

const config = require('./config.json')
const port = config.PORT

const file_dir = 'MapaVirtualSite/'

function read_file(filename, res) {
    fs.readFile(filename, function (err, data) {
        let msg = ""
        let err_val = false

        if (err) {
            err_val = true
            msg = err
            bad_request(res)
            console.log(err)
        } else {
            let html_regex = /.*\.html/
            if (html_regex.test(filename)) good_request_html(res, data)
            else good_request_css(res, data)
        }
    })
}

function good_request_html(res, data) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write(data)
    res.end()
}

function good_request_css(res, data) {
    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' })
    res.write(data)
    res.end()
}

function bad_request(res) {
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write('<h1>There as been an error loading the required service.</h1>')
    res.write('<h2>We are sorry for the inconvenience.</h2>')
    res.end()
}

http.createServer(function (req, res) {
    let query = url.parse(req.url, true)


    let path = query.pathname

    let index_page = /^\/$/

    let city_page = /^\/c[0-9]+$/

    let style_sheet = /^\/.*\.css$/

    let filename = ""

    if (index_page.test(path)) {
        filename = file_dir + 'index.html'

        read_file(filename, res)

    } else if (city_page.test(path)) {
        filename = file_dir + path.substring(1) + '.html'

        read_file(filename, res)

    } else if (style_sheet.test(path)) {
        filename = file_dir + path.substring(1)

        read_file(filename, res)

    } else bad_request(res)
}).listen(port)