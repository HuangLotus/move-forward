// 一个任务管理器，并按顺序返回结果
function taskManager(taskList){
    let taskListCopy = taskList.slice();
    let count = 0;
    let result = {};
    let execTask = function (p, index){
        count ++;
        p.then(data => {
            result[index] = data;
            count --;
            if (taskList.length > 0){
                let next = taskList.shift();
                execTask(next, taskListCopy.findIndex(item => item === next ));
            } else {
                console.log('result', result);
            }
        });
    };
    for (let i = 0, len = taskListCopy.length; i<len; i++){
        if (count < 3){
            execTask(taskListCopy[i], i);
            taskList.shift();
        }
    }
    return result;
}
taskManager([new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve(1);
    }, 100);
}), new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve(2);
    }, 100);
}), new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve(3);
    }, 100);
}), new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve(4);
    }, 100);
})]);