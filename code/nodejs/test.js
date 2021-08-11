const EventEmitter = require('events')
class EE extends EventEmitter {}
const yy = new EE()

yy.on('event', () => console.log('粗大事啦'))
setTimeout(() => console.log('0 毫秒后到期的定时器回调'), 0)
setTimeout(() => console.log('100 毫秒后到期的定时器回调'), 100)
setImmediate(() => console.log('immediate 立即回调'))
process.nextTick(() => console.log('process.nextTick 的回调'))

Promise.resolve().then(() => {
  yy.emit('event')
  process.nextTick(() => console.log('process.nextTick 的回调2'))
  console.log('promise 第一次回调')
})
.then(() => console.log('promise 第二次回调'))