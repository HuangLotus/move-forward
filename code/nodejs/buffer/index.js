const fs = require('fs')

// 通过 fs.readFile 读取图片时候，拿到的是缓冲的 Buffer 数据
fs.readFile('../fs/better.png', (err, buffer) => {
  console.log(Buffer.isBuffer(buffer) && 'readFile 读取图片拿到的是 Buffer 数据')
  // 把读取到的 Buffer 数据，通过 fs writeFile 写入到一个新图片文件中
  fs.writeFile('img.png', buffer, function(err) {})

  // 再基于原始的 Buffer 创建一个新的 Buffer，通过 toString base64 解码为字符串打印出来
  const base64Image = Buffer.from(buffer).toString('base64')
  // console.log('base64Image',base64Image)

  // base64Image 是 base64 后的字符串，传参给 from，同时指定编码生成一个新的 Buffer 实例
  const decodedImage = Buffer.from(base64Image, 'base64')

  // 比较两个 Buffer 实例的数据，并写入到一个新的图片中
  console.log('compare',Buffer.compare(buffer, decodedImage))
  fs.writeFile('img_decoded.jpg', decodedImage, (err) => {})
})
// const bufFromNew = new Buffer('Hello 掘金')
// console.log('bufFromNew',bufFromNew)

// const bufFromBuf = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0xe6, 0x8e, 0x98, 0xe9, 0x87, 0x91])
// console.log(bufFromBuf.toString())
// // Hello 掘金
// console.log(bufFromBuf.toString('utf8'))
// console.log(bufFromBuf.toString('utf16le'))
 
// let bufForWrite = Buffer.alloc(32)
// bufForWrite.write('Hello 掘金', 2, 4)
// console.log(bufForWrite.toString())
// // Hello 掘

// let bufCopy1 = Buffer.from('Hello')
// let bufCopy2 = Buffer.alloc(4)
// console.log(bufCopy1)
// // <Buffer 48 65 6c 6c 6f>

// bufCopy1.copy(bufCopy2, 0, 1, 5)
// console.log(bufCopy2)
