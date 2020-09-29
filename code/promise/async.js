// 支持异步串行
//期待依次输出
//this is 1.txt
//this is 2.txt
//this is 3.txt
// 实际上输出
// this is 1.txt
// this is 1.txt
// this is 1.txt

// 所以要想实现异步操作串行，我们不能将回调函数都注册在初始promise的onFulfilledCallbacks里面，
// 而要将每个回调函数注册在对应的异步操作promise的onFulfilledCallbacks里面，
// 用setTimemout异步任务场景来举例，f1要在p的onFulfilledCallbacks里面，
// 而f2应该在f1里面return的那个Promise的onFulfilledCallbacks里面，
// 因为只有这样才能实现读取完2.txt后才去打印2.txt的结果。

// 但是，我们平常写promise一般都是这样写的: promise.then(f1).then(f2).then(f3)，
// 一开始所有流程我们就指定好了，而不是在f1里面才去注册f1的回调，f2里面才去注册f2的回调。
// 如何既能保持这种链式写法的同时又能使异步操作衔接执行呢？我们其实让then方法最后不再返回自身实例，
// 而是返回一个新的promise即可，我们可以叫它bridgePromise，它最大的作用就是衔接后续操作，

function myPromise(fn){
  let self = this;
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;

  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = []; // 便于后面实现链式调用

  function resolve(value){
    if(self.status === 'pending'){
      self.status = 'fullfilled';
      self.value = value;
      self.onResolvedCallbacks.forEach(fun => fun(self.value));
    }
  }

  function reject(reason){
    if(self.status === 'pending'){
      self.status = 'rejected';
      self.reason = reason;
      self.onRejectedCallbacks.forEach(fun => fun(self.reason)); 
    }
  }

  try{
    fn(resolve, reject);
  }catch(e){
    reject(e);
  }
}
myPromise.prototype.then = function(onFullfilled, onRejected){
  let self = this;

  let bridgePromise;
  //防止使用者不传成功或失败回调函数，所以成功失败回调都给了默认回调函数
  onFullfilled = typeof onFullfilled === 'function' ? onFullfilled: value => value;
  onRejected = typeof onRejected === 'function' ? onRejected: error => {throw error;};
  if(self.status === 'fullfilled'){
      return bridgePromise = new myPromise((resolve, reject) => {
        try{
          let x = onFullfilled(self.value);
          resolvePromise(bridgePromise, x, resolve, reject);
        }catch(e){
          reject(e);
        }
      });
  } else if(self.status === 'rejected'){ 
      return bridgePromise = new myPromise((resolve, reject) => {
        try{
          let x = onRejected(self.reason);
          resolvePromise(bridgePromise, x, resolve, reject);
        }catch(e){
          reject(e);
        }
      });
  } else if(self.status === 'pending'){
    return bridgePromise = new myPromise((resolve, reject) => {
      self.onResolvedCallbacks.push((value)=>{
        try{
          let x = onFullfilled(value);
          resolvePromise(bridgePromise, x, resolve, reject);
        }catch(e){
          reject(e);
        }
      });
      self.onRejectedCallbacks.push((value)=>{
        try{
          let x = onRejected(value);
          resolvePromise(bridgePromise, x, resolve, reject);
        }catch(e){
          reject(e);
        }
      })
    });
  }
  // return this;
};
//用来解析回调函数的返回值x，x可能是普通值也可能是个promise对象
function resolvePromise(bridgePromise, x, resolve, reject){
  //如果x是一个promise
  if( x instanceof myPromise){
    // console.log('x是一个promise',x);
    //如果这个promise是pending状态，就在它的then方法里继续执行resolvePromise解析它的结果，
    //直到返回值不是一个pending状态的promise为止
    if(x.status === 'pending'){
      x.then(y => {
        resolvePromise(bridgePromise, y, resolve, reject);
      },err => {
        reject(err);
      });
    }else {
      x.then(resolve, reject);
    }
  }else {
    console.log('普通值x',x)
    //如果x是一个普通值，就让bridgePromise的状态fulfilled，并把这个值传递下去
    resolve(x);
  }
}
//catch方法其实是个语法糖，就是只传onRejected不传onFulfilled的then方法
myPromise.prototype.catch= function(onRejected){
  return this.then(null, onRejected);
}

let p = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('this is text 1');
  }, 100);
  return 'p'
});
let f1 = function(data) {
  console.log(data)
  return new myPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('this is text 2');
    }, 100);
  });
}
let f2 = function(data) {
  console.log(data)
  return new myPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('this is text 3');
    }, 200);
  });
}
let f3 = function(data) {
  console.log(data);
  return 'f3';
}
let errorLog = function(error) {
  console.log(error)
  return 'error';
}
p.then(f1).then(f2).then(f3).catch(errorLog);