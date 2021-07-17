// 出现次数
function findK(src, word) {
  let times = 0
  let srcStr = src
  let wordReplace = (new Array(word.length).fill('A')).join('')
  while(srcStr.indexOf(word) > -1) {
    times ++
    srcStr = srcStr.replace(word, wordReplace)
  }
  return times
}
console.log(findK('ababc', 'ab')) // 2