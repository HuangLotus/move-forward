// 单向链表，查找链表指针倒数第N个节点
// 节点
function Node(elem){
  this.elem = elem; // 当前节点的元素
  this.next = null; // 下一个节点的链接 
}
class LinkedList {
  constructor(){
    this.head = new Node('head');
  }

  find(item){
    var currNode = this.head;
    while(currNode.elem != item){
      currNode = currNode.next;
    }
    return currNode;
  }
  insert(newElem, item){
    var newNode = new Node(newElem);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
  }
  findPrev(item){
    var currNode = this.head;
    while(currNode.next !== null && currNode.next.elem != item){
      currNode = currNode.next;
    }
    return currNode;
  }
  remove(item){
    let preNode = this.findPrev(item);
    if(preNode.next !=null){
      preNode.next = preNode.next.next;
    }
  }
  findDaoShuNNode(num){
    var currNode = this.head;
    var firstIndex = 0;
    var targetNode = null;
    while(currNode!=null){
      if(firstIndex >= num && currNode.next !=null){
        targetNode = currNode;
      }
      currNode = currNode.next;
      firstIndex ++;
    }
    return targetNode.elem;
  }
  display(){
    var currNode = this.head;
    while(currNode && currNode.next){
      console.log(currNode,'--',currNode.next.elem);
      currNode = currNode.next;
    }
  }
}
var fruits = new LinkedList();

fruits.insert('Apple' , 'head');
fruits.insert('Banana' , 'Apple');
fruits.insert('Pear' , 'Banana');
fruits.insert('fengli', 'Pear');


console.log(fruits.display()); 
console.log(fruits.findDaoShuNNode(2) );    


