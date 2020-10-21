var pubSub = {
  subscribers: {
    any: []
  },
  on(evtType = 'any',fn){
    if(typeof this.subscribers[evtType] === 'undefined'){
      this.subscribers[evtType] = [];
    }
    this.subscribers[evtType].push(fn);
  },
  off(evtType = 'any', fn){
    this.subscribers[evtType] = this.subscribers[evtType].filter(item =>item != fn);
  },
  emit(evtType = 'any'){
    this.subscribers[evtType].forEach(item => {
      item(...Array.prototype.slice.call(arguments, 1));
    });
  }
};

pubSub.on('holiday', ()=>{
  console.log(1);
})
pubSub.on('holiday2', ()=>{
  console.log(2);
})
let handler = ()=>{
  console.log(3);
};
pubSub.on('holiday3', handler)
pubSub.emit('holiday3')
pubSub.emit('holiday2')
pubSub.off('holiday3',handler);
pubSub.emit('holiday3')