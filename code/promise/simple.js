
// 手写一个promise
// 用法：
// var promise = new Promise((resolve, reject) => {
//     if(操作成功){
//         resolve(value);
//     }else {
//         reject(error);
//     }
// });
// promise.then(function(value){
//     // success
// }, function(value){
//     // error
// });

// 两个函数
function myPromise(fn){
    let self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;

    self.onResolvedCallback = [];
    self.onRejecteCallback = [];
    function resolve(value){
        if (self.status === 'pending'){
            self.value = value;
            self.status = 'fulfilled';
            self.onResolvedCallback.forEach(fn => fn(self.value));
        }
    }

    function reject(reason){
        if(self.status === 'pending'){
            self.value = reason;
            self.status = 'rejected';
            self.onRejecteCallback.forEach(fn => fn(self.reason));
        }
    }

    try {
        fn(resolve, reject);
    }catch(e){
        reject(e);
    }
}
myPromise.prototype.then = function(onFullfilled, onRejected){
    let self = this;
    switch(self.status){
        case 'fulfilled': 
            onFullfilled(self.value); break;
        case 'rejected': 
            onRejected(self.reason); break;
        case 'pending': 
            self.onResolvedCallback.push(function(){
                onFullfilled(self.value);
            });
            self.onRejecteCallback.push(function(){
                onRejected(self.reason);
            });
            break;
    }
}
var p = new myPromise(function(resolve, reject){
    setTimeout(function(){
        resolve(100);
    }, 1000);
});
p.then(function(val){
    console.log('myPromise resolve',val);
}, function(r){
    console.log('reject',r)
})


// 实现promise all
Promise.all = function (list){
	return new Promise((resolve, reject) => {
		let resultList = [];
		let counter = 0;
		list.forEach((item, index) => {
			item.then(res => {
				resultList[index] = res;
				if(++counter === list.length){
					resolve(resultList);
				}
			}, rej => {
				reject({rej: rej, index: index});
			})
		});
	});
}