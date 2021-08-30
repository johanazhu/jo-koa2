const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end('hello world1')
})

server.listen(3000, () => {
  console.log('监听3000端口')
})
