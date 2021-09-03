console.log('begin');
for(var i =0;i<5;i++){
  setTimeout(function(){
    console.log(i);
  }, 1000);
}
console.log('end');

var a = 1;
function Fn1(){
  var a = 2;
  alert(this.a+a);
}

function Fn2(){
  var a = 10;
  Fn1();
}

Fn2();

var Fn3 = function(){
  this.a = 3;
}

Fn3.prototype = {
  a: 4
}

var fn3 = new Fn3();
Fn1.call(fn3);