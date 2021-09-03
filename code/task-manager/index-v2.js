// 异步任务管理器，同时只能执行3个任务
class TaskManager {
    constructor(){
        this.count = 0;
        this.taskList = [];
    }
    addTask(p) {
        let result = null;
        let promise = new Promise((resolve, reject) => {
            result = resolve;
        });
    
        if (this.count < 3){
            this.count ++;
            p().then(data => {
                // console.log('then',data)
                this.count --;
                result(data);
                // console.log('inner',data,this.count, this.taskList)
                this.execTask();
            });
        } else {
            this.taskList.push(p);
        }
        return promise;
    }
    execTask() {
        if (this.taskList.length > 0){
            // console.log('execTask',this.taskList,this.count)
            this.addTask(this.taskList.shift());
        }
    }
}

let tm = new TaskManager();
tm.addTask(() => new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve(1);
    }, 100);
})).then(data => {
    console.log('result1',data);
});
tm.addTask(() => new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve(2);
    }, 100);
})).then(data => {
    console.log('result2',data);
});
tm.addTask(() => new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve(3);
    }, 100);
})).then(data => {
    console.log('result3',data);
});
tm.addTask(() => new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve(4);
    }, 10);
})).then(data => {
    console.log('result4',data);
});

tm.addTask(() => new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve(5);
    }, 120);
})).then(data => {
    console.log('result5',data);
});
// 存在问题，4,5没执行