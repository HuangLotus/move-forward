// 发布订阅模式
// 发布订阅模式比观察者多一个调度中心，由调度中心统一调度订阅事件。
// 在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。

let event = {
  clientList: {},
  listen (key, fn) {
      if (!this.clientList[key]) {
          this.clientList[key] = []
      }
      this.clientList[key].push(fn)   // 订阅的消息添加进缓存列表
  },
  trigger (type, money) {
      let fns = this.clientList[type]
      if (!fns || fns.length === 0) { // 如果没有绑定对应的消息
          return false
      }
      fns.forEach(fn => {
          fn.apply(this, [money])
      })
  }
}

// 再定义一个installEvent函数，用于给所有对象动态安装发布-订阅功能
// 如：另一家售楼处也想要这个功能，就可以调用这个注册了，不同再写多一次这段代码
let installEvent = obj => {
  for (let i in event) {
      obj[i] = event[i]
  }
}

// 给售楼处对象salesOffices动态增加发布-订阅功能
let salesOffices = {}
installEvent(salesOffices)
// 小明订阅信息
salesOffices.listen('squareMeter88', price => {
  console.log('小明，你看中的88平方的房子，价格=' + price)
})
// 小光订阅信息
salesOffices.listen('squareMeter88', price => {
  console.log('小光，你看中的88平方的房子，价格=' + price)
})
// 小红订阅信息
salesOffices.listen('squareMeter100', price => {
  console.log('小红，你看中的100平方的房子，价格=' + price)
})
salesOffices.trigger('squareMeter88', 2000000)
salesOffices.trigger('squareMeter100', 2500000)




class PubSub {
  constructor () {
    this.eventList = {}
  }

  sub (eventName, cb) {
    if (typeof this.eventList[eventName] === 'undefined') {
      this.eventList[eventName] = []
    }
    this.eventList[eventName].push(cb)
  }

  unSub(eventName, cb) { 
    if (this.eventList[eventName]) {
      let currEvt = this.eventList[eventName]
      if (cb) {
        for(let i = 0, len = currEvt.length; i<len; i++){
          if (currEvt[i] === cb) {
            currEvt.splice(i, 1)
            break;
          }
        }
      } else {
        this.eventList[eventName] = []
      }
    }
  }

  notify (eventName, ...args){
    if (!this.eventList[eventName]) {
      return 
    }
    this.eventList[eventName].forEach(fn => {
      fn(...args)
    })
  }
}
let instance = new PubSub()
instance.sub('eventName', () => {})
instance.unSub('eventName', () => {})
instance.notify('eventName', 1)
