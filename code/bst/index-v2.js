// 二叉树，具备添加节点，删除节点，查找节点, 遍历输出节点的功能
// 查找，删除，添加性能比较好
class Node {
    constructor(data,left,right){
      this.left = left;
      this.right = right;
      this.data = data;
    }
    
    show(){
      return this.data
    }
  }
  
  class BST {
    constructor(){
      this.root = null;
    }
    insert(data){
      let node = new Node(data, null, null);
      if (!this.root) {
        this.root = node;
        return;
      }
  
      let current = this.root;
      let parent;
      while(true){
        parent = current;
        if (data < current.data) {
          current = current.left;
          if (current === null){
            parent.left = node;
            break;
          } 
        } else {
          current = current.right;
          if (current === null){
            parent.right = node;
            break;
          }
        }
      }
    }
    find(data){
      let current = this.root;
      while (current !== null){
        if (current.data === data){
          return 'find it';
        } else if (current.data > data){
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return 'not find it';
    }
    delete(data){
      this.root = this.deleteNode(this.root, data)
    }
    deleteNode(node, data){
      if (node === null){ // 如果根节点为空
        return null;
      }
      if (node.data === data){
        // 没有子节点，直接删除
        if (node.left === null && node.right === null){
          return null;
        }
        // 有左子节点
        if (node.right !== null){
          return node.right;
        }
        // 有右子节点
        if (node.left !== null){
          return node.left;
        }
        // 左右子节点都有
        // 要删除的节点下有两个子节点的情况
        // getSmallest用于找到该节点右子树中的最小节点，用以替代要删除的节点，然后删除此最小节点
        let getSmallest = function (node) {
          if (node.left === null && node.right === null) {
            return node;
          }
          // 左节点是小的节点，所以如果发现有不为空的，就说明找到了最小节点
          if (node.left !== null) {
            return node.left;
          }
          if (node.right !== null) {
            return getSmallest(node.right); // 递归遍历右节点
          }
        }
  
        let tempNode = getSmallest(node.right);
        node.data = tempNode.data;
  
        // 这里的理解有点复杂：将右子树中的最小节点删除后，需要重写右子树，所以要再次删除这个最小节点
        node.right = this.deleteNode(tempNode, tempNode.data);
      } else if (node.data > data){
        node.left = this.deleteNode(node.left, data);
      } else {
        node.right = this.deleteNode(node.right, data);
      }
      return node;
    }
    getMin(){
      let current = this.root;
      while(current.left !== null){
        current = current.left;
      }
      return current.data;
    }
    getMax(){
      let current = this.root;
      while(current.right !== null){
        current = current.right;
      }
      return current.data;
    }
  }
  
  // 中序遍历
  function inOrder(node) {
    if(node !== null) {
        //如果不是null，就一直查找左变，因此递归
        inOrder(node.left);
        //递归结束，打印当前值
        console.log(node.show());
        //上一次递归已经把左边搞完了，右边
        inOrder(node.right);
    }
  }
  // 前序遍历
  function preOrder(node) {
    if(node !== null) {
        //根左右
        console.log('前序遍历',node.show());
        preOrder(node.left);
        preOrder(node.right);
    }
  }
  // 后序遍历
  function postOrder(node) {
    if(node !== null) {
        //左右根
        postOrder(node.left);
        postOrder(node.right);
        console.log('后序遍历',node.show())
    }
  }
  
  // 求二叉树中的节点个数
  function sizeOfNode(root){
    if(!root) {return 0}
    return 1 + sizeOfNode(root.left) + sizeOfNode(root.right);
  }
  
  // 求二叉树的高度
  function heightOfTree(root){
    if(!root) return 0;
    return Math.max(heightOfTree(root.left), heightOfTree(root.right)) + 1;
  }
  
  // 分层遍历（广度优先）
  // 深度优先遍历使用栈，广度优先则使用队列
  function BFS(root){
    let queue=[];
    queue.push(root);
    while(queue.length>0){
      let current=queue.shift();
      console.log(current.data);
      if(current.left){queue.push(current.left)}
      if(current.right){queue.push(current.right)}
    }
  }
  
  // 求二叉树第K层的节点个数
  // 原理是二叉树的第K层的节点个数等于二叉树左子树第K-1层节点个数加上二叉树右子树第K-1层节点个数
  function NumOfKthLevel(root, k) {
    if (k < 0) {return 0}
    if (root === null) {return 0}
    if (root !== null && k === 1) {return 1}
    return NumOfKthLevel(root.left, k - 1) + NumOfKthLevel(root.right, k - 1)
  }
  
  // 求二叉树中叶子节点的个数
  function numOfLeaf(root){
    if(!root) return 0;
    if(!root.left && !root.right) return 1;
    return numOfLeaf(root.left) + numOfLeaf(root.right);
  }
  
  // 判断两棵二叉树是否结构相同
  function compareStruct(r1, r2){
    if (r1 === null && r2 === null){return true;}
    if( (r1 !== null && r2 === null) || (r1 === null && r2 !== null)) return false;
    return (compareStruct(r1.left,r2.left) && compareStruct(r1.right,r2.right));
  }
  
  //判断二叉树是不是平衡二叉树
  function isBalanced(root){
    if (root === null) return true;
    if(Math.abs(heightOfTree(root.left) - heightOfTree(root.right)) > 1) return false;
    return (isBalanced(root.left) && isBalanced(root.right));
  }
  // 求二叉树的镜像（翻转二叉树）
  function invertTree(root) {
    if (!root) {
      return null
    }
    let right = root.right;
    root.right = root.left;
    root.left = right;
    invertTree(root.left);
    invertTree(root.right);
    return root
  }
  
  // 判断二叉树是不是完全二叉树
  function isComplete(root){
  const queue = [];
    queue.push(root);
    while (queue.length > 0) {
      let current = queue.shift();
      if (current) {
        queue.push(current.left);
        queue.push(current.right);
      } else {
        while (queue.length > 0) {
          if (queue.shift()) {
            return false;
          }
        }
      }
    }
    return true;
  }
  
  
  let bst = new BST();
  bst.insert(3);
  bst.insert(4);
  bst.insert(7);
  bst.insert(10);
  bst.insert(1);
  bst.insert(5);
  bst.insert(19);
  bst.insert(40);
  bst.insert(59);
  // console.log('bst',
  //   bst.getMax(),
  //   bst.getMin(),
  //   bst.find(40),
  //   '---',
  //   bst.delete(48),
  //   '---',
  //   bst.find(40)
  // )
  inOrder(bst.root);
  // 1
  // 3
  // 4
  // 5
  // 7
  // 10
  // 19
  // 40
  // 59
  console.log(sizeOfNode(bst.root));
  console.log(heightOfTree(bst.root));
  BFS(bst.root)
  console.log(NumOfKthLevel(bst.root, 6))
  console.log(numOfLeaf(bst.root))
  console.log(isBalanced(bst.root))
  console.log(invertTree(bst.root))