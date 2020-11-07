// 1234567890如何转1，234，567，890
// 方法1
//保留三位小数，toLocaleString() 方法可把一个 Number 对象转换为本地格式的字符串。
var num = "123222456.546 ";
console.log(parseFloat(num).toLocaleString());

let str = '15763246546547.35353';
function strSplit(str){
  let arr = str.split('.');

}
strSplit(str);

function format_number(num){
  let str = num.toString(); 
  x = str.split('.');  
  x1 = x[0];  
  x2 = x.length > 1 ? '.' + x[1] : '';  
  let rgx = /(\d+)(\d{3})/;  
  while (rgx.test(x1)) {  
    x1 = x1.replace(rgx, '$1' + ',' + '$2');  
  }  
  return x1 + x2;  
}

console.log(format_number(53669988.000));
console.log(format_number(6698.0023));