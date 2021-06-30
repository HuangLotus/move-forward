function waterfall(tasks, callback) {
  let next = function(data) {
    if (tasks.length === 0) {
      callback(null, data)
      return
    }
    let fn = tasks.shift()
    fn(data, next)
  }
  next('')
}

waterfall([function(data, cb){
  cb(data + ' 1')
}, function(data, cb){
  cb(data + ' 2')
}, function(data, cb){
  cb(data + ' 3')
}], function(err, result) {
  console.log('result', result)
})