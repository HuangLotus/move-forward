import {h,render,patch} from './vdom'
// h方法就是将根据dom的属性 类型 孩子 产生一个虚拟dom

// 对常见的dom操作做优化 
// 1. 前后，追加
// 2. 正序和倒序 
let oldVnode = h('ul',{},
     h('li',{style:{background:'red'},key:'A'},'A'),
     h('li',{style:{background:'yellow'},key:'B'},'B'),
     h('li',{style:{background:'blue'},key:'C'},'C'),
     h('li',{style:{background:'green'},key:'D'},'D'),
);


// render
// 将虚拟节点转化成真实的dom节点 最后插入到app元素中
render(oldVnode,app);// oldVnode.domElement


let newVnode = h('ul',{},
     h('li',{style:{background:'red'},key:'C'},'C'),
     h('li',{style:{background:'blue'},key:'D'},'D'),
     h('li',{style:{background:'yellow'},key:'A'},'A'),
     h('li',{style:{background:'purple'},key:'E'},'E'),
     h('li',{style:{background:'pink'},key:'F'},'F'),
);

console.log('oldVnode',oldVnode, newVnode);

setTimeout(() => { // 虚拟dom之后 不需要手动操作dom
     patch(oldVnode,newVnode);
}, 2000);


// 1.先实现虚拟dom 主要就是一个对象 来描述dom节点

/**
 * 
 * <div id="wrapper" a=1>
 *      <span style="color:red">hello</span>
 *      world
 * <div>
 * 
 */
// {
//     type:'div',
//     key: 'xxx',
//     props:{id:'wrapper',a:1},
//     children:[
//         {type:'span',props:{style:{color:'red'},children:[{}]},
//         {type:'',props:'',children:[],text:'world'}
//     ]
// }