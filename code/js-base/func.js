// 存在变量提升，所以是undefined，而不是报错；
console.log('1',f1,f2,f3);
var f1 = function(){
  console.log('f1');
}
var f2 = function(){
  console.log('f1');
}
var f3 = 'f3';
var f1,f2,f3;
console.log('2',f1,f2,f3)


var tmp = +new Date();
function f(){
  console.log(tmp);
  if(false){
    var tmp = 'helo';
  }
}
f();