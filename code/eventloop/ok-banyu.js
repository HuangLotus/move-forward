/**
 * 事件循环示例：Promise 链与 setTimeout 的嵌套执行
 * 
 * 执行顺序分析：
 * 1. 同步代码：1, 4, 8
 * 2. 微任务队列：5, 7 (Promise 链)
 * 3. 宏任务队列：2 (setTimeout)
 * 4. 微任务队列：3 (setTimeout 内的 Promise.then)
 * 5. 宏任务队列：6 (setTimeout 在 then 中)
 * 
 * 预期输出：1, 4, 8, 5, 7, 2, 3, 6
 */

console.log(1);

setTimeout(() => {
    console.log(2);
    // Promise.resolve().then 是微任务
    Promise.resolve().then(() => {
        console.log(3);
    });
}, 0);

new Promise((resolve) => {
    resolve();
    console.log(4);
}).then(() => {
    console.log(5);
    setTimeout(() => {
        console.log(6);
    }, 0);
}).then(() => {
    console.log(7);
});

console.log(8);
