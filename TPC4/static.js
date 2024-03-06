const fs = require('fs')
const request_handler = require('./request_handler')

function isCSS(url){
    return /\/\w*\.css/.test(url)
}

function isFavicon(url){
    return /\/favicon.png/.test(url)
}

function isStaticResource(url){
    return isCSS(url) || isFavicon(url)
}

exports.isStaticResource = isStaticResource

function serveStaticResource(res, url){
    fs.readFile('public/' + url.substring(1), (error, data) => {
        if(error){
            request_handler.bad_file_request(res, url.substring(1))
        } else{

            if(isCSS(url)){
                request_handler.good_request_css(res, data)
            } else if(isFavicon(url)){
                request_handler.good_request_favicon(res, data)
            } else {
                request_handler.bad_file_request(res, url.substring(1))
            }
        }
    })
    return /\/\w*\.css/.test(url) || /\/favicon.jpg/.test(url)
}

exports.serveStaticResource = serveStaticResource