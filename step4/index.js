// const Koa = require('Koa')
const Koa = require('./lib/application')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('3000请求成功')
})
