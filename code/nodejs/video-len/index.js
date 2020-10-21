// 这里假设有一个视频 demo.mp4
// 时长如果不超过 1 个小时，比如 55 分钟，那就打印 55 分钟
// 如果超过 1 个小时，比如 65 分钟，打印 1 小时 5 分钟
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const util = require('util')
const open = util.promisify(fs.open)
const read = util.promisify(fs.read)

function getTime (buffer) {
  // 关于 mvhd + 17
  const start = buffer.indexOf(Buffer.from('mvhd')) + 17
  const timeScale = buffer.readUInt32BE(start)
  const duration = buffer.readUInt32BE(start + 4)
  const movieLength = Math.floor(duration / timeScale)
  return movieLength
}

function getLocaleTime (seconds) {
  return moment
    .duration(seconds, 'seconds')
    .toJSON()
    .replace(/[PTHMS]/g, str => {
      switch (str) {
        case 'H': return '小时'
        case 'M': return '分钟'
        case 'S': return '秒'
        default: return ''
      }
    })
}

;(async function () {
  const filePath = path.resolve(__dirname + '/v1.mp4')
  const fd = await open(filePath, 'r')
  const buff = Buffer.alloc(100)
  const { buffer } = await read(fd, buff, 0, 100, 0)
  const time = getTime(buffer)
  const res = {
    '视频总时长': getLocaleTime(time)
  }
  
  console.log(res)
})()