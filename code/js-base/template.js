
// 一行代码实现一个简单的模板字符串替换
// 实现一个 render(template, context) 方法，将 template 中的占位符用 context 填充
var str = "{{name}}很厉害，才{{age}}岁";
var str2 = "{{name}}很厉name害，才{{age}}岁{{name}}";

var obj = {name: '周杰伦', age: 15};
function fun(str, obj) {
    var arr;
    arr = str.match(/{{[a-zA-Z\d]+}}/g);
    for(var i=0;i<arr.length;i++){
        arr[i] = arr[i].replace(/{{|}}/g,'');
        str = str.replace('{{'+arr[i]+'}}',obj[arr[i]]);
    }
    return str;
}
// console.log(fun(str,obj));
// console.log(fun(str2,obj));

function render(template, context) {
    return template.replace(/\{\{(.*?)\}\}/g, (match, key) => context[key]);
}
const template = "{{name}}很厉害，才{{age}}岁";
const context = { name: "jawil", age: "15" };
console.log(render(template, context));