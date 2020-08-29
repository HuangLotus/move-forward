// 实现一个instanceof 
// instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置
function instanceOf(left, right){
    let proto = left.__proto__;
    let prototype = right.prototype
    while(true) {
        if(proto === null) return false
        if(proto === prototype) return true
        proto = proto.__proto__;
    }
}