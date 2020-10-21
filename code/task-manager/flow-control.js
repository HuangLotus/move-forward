// 实现一个流程控制函数，使得若干任务按顺序执行，且每个任务的返回结果都传给下一个任务，
// 如果中途出错，后面的任务则不会被执行，并返回当前执行结果
// 串行任务

function waterfall(tasks,callback){
  let next = function(data){
    if(tasks.length === 0){
      callback(null, data);
      return ;
    }
    let fn = tasks.shift();
    fn(data,next)
  }
  next('');
}
waterfall([
  function(data, cb){
    cb(data+' 1');
  },
  function(data, cb){
    cb(data+' 2');
  },
  function(data,cb){
    cb(data+' done')
  }
], function(err, result){
  console.log('result',result)
});

