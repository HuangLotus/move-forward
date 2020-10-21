// 实现一个bind函数
// bind会返回一个新的函数，这个新的函数的原型对象等于原函数的原型对象；
// 新函数this如果是原函数的实例，新函数的this就是自己，否则是传入的对象；
// 新函数返回原函数在新函数this作用域执行的结果，并将传入的参数作为前N个参数；
Function.prototype.myBind = function(thisArg){
    if(typeof this !== 'function'){
        return;
    }
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var mybind = function (){
        var _this = this instanceof self ? this : thisArg;
        return self.apply(_this, args.concat(Array.prototype.slice.call(arguments)));
    };
    mybind.prototype = this.prototype;
    return mybind;
};
function foo(name, other) {
    this.name = name;
    this.other = other;
}
var obj = {
    b: 2
};

var bar = foo.myBind(obj);
bar('Jack', 'ooo');
// console.log(obj.name,obj.other,obj);  // Jack

var alice = new bar('Alice');
console.log(obj.name);  // Jack
console.log(alice.name,alice);    // Alice