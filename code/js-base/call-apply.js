// 实现一个call或者apply
// call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
Function.prototype.myCall = function(content = window){
    // content.func = this;
    let key = Symbol()
    content[key] = this
    let args = [...arguments].slice(1);
    let result = content[key](...args);
    delete content[key];
    return result;
};
Function.prototype.myApply = function(content = window){
    content.func = this;
    let result = content.func(...arguments[1]);
    delete content.func;
    return result;
}

var foo = {
    value: 1
};
function bar(name, age){
    this.name = name;
    this.age = age;
}
bar.myCall(foo, 'black', '18');
// bar.myApply(foo, ['red', '19']);
console.log('a',foo);