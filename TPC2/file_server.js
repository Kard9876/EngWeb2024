const http = require('http')
const url = require('url')
const fs = require('fs')

const config = require('./config.json')
const port = config.PORT

const file_dir = './MapaVirtualSite/'

http.createServer(function (req, res) {
    let query = url.parse(req.url, true)

    let path = query.pathname

    // TODO verify type of request, verify if file exists, index.html only need empty query, etc
    filename = file_dir + path + '.html'

    // FIX ME
    fs.readFile(filename, function (err, data) {
        if (err) {
            console.log(err)
            res.writeHead(400, { 'Content-Type': 'txt/html; charset=utf-8' })
            res.write('<h1>There as been an error loading the required service.</h1>')
            res.write('<h2>We are sorry for the inconvenience.</h2>')
            res.end()
        } else {
            res.writeHead(200, { 'Content-Type': 'txt/html; charset=utf-8' })
            res.write(data)
            console.log(data)
            res.end()
        }
    })
}).listen(port)