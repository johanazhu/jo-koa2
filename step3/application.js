const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application {
  constructor() {
    this.middlewares = []
    this.context = context
    this.request = request
    this.response = response
  }
  listen(port) {
    const server = http.createServer(this.callback())
    server.listen(port)
  }
  use(middleware) {
    this.middlewares.push(middleware)
  }
  componse() {
    return async (ctx) => {
      function createNext(middleware, oldNext) {
        return async () => {
          await middleware(ctx, oldNext)
        }
      }
      let len = this.middlewares.length
      let next = async () => {
        return Promise.resolve()
      }
      for (let i = len - 1; i >= 0; i--) {
        let currentMiddleware = this.middlewares[i]
        next = createNext(currentMiddleware, next)
      }
      await next()
    }
  }
  callback() {
    return (req, res) => {
      const ctx = this.createContext(req, res)
      const respond = () => this.responseBody(ctx)
      let fn = this.componse()
      return fn(ctx).then(respond)
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
