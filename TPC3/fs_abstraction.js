import fs from 'fs'
import http_response from './http_response.js'

export default { read_file_send_response }

function read_file_send_response(filename, res) {
    fs.readFile(filename, function (err, data) {
        let msg = ""
        let err_val = false

        if (err) {
            err_val = true
            msg = err
            http_response.bad_request(res)
            console.log(err)
        } else {
            let html_regex = /.*\.html/
            if (html_regex.test(filename)) http_response.good_request_html(res, data)
            else http_response.good_request_css(res, data)
        }
    })
}