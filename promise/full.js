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
// myPromise.prototype.then = function(onFullfilled, onRejected){
//     let self = this;
//     switch(self.status){
//         case 'fulfilled': 
//             onFullfilled(self.value); break;
//         case 'rejected': 
//             onRejected(self.reason); break;
//         case 'pending': 
//             self.onResolvedCallback.push(function(){
//                 onFullfilled(self.value);
//             });
//             self.onRejecteCallback.push(function(){
//                 onRejected(self.reason);
//             });
//             break;
//     }
// }

function resolvePromise(promise2, x, resolve, reject){
    if (promise2 === x){
        return reject(new TypeError('Chaining cycle'));
    }

    let called;
    if (x!== null && (typeof x === 'object' || typeof x === 'function' )){
        try {
            let then = x.then;
            if (typeof then === 'function'){
                then.call(x, y => {
                    if(called) return; // 防止多次调用
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if(called) return; // 防止多次调用
                    called = true;
                    reject(err);
                });
            } else {
                resolve(x)
            }
        } catch(e) {
            if(called) return; // 防止多次调用
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

myPromise.prototype.then = function(onFullfilled, onRejected){
    let self = this;
    let promise2 = new myPromise((resolve, reject) => {
        if (self.status === 'resolved'){
            try {
                let x = onFullfilled(self.value);
                resolvePromise(promise2, x, resolve, reject);
            } catch {
                reject(e);
            }
        }

        if(self.status === 'rejected'){
            try {
                let x = onRejected(self.reason);
                resolvePromise(promise2, x, resolve, reject);
            } catch {
                reject(e);
            }
        }

        if(self.status === 'pending'){
            this.onResolvedCallback.push(() => {
                try {
                    let x = onFullfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject); 
                } catch {
                    reject(e);
                }
            });

            this.onRejectedCallback.push(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch {
                    reject(e);
                }
            });
        }

    });
    return promise2;
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
}).then(function(v){
    console.log('v2')
}, function(r){
    console.log('r2');
})