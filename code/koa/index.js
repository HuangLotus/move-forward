const Koa = require('koa')
const path = require('path')
const Router = require('koa-router')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// 创建一个 Koa 服务实例
const app = new Koa()
// 创建一个路由的实例
const router = new Router()
// 创建一个数据库实例，这里用 lowdb 的 JSON 存储来模拟数据库而已
const adapter = new FileSync(path.resolve(__dirname, './db.json'))
const db = low(adapter)

// 初始化数据库，可以看做是数据库的字段定义
db.defaults({visits: [], count: 0}).write()

// 当有请求进来，路由中间件的异步回调会被执行
router.get('/', async (ctx, next) => {
  const ip = ctx.header['x-real-ip'] || ''
  const { user, page, action } = ctx.query

  // 更新数据库
  db.get('visits').push({ip, user, page, action}).write()
  db.update('count', n => n + 1).write()

  // 返回更新后的数据库字段
  ctx.body = {success: 1, visits: db.get('count')}
})

// 把中间件压入队列，等待执行
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(7000)