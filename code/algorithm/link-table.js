
//双指针.两个链表的第一个公共节点
var getIntersectionNode = function(headA, headB) {
  let node1 = headA, node2 = headB;
  while(node1 != node2) {
      node1 = node1 !== null ? node1.next : headB;
      node2 = node2 !== null ? node2.next : headA;
  }
  return node1;  //这里写node2结果也一样
}

//hash map法
var getIntersectionNode2 = function(headA, headB) {
  let map = new Map();
  while(headA) {
    map.set(headA, true);
    headA = headA.next;
  }
  while(headB) {
    if(map.has(headB)) { //找到了第一个公共结点
      return headB;
    }
    headB = headB.next;
  }
  return null;
}