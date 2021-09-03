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
  // 第一种方法：单链表只有头指针，所以只能从头部开始寻找，先遍历一遍链表，确定链表中节点的个数k。
  // 然后从前往后第k-n+1个节点就是倒数第n个节点。一共遍历2次链表
  // 第二种方法：只遍历一次链表。设置2个指针，当第一个指针从表头向前走到第n-1个节点时，第二个指针开始从表头出发。
  // 当第一个指针走到尾节点时，第二个指针的位置即为倒数第n个节点
  // 双链表：这道题用双指针来实现时。先用first指针前进n，然后让second从head开始和first一起前进，直到first到了末尾，此时second的下一个节点就是要删除的节点。（另外，若first一开始前进n就已经不在链表中了，说明要删除的节点正是head节点，那么直接返回head的下一个节点接口。）
  findDaoShuNNode(num){
    var currNode = this.head;
    var firstIndex = 0;
    let secondCusor = 0;
    while(currNode!=null){
      if(firstIndex === num - 1 && currNode.next != null){
        secondCusor = 0 // 开始查找
      }
      if (firstIndex < num - 1 && currNode.next ===null) {
        currNode = this.head
      }
      currNode = currNode.next;
      firstIndex ++;
      secondCusor ++;
    }
    return currNode.elem;
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


