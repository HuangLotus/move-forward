// 手写一个js深拷贝
// 最简单版
// var newObj = JSON.parse(JSON.stringify(someObj));
function deepClone(obj){
    if (typeof obj === 'object'){ // 数组和对象 typeof 都是object
        var result = obj.constructor === Array ? [] : {};
        for (let i in obj){
            result[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
        }
    } else {
        var result = obj;
    }
    return result;
}
var test = {
    a: 1,
    b: 2,
    c: {
        e: 3,
        f: 4
    },
    d: [20,30,40]
};
var ctest = deepClone(test);
console.log('克隆前',ctest);
test.c.e = 10;
test.d[0] = 200;
console.log('克隆后',test);