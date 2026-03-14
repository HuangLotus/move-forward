/**
 * 大数乘法 - 优化实现
 * 输入: 两个数字数组，arr[0] 为最高位
 * 例如: [1,2,3] 表示 123
 */
function multiNumSum(arr1, arr2) {
  const len1 = arr1.length
  const len2 = arr2.length
  const resultLen = len1 + len2
  const result = new Array(resultLen).fill(0)

  // 标准竖式乘法: result[i+j+1] 累加 arr1[i] * arr2[j]
  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      const pos = i + j + 1
      result[pos] += arr1[i] * arr2[j]
    }
  }

  // 从低位向高位处理进位
  for (let k = resultLen - 1; k > 0; k--) {
    const carry = Math.floor(result[k] / 10)
    result[k] %= 10
    result[k - 1] += carry
  }

  // 移除前导零
  let start = 0
  while (start < resultLen - 1 && result[start] === 0) {
    start++
  }

  return result.slice(start)
}

// 测试
console.log(multiNumSum([1, 2, 3], [3, 4, 5])) // 123 * 345 = 42435
console.log(multiNumSum([9, 9, 9], [9, 9, 9])) // 999 * 999 = 998001
console.log(multiNumSum([1, 0, 0], [1, 0, 0])) // 100 * 100 = 10000
