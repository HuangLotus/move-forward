/**
 * 事件循环示例：游戏流程模拟，多任务交织执行
 * 
 * 执行顺序分析：
 * 1. 同步代码：游戏开始 1, promise 2, promise 结束 4, 8, 游戏结束 11
 * 2. 微任务队列：then 3, 9 (Promise.then)
 * 3. 宏任务队列：setTimeout 5
 * 4. 同步代码 (timer 内): promise 6
 * 5. 微任务队列：then 7 (timer 内 Promise.then)
 * 6. 宏任务队列：setTimeout 10 (then 中的 setTimeout)
 * 
 * 预期输出：游戏开始 1, promise 2, promise 结束 4, 8, 游戏结束 11, then 3, 9, setTimeout 5, promise 6, then 7, setTimeout 10
 */

console.log("游戏开始", 1);

new Promise((resolve) => {
    console.log("promise", 2);
    resolve();
})
    .then(() => {
        console.log("then", 3);
    });

console.log("promise 结束", 4);

setTimeout(() => {
    console.log("setTimeout", 5);
    new Promise((resolve) => {
        console.log("promise", 6);
        resolve();
    })
        .then(() => {
            console.log("then", 7);
        });
}, 0);

new Promise((resolve) => {
    console.log(8);
    resolve();
})
    .then(() => {
        console.log(9);
        setTimeout(() => {
            console.log("setTimeout", 10);
        }, 0);
    });

console.log("游戏结束", 11);
