### 对js模块的深入理解
### 模块循环加载问题
js中有两种模块机制，一种是commonjs,一种是es6方式，那两种有啥区别呢？
尤其是循环引用这种场景会有啥问题？来总结下~

#### CommonJS模块（简称CJS）
CommonJS模块规范使用require语句导入模块，module.exports导出模块。
输出的是值的拷贝，模块导入的也是输出值的拷贝，一旦输出这个值，这个值在模块内部的变化是监听不到的。

#
```js
// a.cjs
module.exports = {}
```
```js
//b.cjs
console.info('start ')
const { keyA} = require('./a.cjs')
console.info('done')
// 输出
// start 
// done
```
以上代码说明：CJS 模块语法不会预先进行语法检测，而是运行源代码，运行到 require 函数被调用时才会去处理子模块的导出.
在 CJS 中， module.exports 和 exports 对象其实是同一个引用，即，不论用户用什么语法来导出属性，最终导出的属性全是挂在了一个对象的引用上，而其他模块引用这个模块时，require 执行之后拿到的其实就是这个引用对象。

#### ES6模块（简称ESM）
ES6模块的规范是使用import语句导入模块，export语句导出模块。
输出的是对值的引用。ES6模块的运行机制和CommonJS不一样，遇到模块加载命令import时不去执行这个模块，只会生成一个动态的只读引用，真正用到这个值时，再到模块中取值，后面原始值变了，输入值也会发生变化。
```js
// export.mjs
const KeyAb= 'KeyAb'
const KeyCb = 'KeyCb'
export default {
  KeyAb,
  KeyCb
}
```
```js
// import.mjs
console.info('start import')
import { KeyCb } from './export.mjs'
console.info('import done')
// 输出
// 报错：SyntaxError: The requested module './export.mjs' does not provide an export named 'KeyCb'
```
以上代码说明：ESM 模块语法在代码执行前就会通过静态语法检测，解析出子模块的具名导出变量和默认导出变量，然后会根据导入语法，在代码真正执行前先进行一次校验，如果引入了错误的变量，会直接抛出错误

### 图表对比说明差异

| 模块 | 导入方式 | 导出方式 | 说明 |
| ---------- | ---------- | ---------- | ------------ |
| CommonJS模块 | require | module.exports | 输出的是值的拷贝，模块导入的也是输出值的拷贝|
| ES6模块 | import | export | 输出的是对值的引用，模块引入的也是值的引用|


[参考官方文档](https://nodejs.org/api/modules.html#modules_cycles)

