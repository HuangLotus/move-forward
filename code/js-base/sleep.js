// 实现一个sleep函数
// 1.promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve,time))
}
sleep(1000).then(()=>{
  console.log(1)
})
// 2. async
function sleep2(time) {
  return new Promise(resolve => setTimeout(resolve,time))
}
async function output() {
  let out = await sleep2(1000);
  console.log(1);
  return out;
}
output()

// 3. es5
function sleep3(callback,time) {
  if(typeof callback === 'function')
    setTimeout(callback,time)
}
 
function output(){
  console.log(1);
}
sleep3(output,1000)
