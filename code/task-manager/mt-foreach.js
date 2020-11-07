// 实现函数 forEach(arr, cb) ，使cb逐个处理arr中的元素，一次处理可能是同步的，
// 也可能是异步的，要求处理完成当前元素才能处理下一个
// 要求：使用promise 实现
// 考察promise和串行执行

// reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
// reducer 函数接收4个参数:
  // Accumulator (acc) (累计器)
  // Current Value (cur) (当前值)
  // Current Index (idx) (当前索引)
  // Source Array (src) (源数组)
// 您的 reducer 函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。
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