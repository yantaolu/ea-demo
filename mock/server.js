const path = require('path')
const jsonServer = require('json-server')
const os = require('os')
const rules = require('./routes')
const utils = require('../build/utils')
const data = require('./data')

const ip = utils.getLocalIP() || 'localhost'
const port = 3000

const server = jsonServer.create()
const router = jsonServer.router(data())

//中间件
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)

// 设置增加一个响应头信息“从server到前端”
server.use((req, res, next) => {
  res.header('X-Hello', 'World')
  next()
})
// 数据发送到前端之前包一层
router.render = (req, res) => {
  res.jsonp({
    code: 200,
    data: res.locals.data // res.locals.data这个是真正的数据
  })
}

// 模拟api接口，就是访问api的时候给制定路由规则
server.use("/api", router)
server.use(jsonServer.rewriter(rules))
server.use(router)

server.listen({
  host: ip,
  port: port,
}, function () {
  console.log(`JSON Server is running in http://${ip}:${port}`)
})
