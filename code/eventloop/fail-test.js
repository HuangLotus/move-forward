/**
 * Node.js 事件循环示例：process.nextTick 与 Promise、setTimeout 的执行顺序
 * 
 * 注意：Node.js 的事件循环与浏览器略有不同，process.nextTick 优先级高于 Promise
 * 
 * 执行顺序分析：
 * 1. 同步代码：1, 6, 7, 8
 * 2. process.nextTick 队列：6
 * 3. Promise 微任务：8
 * 4. 宏任务 (setTimeout 1): 2, 4
 * 5. process.nextTick (timer 内): 3
 * 6. Promise 微任务 (timer 内): 5
 * 7. 宏任务 (setTimeout 2): 9, 11
 * 8. process.nextTick (timer2 内): 10
 * 9. Promise 微任务 (timer2 内): 12
 * 
 * 预期输出：1, 6, 7, 8, 2, 4, 3, 5, 9, 11, 10, 12
 */

console.log('1');

setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
        console.log('3');
    });
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5');
    });
}, 0);

process.nextTick(function () {
    console.log('6');
});

new Promise(function (resolve) {
    console.log('7');
    resolve();
}).then(function () {
    console.log('8');
});

setTimeout(function () {
    console.log('9');
    process.nextTick(function () {
        console.log('10');
    });
    new Promise(function (resolve) {
        console.log('11');
        resolve();
    }).then(function () {
        console.log('12');
    });
}, 0);
