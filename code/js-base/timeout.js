// 每隔3s打印一次helloworld，打印4次
let count = 0
let timer = setInterval(() => {
  if (count === 4) {
    clearInterval(timer)
    return
  }
  count ++
  console.log('helloworld')
}, 3000);