// 拍平一个数组
Array.prototype.flattern = function (){
  let arr = this;
  function inner(arr, result){
    for (let i = 0, len = arr.length; i<len; i++){
      if (arr[i] instanceof Array){
        inner(arr[i], result);
      } else {
        result.push(arr[i]);
      }
    }
    return result;
  }
  return inner(arr, []);
};
// 精简版
Array.prototype.flattern2 = function (){
  let arr = this;
  function inner(arr){
    return arr.reduce((acc, item) => acc.concat(Array.isArray(item) ? inner(item) : item), []);
  }
  return inner(arr);
};
[1,3,[4,6],[7,8],[10,[12,34]],90].flattern2(); // [ 1, 3, 4, 6, 7, 8, 10, 12, 34, 90 ]
  