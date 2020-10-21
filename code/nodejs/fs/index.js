const fs = require('fs');
fs.open('./better.png', 'r', function (err, fd) {
  var header = new Buffer([137, 80, 78, 71, 13, 10, 26, 10])
  var buf = new Buffer(8)

  fs.read(fd, buf, 0, buf.length, 0, function(err, bytes, buffer) {
    if (header.toString() === buffer.toString()){
      console.log('是 PNG 图片')
    }
    else {
      console.log('不是 PNG 图片')
    }
  })
});