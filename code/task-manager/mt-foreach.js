// 实现函数 forEach(arr, cb) ，使cb逐个处理arr中的元素，一次处理可能是同步的，
// 也可能是异步的，要求处理完成当前元素才能处理下一个
// 要求：使用promise 实现
// 考察promise和串行执行

function forEach(arr, cb){
  return arr.reduce((acc, item) => {
    return acc.then((data) => item(cb(data)));
  }, Promise.resolve(1));
}

let result = forEach([(data) => new Promise((resolve, reject)=> {
  setTimeout(() => {
    resolve(1+data);
  },0);
}),(data)=>new Promise((resolve, reject)=> {
  setTimeout(() => {
    resolve(2+data);
  },0);
}),(data) => data + 3,
  (data) => new Promise((resolve, reject)=> {
  setTimeout(() => {
    resolve(4+data);
  },0);
})],(data)=> {
  return data * 2;
})
result.then(res => {
  console.log(res)
})