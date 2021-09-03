Array.prototype.myPush = function(){
  let arguLen = arguments.length;
  let thisLen = this.length;

  for(let i = 0; i<arguLen;i++){
    this[thisLen + i] = arguments[i];
  }
  return this.length;
}
Array.prototype.myPop = function(){
  let remove = this[this.length - 1];
  this.length -= 1;
  return remove;
}
let arr = [1,3,4];
arr.myPush(5,6,6);
arr.myPop();
console.log('arr',arr); // [ 1, 3, 4, 5, 6 ]

// 数组去重
function redup(arr){
  let last = [];
  for(let i =0, len = arr.length; i<len; i++){
      if ( (last.length === 0 && arr[i] === arr[i + 1]) || (last.length > 0 && arr[i] === last[0])){
          last.push(arr[i]);
      } else {
          if (last.length !== 0){
              arr.splice(i - last.length, last.length);
              return redup(arr);
          }
      }
      // 最后一项
      if(last.length > 0 && i === len - 1){
          arr.splice(i - last.length + 1, last.length);
          last = [];
      }
  }
  if(last.length === 0){
      return arr;
  }
}
console.log('redup',redup([1,2,2,2,1,3,4,12,4,4,5,6,7,8,8,9,9,9,10,11,11,10]));
// [ 3, 5, 6, 7 ]

// 将两个有序数组合并成一个数组
function combine(arr1, arr2){
  let result = [];
  while(arr1.length && arr2.length){
      if (arr1[0] < arr2[0]){
          result.push(arr1.shift());
      } else {
          result.push(arr2.shift());
      }
  }
  if (arr1.length) {
    result = result.concat(arr1)
  } else {
    result = result.concat(arr2)
  }
  return result;
}
console.log('combile',combine([1,3,5,6,7,10,700], [2,4,5,8,9,11,459]));


function unique(arr){
  let result = [];
  let hashTable = {};
  for (let i = 0, len = arr.length; i<len; i++){
    if(typeof hashTable[arr[i]] === 'undefined'){
      hashTable[arr[i]] = 1;
      result.push(arr[i]);
    }
  }
  return result;
}