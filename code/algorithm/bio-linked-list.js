// 双向链表
//节点
 function Node(elem) {
  this.elem = elem;   //当前节点的元素
  this.next = null;         //下一个节点链接
  this.previous = null;         //上一个节点链接
}

//链表类
function LList () {
  this.head = new Node( 'head' );
  this.find = find;
  this.findLast = findLast;
  this.insert = insert;
  this.remove = remove;
  this.display = display;
  this.dispReverse = dispReverse;
}

//查找元素
function find ( item ) {
  var currNode = this.head;
  while ( currNode.elem != item ){
      currNode = currNode.next;
  }
  return currNode;
}

//查找链表中的最后一个元素
function findLast () {
  var currNode = this.head;
  while ( !( currNode.next == null )){
      currNode = currNode.next;
  }
  return currNode;
}


//插入节点
function insert ( newelem , item ) {
  var newNode = new Node( newelem );
  var currNode = this.find( item );
  newNode.next = currNode.next;
  newNode.previous = currNode;
  currNode.next = newNode;
}

//显示链表元素
function display () {
  var currNode = this.head;
  while ( !(currNode.next == null) ){
      console.debug( currNode.next.elem );
      currNode = currNode.next;
  }
}

//反向显示链表元素
function dispReverse () {
  var currNode = this.findLast();
  while ( !( currNode.previous == null )){
      console.log( currNode.elem );
      currNode = currNode.previous;
  }
}

//删除节点
function remove ( item ) {
  var currNode = this.find ( item );
  if( !( currNode.next == null ) ){
      currNode.previous.next = currNode.next;
      currNode.next.previous = currNode.previous;
      currNode.next = null;
      currNode.previous = null;
  }
}

var fruits = new LList();

fruits.insert('Apple' , 'head');
fruits.insert('Banana' , 'Apple');
fruits.insert('Pear' , 'Banana');
fruits.insert('Grape' , 'Pear');

console.log( fruits.display() ); 
                                      
console.log( fruits.dispReverse() );  
// 参考：https://www.jianshu.com/p/f254ec665e57