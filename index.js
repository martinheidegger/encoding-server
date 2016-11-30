const http = require('http')
const accept = require('http-accept')
const Iconv = require('iconv').Iconv
const path = require('path')
const index = require('fs').readFileSync(path.join(__dirname, 'index.html'))
const server = http.createServer((req, res) => accept(req, res, () => {
  if (req.method === 'POST') {
    const outputCharset = (req.accept.charsets && req.accept.charsets[0]) || 'utf-8'
    const inputCharset = req.headers['content-encoding'] || 'utf-8'
    res.setHeader('Content-Type', 'charset=' + outputCharset)
    try {
      var iconv = new Iconv(inputCharset, outputCharset)
    } catch (e) {
      res.end('error')
    }
    req.pipe(iconv).pipe(res)
  } else {
    res.end(index)
  }
}))
server.listen(80)
