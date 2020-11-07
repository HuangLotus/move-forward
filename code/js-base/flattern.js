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

// 用正则
JSON.parse('['+JSON.stringify(arr).replace(/\[|\]/gi, '')+']');

// [1,[[2]],{a:[1,23,4]},[[3,4]]]
// 拍平嵌套数组，不使用flat方法，不使用递归

// let arr = [1,[[2]],{a:[1,3]},[[3,4]]];
// JSON.parse('['+JSON.stringify(arr).replace(/(\[\])?{(^\[|\])?}/gi,(m,p=>{
  
// })+']');

// 用flat
let arr = [1, [2, [3, [4, 5]]], 6];
let arr_flat = arr.flat(Infinity);

// 用toString
let arr = [1, [2, [3, [4, 5]]], 6];
let arr_flat = arr.toString().split(',').map((val)=>{
    return parseInt(val)
});