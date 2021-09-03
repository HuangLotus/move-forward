let arr = [1,3,[4,6],[7,8],[10,[12,34]],90];
Array.prototype.myflat = function(){
  let arr = this;
  if (arr.length === 0){
    return [];
  }
  function inner(arr){
    return arr.reduce((sum, item) => {
      console.log('sum',sum)
      sum.concat(Array.isArray(item) ? inner(item) :item) ;
      return sum;
     }, []);
  }
  return inner(arr);
}
console.log(arr.myflat());


const fibonacci = ((memo = [0, 1]) => {
  const fib = (n) => {
    let result = memo[n];
    if(typeof result !== 'number'){
      result = fib(n-1) + fib(n-2);
      memo[n] = result;
    }
    return result;
  }
  return fib;
})();
console.log('fibonacci',fibonacci(6));

let memo = [0, 1];
// function fibonacci(num){
//   let result = memo[num];
//   if(typeof result !== 'number'){
//     result = fibonacci(num - 1) + fibonacci(num - 2);
//     memo[num] = result;
//   }
//   return result;
// }
console.log(fibonacci(6))


Function.prototype.myBind = function(thisArg){
  if(typeof this !== 'function'){
      return;
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var mybind = function (){
      var _this = this instanceof self ? this : thisArg;
      return self.apply(_this, args.concat(Array.prototype.slice.call(arguments)));
  };
  mybind.prototype = this.prototype;
  return mybind;
};
function foo(name, other) {
  this.name = name;
  this.other = other;
}
var obj = {
  b: 2
};

var bar = foo.myBind(obj);

var alice = new bar('Alice','heh');
// console.log(obj);  // Jack
console.log(alice);    // Alice