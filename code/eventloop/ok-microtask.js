/**
 * 事件循环核心规则：
 * 1. 从宏任务 (macrotask) 队列取出一个任务执行
 * 2. 执行完毕后，取出微任务 (microtask) 队列中的所有任务依次执行
 * 3. 重复上述过程，直到两个队列都为空
 * 
 * 注意：Promise.resolve() 和 .then() 都是微任务
 * 
 * 执行顺序分析：
 * 1. 同步代码：1, 7, 8
 * 2. 微任务队列：8 (Promise.then)
 * 3. 宏任务队列：2 (setTimeout 1)
 * 4. 同步代码 (timer1 内): 4
 * 5. 微任务队列：5 (timer1 内 Promise.then)
 * 6. 宏任务队列：9 (setTimeout 2)
 * 7. 同步代码 (timer2 内): 11
 * 8. 微任务队列：12 (timer2 内 Promise.then)
 * 
 * 预期输出：1, 7, 8, 2, 4, 5, 9, 11, 12
 */

console.log('1');

setTimeout(function () {
    console.log('2');
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5');
    });
}, 0);

new Promise(function (resolve) {
    console.log('7');
    resolve();
}).then(function () {
    // 微任务 2
    console.log('8');
});

setTimeout(function () {
    console.log('9');
    new Promise(function (resolve) {
        console.log('11');
        resolve();
    }).then(function () {
        console.log('12');
    });
}, 0);
