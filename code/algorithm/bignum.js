// 两个大数相加求和
function bigSum(a, b) {
  // 已 12345 和 678 为例
  // 我们需要先把他们转换为位数相同，不够补零，记住要统一加一位，为了两个最大的位数相加后可能需要进位
  // 12345 =>  012345    678 => 000678
  // 然后让各自的个位个位相加，十位与十位相加   5 + 8 = 3  （1为进位） 4 + 7 + 1 = 2 （1） .....
  a = '0' + a 
  b = '0' + b
  let aArr = a.split('')
  let bArr = b.split('')
  let carry = 0
  let res = []
  let length = Math.max(aArr.length,bArr.length)
  let distance = aArr.length - bArr.length
  if (distance > 0) {
    for(let i = 0; i < distance; i++){
      bArr.unshift('0');
    }
  } else{
    for(let i = 0; i < Math.abs(distance); i++){
      aArr.unshift('0');
    }
  }
  for(let i = length - 1; i >= 0; i--) {
    let sum = Number(aArr[i]) + Number(bArr[i]) + Number(carry)
    carry = sum > 10 ? 1 : 0
    sum = sum > 10 ? parseInt(sum / 10) : sum
    res.unshift(sum)
  }
  return res.join('').replace(/^0/,'')
}
console.log(bigSum('9007199254740993', '1'))
// 注意： 传参时就需传入字符串，如果是数字类，在传参时就已经出现精度丢失