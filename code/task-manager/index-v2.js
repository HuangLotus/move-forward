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
            this.count++;
            p().then(data => {
                // console.log('then',data)
                result(data);
                this.count--;
                this.execTask();
                // console.log('inner',data,this.count, this.taskList)
            });
        } else {
            this.taskList.push(p);
        }
        // console.log('hfr taskList',this.taskList.length)
        return promise;
    }
    execTask() {
        // console.log('hfr execTask',this.count, this.taskList.length)
        if (this.taskList.length > 0 && this.count < 3){
            // console.log('execTask',this.taskList,this.count)
            this.addTask(this.taskList.shift());
        }
    }
}

let tm = new TaskManager();
const timeout = (time) => new Promise(resolve => {
    setTimeout(() => resolve(time), time)
  })
tm.addTask(() => timeout(100)).then(data => {
    console.log('result1',data);
});
tm.addTask(() => timeout(200)).then(data => {
    console.log('result2',data);
});
tm.addTask(() => timeout(300)).then(data => {
    console.log('result3',data);
});
tm.addTask(() => timeout(400)).then(data => {
    console.log('result4',data);
});

tm.addTask(() => timeout(500)).then(data => {
    console.log('result5',data);
});
// 存在问题，4,5没执行