// 冒泡排序
// 数组中有n个数，比较每相邻两个数，如果前者大于后者，就把两个数交换位置；
// 这样一来，第一轮就可以选出一个最大的数放在最后面；那么经过n-1（数组的 length - 1） 轮，就完成了所有数的排序
function bubbleSort(array){
  let length = array.length;
  for(let i = 0; i < length - 1; i++){
      for(let j = 0; j < length - i -1; j++){
          if(array[j] > array[j+1]){
            [array[j],array[j+1]] = [array[j+1],array[j]];
          }
      }
  }
}

let test = [6,8,4,5,1];
bubbleSort(test);
console.log(test);


var arr = [3, 10, 6, 2];
// 遍历数组
for (var i = 0; i < arr.length - 1; i++) {
    // 这里 i < arr.length - 1
    for (var j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            var num = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = num;
        }
    }
}
console.log(arr)  // [ 2, 3, 6, 10 ]
