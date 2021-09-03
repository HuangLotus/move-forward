// 用两个队列实现栈,我们可以发现队列无论怎么倒，我们不能逆序一个队列
// 队列是先进先出  push, shift
// 栈是后进先出 push ,pop
class Queue {
  constructor(){
    this.data = []
  }
  // 进
  push (x) {
    this.data.push(x)
    console.log('data', this.data)
  }
  // 出
  shift () {
    return this.data.shift()
  }
}

// 要保持后进先出，那么就需要每次push进来的值是数组的第一个，这样就可以第一个shift出去。
class Stack {
  constructor() {
    this.q1 = []
    this.q2 = []
  }
  // 每次push完后保持q1,q2有一个为空队列
  // 步骤
  // 将x推入空队列（比如q1）中（作为第一个元素）
  // 将另外一个队列全部推入q1,此时q2为空队列
  // pop时从非空队列中取出即可。
  push (x) {
    if (this.q1.length === 0) {
      this.q1.push(x)

      while (this.q2.length) {
        this.q1.push(this.q2.shift())
      }
    } else if (this.q2.length === 0) {
      this.q2.push(x)

      while (this.q1.length) {
        this.q2.push(this.q1.shift())
      }
    }
  }
  pop() {
    if (this.q1.length !== 0) {
      return this.q1.shift()
    } else {
      return this.q2.shift()
    }
  }
}
let myStack = new Stack()
myStack.push(1)
myStack.push(2)

console.log(myStack.pop()) // 2
