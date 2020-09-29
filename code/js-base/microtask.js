// 首先在 macrotask 的队列中取出第一个任务，执行完毕后取出 microtask 队列中的所有任务顺序执行；
// 之后再取 macrotask 任务，循环往复，直至两个队列的任务都取完。
console.log('1');
setTimeout(function() {
    console.log('2');
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    //微事件2
    console.log('8')
})
setTimeout(function() {
    console.log('9');
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})


// 1 7 8 2 4 5 9 11 12