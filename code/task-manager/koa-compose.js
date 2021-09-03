function compose(list){
  let next = function (){
     if (list.length === 0) {
        return
     }
     let fn = list.shift()
     fn(next)
  }
  next()
}

const list = [
function (next) {
  console.log('before', 1);
  next();
  console.log('after', 1);
},
function (next) {
  console.log('before', 2);
  next();
  console.log('after', 2);
},
function (next) {
  console.log('before', 3);
  next();
  console.log('after', 3);
}
]
compose(list);
// before 1 2 3, after 3 2 1 