// 实现一个bind函数
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
console.log(obj.name,obj.other,obj);  // Jack

var alice = new bar('Alice');
console.log(obj.name);  // Jack
console.log(alice.name);    // Alice