const http = require('http')
const request_handler = require('./request_handler.js')
const static = require('./static.js')

http.createServer((req, res) => {
    let url = req.url

    /* 
    let d = new Date().toISOString().substring(0, 16)

    console.log(url, d) 
    */

    if(static.isStaticResource(url)){
        static.serveStaticResource(res, url)
    } else {
        
        if(req.method == "GET"){
            request_handler.process_get_request(res, url)
        } else if (req.method == "POST"){
            request_handler.process_post_request(req, res, url)
        } else {
            request_handler.process_unkown_request(res)
        }
    }

}).listen(9876)