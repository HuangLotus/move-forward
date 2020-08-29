// call和bind的优先级判断及证明
function foo(){
    console.log('foo', this);
  }
  let newobj = foo.bind({a: 1});
  newobj();
  newobj.call({a: 2});