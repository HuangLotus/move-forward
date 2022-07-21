// 输入两个链表，找出它们的第一个公共结点。
// 首先要理解什么是公共节点，并不是两个节点的值相同就是公共节点。
// 而是在第一链表和第二链表中都存在一个节点，该节点往后的子链表在两个链表中是相同的。
function FindFirstCommonNode(pHead1, pHead2) {
  if (!pHead1 || !pHead2) { return null; }
  // 获取链表长度
  let length1 = getLength(pHead1);
  let length2 = getLength(pHead2);
  // 长链表先行
  let lang, short, interval;
  if (length1 > length2) {
    lang = pHead1;
    short = pHead2;
    interval = length1 - length2;
  } else {
    lang = pHead2;
    short = pHead1;
    interval = length2 - length1;
  }
  while (interval--) {
    lang = lang.next;
  }
  // 找相同节点
  while (lang) {
    if (lang === short) {
      return lang;
    }
    lang = lang.next;
    short = short.next;
  }
  return null;
}

function getLength(head) {
  let current = head;
  let result = 0;
  while (current) {
    result++;
    current = current.next;
  }
  return result;
}