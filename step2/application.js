const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application {
  constructor() {
    this.callbackFunc
    this.context = context
    this.request = request
    this.response = response
  }
  listen(port) {
    const server = http.createServer(this.callback())
    server.listen(port)
  }
  use(fn) {
    this.callbackFunc = fn
  }
  //   callback() {
  //     return (req, res) => this.callbackFunc(req, res)
  //   }
  callback() {
    return (req, res) => {
      // 把原生 req,res 封装为 ctx
      const ctx = this.createContext(req, res)
      // 执行 use 中的函数, ctx.body 赋值
      this.callbackFunc(ctx)
      // 封装 res.end，用 ctx.body 表示
      return this.responseBody(ctx)
    }
  }
  createContext(req, res) {
    const ctx = Object.create(this.context)
    ctx.request = Object.create(this.request)
    ctx.response = Object.create(this.response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }
  responseBody(ctx) {
    let context = ctx.body
    if (typeof context === 'string') {
      ctx.res.end(context)
    } else if (typeof context === 'object') {
      ctx.res.end(JSON.stringify(context))
    }
  }
}

module.exports = Application
