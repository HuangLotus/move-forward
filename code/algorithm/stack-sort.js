// 用一个辅助栈实现另一个栈的排序
// 后进先出，push,pop
// 思路：
// stack：要被排序的栈
// helpStack： 申请的辅助栈
// cur： 当前弹出的元素
// 1、如果 cur 小于或等于 help 的栈顶元素，则将 cur 直接压入help栈
// 2、如果 cur 大于 help 的栈顶元素，则将 help 的元素逐一弹出，逐一压入 stack栈中，直到 cur 小于或等于 help 的栈顶元素，再将cur压入help栈中
function sort (s1) {
  let helperS2 = []
  while (s1.length > 0) {
    let item = s1.pop()
    while(helperS2.length > 0 && item > helperS2[helperS2.length - 1]) {
      let helperItem = helperS2.pop()
      s1.push(helperItem)
    } 
    helperS2.push(item)
  }
  while (helperS2.length > 0) {
    s1.push(helperS2.pop());
  }
  return s1
}
let arr = [3,4,1,5,0,6]
console.log(sort(arr))