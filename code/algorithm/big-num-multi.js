function multiNumSum (arr1, arr2) {
  let carry = 0
  let len1 = arr1.length
  let len2 = arr2.length
  let len = Math.max(len1,len2)
  let tempAllLen = len1 * len2
  let result = new Array(tempAllLen).fill(0)
  let idx = tempAllLen - 1 
  let count = 0
  
  for (let i = len1 - 1; i > 0; i--){
    let tmpArr = []
    for(let j = len2 - 1; j > 0; j--) {
      let sum = arr1[i] * arr2[j] + carry
      if (sum > 10) {
        let temp = sum.toString().split('')
        carry = parseInt(temp[0])
        sum = parseInt(temp[1])
      }
      tmpArr.unshift(sum)
    }
    // 做加法
    // 首次
    idx -= count
    if (i = len1 - 1) {
      for(let k = tmpArr.length - 1; k> 0; k--){
        result[idx] = tmpArr[k]
        idx--
      }
    } else {
      let sumCarry = 0
      for(let k = tmpArr.length - 1; k > 0; k--){
        let sum = result[idx] + tmpArr[k] + sumCarry
        if (sum > 10) {
          sumCarry = 1
        } 
        idx--
        sum -= 10
        result[idx] = sum
      }
    }
    count++
    // 复原
    idx = tempAllLen - 1 
  }
  while(result[0] === 0){
    result = result.shift()
  }
  return result
}
console.log(multiNumSum([1,2,3], [3,4,5]))