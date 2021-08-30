const http = require('http')

class Application {
  constructor() {
    this.callbackFunc
  }
  listen(port) {
    const server = http.createServer(this.callback())
    server.listen(port)
  }
  use(fn) {
    this.callbackFunc = fn
  }
  callback() {
    return (req, res) => this.callbackFunc(req, res)
  }
}

module.exports = Application
