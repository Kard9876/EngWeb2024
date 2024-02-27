export default { good_request_html, good_request_css, bad_request, bad_axios_response }

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

function bad_request(res, message) {
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write('<h1>There as been an error with the required service.</h1>')
    res.write('<h2>We are sorry for the inconvenience.</h2>')
    res.write(`<p>Details: ${message}</p>`)
    res.end()
}

function bad_axios_response(res, message) {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write('<h1>There as been an error with the required service.</h1>')
    res.write('<h2>We are sorry for the inconvenience.</h2>')
    res.write(`<p>Details: ${message}</p>`)
    res.end()
}