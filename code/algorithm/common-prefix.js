// 求字符串公共前缀，例如  
// ['abcaaa', 'abcddd', 'abcadad'] ==> 'abc'
function commonPrefix (arr) {
  if (arr.length === 0) {
    return ''
  }
  let arrLen = arr.length
  let result = new Array(arrLen).fill('')
  let first = arr[0]
  for (let i = 0, len = first.length; i<len; i++) {
    let temp = first[i] // 逐字母比较
    let count = 0
    arr.forEach(item => {
      if (item.slice(i, i+1) === temp) {
        count ++
      }
    })
    if (count === arrLen) {
      result[i]= temp
    }
    if (count !== arrLen) {
      return result
    }
    count = 0
  }
  console.log(result) // ['', '', 'a', 'b', 'c', '', 'd']
  return result
}
// console.log(commonPrefix(['abcaaa', 'abcddd', 'abcadad']))