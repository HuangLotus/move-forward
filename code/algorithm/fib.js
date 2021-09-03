// 0, 1,1,2,3,5
// F(0)=0，F(1)=1, F(n)=F(n - 1)+F(n - 2)（n ≥ 2，n ∈ N*）
function fib (num) {
  let memo = [0, 1]
  if (num <= 1) {
    return memo
  }
  const inner = (n) => {
    let res = memo[n]
    if (typeof res !== 'number') {
        res = inner(n-1) + inner(n-2)
        memo[n] = res
    }
    return res
  }
  
  inner(num)
  return memo
}
console.log(fib(5))
