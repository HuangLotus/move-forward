// stack先进后出
// queue先进先出 shift,unshift length
// push pop, length
// 用stack去实现队列的3个功能

// 队列是一种 先进先出（first in - first out， FIFO）的数据结构，队列中的元素都从后端（rear）入队（push），从前端（front）出队（pop）
// 栈是一种 后进先出（last in - first out， LIFO）的数据结构，栈中元素从栈顶（top）压入（push)，也从栈顶弹出（pop）。
// 为了满足队列的 FIFO 的特性，我们需要用到两个栈，用它们其中一个来反转元素的入队顺序，用另一个来存储元素的最终顺序。
class Queue {
  constructor () {
    this.s1 = []
    this.s2 = []
  }
  // 后端入队
  push (item) {
    this.s1.push(item)
  }
  // 前端出队
  // 关键点是在s2还没倒完的时候，不要继续往里面放东西。
  shift () {
    if (this.s2.length === 0) {
      while (this.s1.length > 0) {
        this.s2.push(this.s1.pop())
      }
    }
    return this.s2.pop()
  }

  empty() {
    this.s2.length === 0 && this.s1.length === 0
  }
}

class Stack {
  constructor () {

  }
  // 顶部入栈
  push () {

  }
  // 顶部出栈
  pop () {

  }
}

