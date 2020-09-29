// 手写一个promise
// var promise = new Promise((resolve, reject) => {
//   if(true){
//     resolve(value);
//   }else {
//     reject();
//   }
// });
// promise.then(() => {
//   console.log('succ');
// }, () => {
//   console.log('err');
// });

function myPromise(fn){
    let self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
  
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];
  
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
    switch(self.status){
      case 'fullfilled':
        onFullfilled(self.value); break; // 可支持同步任务
      case 'rejected': 
        onRejected(self.reason); break;
      case 'pending':
        self.onResolvedCallbacks.push(function(){
          onFullfilled(self.value);
        });
        self.onRejectedCallbacks.push(function(){
          onRejected(self.reason);
        });
        break;
    }
    return this;// 可实现链式操作,但是这个链式操作返回的都是同一个函数执行结果，并不能真正实现链式调用
  };
  // var p = new myPromise(function(resolve, reject){
  //   resolve(1); // 同步任务执行
  //   // setTimeout(() => {
  //   //   resolve(1); // 异步任务执行
  //   // }, 100)
  //   // setTimeout(() => {
  //   //   reject(2);
  //   // }, 1000)
  // });
  // p.then(function(val){
  //   console.log('succ resolve',val);
  // }, function(err){
  //   console.log('oops', err);
  // }).then(res => {
  //   console.log('第二个then',res)
  // });
  
  myPromise.all = function(list){
    return new myPromise((resolve, reject)=>{
      let result = [];
      let counter = 0;
      list.forEach((fn, index) => {
        fn.then(res => {
          result[index] = res;
          counter ++;
          if(counter === list.length){
            resolve(result);
          }
        }, (err) => {
          reject({err, index})
        });
      });
    });
  }
  myPromise.all([new myPromise((resolve, reject)=>{
    setTimeout(() => {
      resolve(1);
    }, 100);
  }),
  new myPromise((resolve, reject)=>{
    setTimeout(() => {
      resolve(2);
    }, 100);
  }),
  new myPromise((resolve, reject)=>{
    setTimeout(() => {
      resolve(3);
    }, 100);
  })]).then(res => {
    console.log('all',res)
  })