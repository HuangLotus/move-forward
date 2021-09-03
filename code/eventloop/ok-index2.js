console.log("游戏开始",1);
new Promise( (resolve) => {
   console.log("promise",2);
   resolve();
})
.then( () => {
   console.log("then",3);
});
console.log("promise结束",4);
setTimeout( () => {
   console.log("setTimeout",5);
   new Promise( (resolve) => {
       console.log("promise",6);
       resolve();
   })
   .then( () => {
       console.log("then",7);
   });
},0);
new Promise( (resolve) => {
   console.log(8);
   resolve()
})
.then( () => {
   console.log(9)
   setTimeout( () => {
       console.log("setTimeout",10);
   },0);
})
console.log("游戏结束",11);