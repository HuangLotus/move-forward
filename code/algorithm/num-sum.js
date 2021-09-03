// [{"京酱肉丝": 20.50}, 
// {"麻婆豆腐": 10.70}, 
// {"北京烤鸭": 101.00}, 
// {"水煮鱼": 80.50}, 
// {"东北乱炖": 90.30}]
// 101.00
// [["京酱肉丝", "水煮鱼"], ["麻婆豆腐", "东北乱炖"], ["北京烤鸭"]]

// 3个数相加求和
function computeMulti (arr, price) {
  arr = arr.map(item => {
    return { ...item, find: false }
  })
  let result = []
  for (let i = 0, len = arr.length; i<len; i++){
    let itemPrice = arr[i].price
    if (itemPrice === price) {
      arr[i].find = true
      result.push([arr[i].text])
      continue
    }
    console.log(i)
    let leftPrice = price 
    let tmpIndexArr = []
    let isFind = false
    arr.forEach((arrItem,idx) => {
      if (!isFind) {
        leftPrice = leftPrice - arrItem.price
        if (leftPrice < 0) {
          return
        }
        // console.log('>0', leftPrice)
        tmpIndexArr.push(idx)
        let index = findLeft(leftPrice)
        if (index > 0) {
          tmpIndexArr.push(index)
          let tmp = []
          if (tmpIndexArr.length > 0 ){
            tmpIndexArr.forEach(tp => {
              arr[tp].find = true
              tmp.push(arr[tp].text)
            })
          }
          tmpIndexArr = []
          isFind = true
          result.push(tmp)
        }
      }
    })
    isFind = false
    tmpIndexArr = []
    
    function findLeft(targetPrice) {
      return arr.findIndex(item => !item.find && item.price === targetPrice)
    }
  }
  console.log(result)
}
computeMulti([
  {
    price: 0.5,
    text: '米饭'
  },
  {
    price: 20,
    text: '京酱肉丝'
  },
  {
    price: 10.7,
    text: '麻婆豆腐'
  },
  {
    price: 101,
    text: '北京烤鸭'
  },
  {
    price: 80.5,
    text: '水煮鱼'
  },
  {
    price: 90.3,
    text: '东北乱炖'
  }
], 101)



function compute (arr, price) {
  arr = arr.map(item => {
    return { ...item, find: false }
  })
  let result = []
  for (let i = 0, len = arr.length; i<len; i++){
    let itemPrice = arr[i].price
    let target = price - itemPrice
    let index = arr.findIndex(item => !item.find && item.price === target)
    if (itemPrice === price) {
      arr[i].find = true
      let tmp = []
      tmp.push(arr[i].text)
      result.push(tmp)
    }
    if (index > 0) {
      let tmp = []
      arr[i].find = true
      arr[index].find = true
      tmp.push(arr[i].text)
      tmp.push(arr[index].text)
      result.push(tmp)
    }
  }
  console.log(result)
}
// compute([
//   {
//     price: 20.5,
//     text: '京酱肉丝'
//   },
//   {
//     price: 10.7,
//     text: '麻婆豆腐'
//   },
//   {
//     price: 101,
//     text: '北京烤鸭'
//   },
//   {
//     price: 80.5,
//     text: '水煮鱼'
//   },
//   {
//     price: 90.3,
//     text: '东北乱炖'
//   }
// ], 101)