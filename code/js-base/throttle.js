// 防抖和节流
// 防抖就是避免频繁触发事件处理器，需要等待一个阈值，如果这个阈值时间范围后，
// 没有下一个事件触发，就执行这个事件，否则就上一个等待作废，重新等待指定时间。
function debounce(func, time){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(function(){
            func.call(this, ...args);
        }, time);
    };
}

// 节流就是设置一个时间，这个时间之内事件处理器只会执行一次
// 节流性能比防抖更优
function throttle(func, time){
    let lock = false;
    return function(...args){
        if (lock) return;
        lock = true;
        setTimeout(_ => {
            lock = false;
        }, time);
        func.call(this, ...args);
    };
}
