// 实现一个js函数柯里化
// 把接受多个参数的函数换成接受单一参数的函数，并返回接受余下参数并返回结果的新函数的技术
// 特点是：参数复用，提前返回，延迟执行
// 未精简版
const curry = ( fn, arr = []) => {
    return (...args) => { 
        //判断参数总数是否和fn参数个数相等
        console.log('re',fn.length)
        if([...arr, ...args].length === fn.length){
            return fn(...arr, ...args) //拓展参数，调用fn
        } else{
            return curry(fn,[...arr, ...args]) //迭代，传入现有的所有参数
        }
    }
}

// 精简版：
const curry2 = (fn, arr = []) => (...args) => (a => a.length === fn.length ? fn(...a) : curry2(fn, a))([...arr,...args]);  

function add(a,b,c){  
    return a+b+c;
}
var multi = curry(add);
console.log(multi(2)(3)(4));
console.log(multi(2,3,4));
console.log(multi(2,3)(4));

// 最简单的柯里化
// var add = function (x) {  //柯里化
//     return function (y) {
//         return x + y;
//     }
// }
// console.log(add(2) (6)); 
// var add1 = add(200);
// console.log(add1(2)); 