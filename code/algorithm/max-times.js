const arr = [1, 2,  1,  2, '1', '1', '2', '2', 1, '2', '2', 4,  5,  6 ] 
//  找出这个数组中出现次数最多的一项及这一项出现了多少次
function findNum (arr) {
  let result = {}
  let max = 0
  let maxVal = null
  for (let i = 0, len = arr.length; i<len; i++) {
    let tag = ''
    if (typeof arr[i] === 'number') {
      tag = `num_${arr[i]}`
    } else {
      tag = `str_${arr[i]}`
    }
    if (!result[tag]){
      result[tag] = 1
    } else {
      result[tag] = result[tag]++ 
    }
    if (result[tag] > max){
      max = i
      maxVal = tag
    }
  }
  console.log(result)
  if (maxVal.indexOf('num_') > -1) {
    maxVal = parseInt(maxVal.replace('num_', ''))
  } else {
    maxVal = maxVal.replace('str_', '')
  }
  return {
    value: maxVal,
    count: max
  }
}
// console.log(findNum(arr))


const arr2 = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
res = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] 
// n * n
function combileArr (arr) {
  if (arr.length === 0) {
    return []
  }
  let result = []
  for (let i = 0, len = arr.length; i<len; i++){
    if (!result[i]){
      result[i] = []
    }
    let j = 0
    while(j < len) {
      result[i].push(arr[j][i])
      j++
    }
  }
  return result
}
console.log(combileArr(arr2))