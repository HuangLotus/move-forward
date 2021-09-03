
// 同字母异序列
const isAnagram = (str1, str2) => /* TODO */ {
    return !str1.split('').sort().join('').replace(str2.split('').sort().join(''), '');
}

console.log(isAnagram("anagram", "nagaram")) // => return true.
console.log(isAnagram("rat", "car")) // => return false.

const fibonacci = ((memo = [0, 1]) => {
    const fib = (n) => {
        let result = memo[n];
        if(typeof result !== 'number'){
            result = fib(n-1) + fib(n-2);
            memo[n] = result;
        }
        return result;
    }
    return fib;
})();
console.log('fibonacci',fibonacci(6));