const fs = require('fs');
let files =[];
const walk = function(path) {
  fs
    .readdirSync(path)
    .forEach(function(file) {
      const newPath = path + '/' + file
      const stat = fs.statSync(newPath)

      if (stat.isFile()) {
        if (/\.js/.test(file)) {
          files.push(file)
        }
      } else if (stat.isDirectory()) {
        walk(newPath)
      }
    })
}
walk('../../js-base')
console.log(files.join('\r\n'))