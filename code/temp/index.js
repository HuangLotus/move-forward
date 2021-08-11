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
function fibonacci(num){
  let result = memo[num];
  if(typeof result !== 'number'){
    result = fibonacci(num - 1) + fibonacci(num - 2);
    memo[num] = result;
  }
  return result;
}
console.log(fibonacci(6))