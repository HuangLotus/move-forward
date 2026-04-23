/**
 * 事件循环示例：async/await 与 Promise、setTimeout 的执行顺序
 * 
 * 执行顺序分析：
 * 1. 同步代码：4, 1, 3, 6, 8
 * 2. 微任务队列：7 (Promise.then)
 * 3. 微任务队列：2 (async1 中 await 后的代码)
 * 4. 宏任务队列：5 (setTimeout)
 * 
 * 预期输出：4, 1, 3, 6, 8, 7, 2, 5
 */

async function async1() {
    console.log('1');
    await async2();
    console.log('2');
}

async function async2() {
    console.log('3');
}

console.log('4');

setTimeout(function () {
    console.log('5');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('6');
    resolve();
}).then(function () {
    console.log('7');
});

console.log('8');
