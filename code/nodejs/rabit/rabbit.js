// 声明 2 个比赛队员
const rabbit = '兔子'
const turtle = '乌龟'
// 声明一坨变量，作为赛道起点终点字符串
const start = '|'
const end = '》'
// 赛道上一米一米的距离，用 . 表示
const pad = '.'
// 速度是 1 米/150 毫秒
const speed = 1
// 赛道一共有 50 米
const steps = 50
// 约定兔子在 42 米的时候停下
const stopAt = 42
// 判断兔子是否停下
let stoped = false
// 默认从 0 开始轮询
let t = 0
// 一个定时器的句柄而已
let timer

// 计算兔子距离终点
const getRabbitLastSteps = () => {
  return steps - t * speed - t * speed * 3
}

// 计算乌龟距离终点
const getTurtleLastSteps = () => {
  return steps - t * speed
}

// 计算龟兔间距
const getGapSteps = () => {
  return stopAt - t * speed
}

// 初始赛道状态
const checkRaceInitState = () => {
  return `${rabbit}${turtle}${start}${pad.repeat(steps)}${end}`
}

// 兔子领先时的赛道状态
const checkRaceState = () => {
  return `${start}${pad.repeat(t * speed)}${turtle}${pad.repeat(t * speed * 3)}${rabbit}${pad.repeat(getRabbitLastSteps())}${end}`
}

// 分情况计算赛道的实时状态
const checkBackRaceState = () => {
  if (getGapSteps() <= 0) {
    if (getTurtleLastSteps() === 0) {
      return `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(steps - stopAt)}${end}${turtle}`
    } else {
      return `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(t * speed - stopAt)}${turtle}${pad.repeat(getTurtleLastSteps())}${end}`
    }
  } else {
    return `${start}${pad.repeat(t * speed)}${turtle}${pad.repeat(getGapSteps())}${rabbit}${pad.repeat(steps - stopAt)}${end}`
  }
}

// 等待时间，把定时器包装成一个 Promise
const wait = (sec) => new Promise(resolve => setTimeout(() => resolve(), sec))

// 可以支持特效刷新的命令行日志模块
const chalkWorker = require('chalk-animation')
const initState = checkRaceInitState()
const racing = chalkWorker.rainbow(initState)

const updateRaceTrack = (state) => {
  racing.replace(state)
}

const race = () => {
  timer = setInterval(() => {
    // 判断是否兔子停下
    if (!stoped) {
      if (getRabbitLastSteps() <= (steps - stopAt)) {
        stoped = true
      }
    }

    if (stoped) {
      let state = checkBackRaceState()
      updateRaceTrack(state)

      if (getTurtleLastSteps() === 0) {
        // 乌龟过线后就停止定时器
        clearInterval(timer)
        return
      }
    } else {
      let state = checkRaceState()
      updateRaceTrack(state)
    }
    
    t++
  }, 150); 
}

// 等待 2 秒再开始启动比赛
wait(2000).then(() => {
  race()
})