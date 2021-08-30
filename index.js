// const Koa = require('Koa')
const Koa = require('./lib/application')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = a
  //   await next(sds)
})

app.on('error', (err) => {
  console.log('error happends: ', err.stack)
})

app.listen(3000, () => {
  console.log('3000请求成功')
})
