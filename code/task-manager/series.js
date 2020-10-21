// let taskA = setTimeout(() => {
//   console.log('A');
//   taskB('A');
// }, 100);
// let taskB = (data) => {
//   console.log('B');
//   taskC(data+'B');
// };
// let taskC = (data) => {
//   console.log(data+'C');
// };

// 使用promise的then来达到链式调用
// let taskA = (data) => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('task A: '+data);
//     resolve(data+' a');
//   });
//  })
//  let taskB = (data) => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('task B: '+data);
//     resolve(data+' b');
//   });
//  })
//  let taskC = (data) => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('task C: '+data);
//     resolve(data+' c');
//   });
//  })
//  function start() {
//     console.log('start');
//     taskA('go').then(taskB).then(taskC);
//  }
//  start();
 
async function f1(){
  let d1 = await new Promise(resolve => {
    setTimeout(()=>{
      resolve('t1');
    }, 10);
  })
  let d2 = await new Promise(resolve => {
    setTimeout(()=>{
      resolve(d1 +' t2');
    }, 10);
  });
  console.log(d1,d2)
}
f1();

// reduce
let createP = (data) => (predata) => new Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve(predata + data);
  });
}, 0);
let mytasks = [
createP(' p1'),
createP(' p2'),
createP(' p3'),
createP(' p4')
];
let result = mytasks.reduce((acc, item) => acc.then((predata) => item(predata)), Promise.resolve('start')); 
result.then(res => {
console.log('result',res)
});

