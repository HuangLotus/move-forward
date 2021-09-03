// 遍历链表,将链表各节点添加至哈希表中,添加前判断此节点是否已存在哈希表中,存在的话说明链表中存在环. 遍历链表,
// 每访问一个新节点,使其visited为1,每次访问节点前先判断其visited是否为1,为1则是已访问过的节点,说明链表中存在环.

// 第二种方法: 给节点添加visited访问标记 (时间复杂度O(n)), 不需要额外的空间

function linkHasLoop(list) {
  let map = new Map()
  while (list) {
    if (map.has(list)) {
      console.log('存在环')
      break
    }
    map.set(list, true)
    list = list.next
  }
}

function hasLoop(list) {
  while(list) {
    if (list.visited) {
      console.log('存在环')
      break
    }
    list.visited = true
    list = list.next
  }
}