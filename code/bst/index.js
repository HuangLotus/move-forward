

// 二叉查找树（又叫做二叉搜索树或二叉排序树）
// 每个节点最多有两个子节点
// 每个节点均大于其左子树上任意一个节点的值
// 每个节点均小于其右子树上任意一个节点的值

// 结论：
// 二叉查找树的最小节点要从顶端开始，往其左下的末端寻找
// 二叉查找树的最大节点要从顶端开始，往其右下的末端寻找
// 添加，删除，查找
// 前序遍历 (根左右)
// 中序遍历 (左根右)
// 后序遍历 (左右根)
// 可以把二叉查找树当作是二分查找算法思想的树形结构体现。
// 二分查找是一种在数组（排好序）中查找数据的算法
function Node(data,left,right) {
    this.left = left;
    this.right = right;
    this.data = data;
    this.show = () => {return this.data}
}
function insert(data) {
    var node = new Node(data,null,null);
    if(this.root === null) {
        this.root = node
    } else {
        var current = this.root;
        var parent;
        while(true) {
            parent = current;
            if(data < current.data) {
                current = current.left; //到左子树
                if(current === null) {  //如果左子树为空，说明可以将node插入在这里
                    parent.left = node;
                    break;  //跳出while循环
                }
            } else {
                current = current.right;
                if(current === null) {
                    parent.right = node;
                    break;
                }
            }
        }
    }
}
function BST() {
    this.root = null //初始化,root为null
    this.insert = insert;
}
var bst = new BST();
bst.insert(10);
bst.insert(8);
bst.insert(2);
bst.insert(7);
bst.insert(5);

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

//最小值
function getMin(bst) {
    var current = bst.root;
    while(current.left !== null) {
        current = current.left;
    }
    console.log('min', current.data);
    return current.data;
}

//最大值
function getMax(bst) {
    var current = bst.root;
    while(current.right !== null) {
        current = current.right;
    }
    console.log('max', current.data);
    return current.data;
}

function find(target,bst) {
    var current = bst.root;
    while(current !== null) {
        if(target === current.data) {
            return true;
        } else if(target > current.data) {
            current = current.right;
        } else if(target < current.data) {
            current = current.left;
        }
    }
    return -1;
}

//在刚才已有bst的基础上执行命令
// inOrder(bst.root);
// getMax(bst);
// getMin(bst);
// console.log('find',find(8, bst));

// 构建BST，具备一个根节点、以及添加、查找、删除节点的方法
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    // 插入节点的方法
    insert(data) {
        let n = new Node(data, null, null);
        if (!this.root) { //如果此二叉树为空，则数据项从树的root节点处开始插入
            return this.root = n;
        }
        let currentNode = this.root;
        let parent = null;
        while (true) {
            parent = currentNode; //保存当current变为null之前的那一个父节点
            if (data < currentNode.data) { //插在父节点的左节点
                currentNode = currentNode.left;
                if (currentNode === null) { //不断向左node寻找是否为null
                    parent.left = n;
                    break;
                }
            } else { //插在父节点的右节点
                currentNode = currentNode.right;
                if (currentNode === null) {
                    parent.right = n;
                    break;
                }
            }
        }
    }
    // 删除数据项
    remove(data) {
        this.root = this.removeNode(this.root, data);
    }
    // 删除节点
    // 删除树中与给定值相同的节点，如果树中没有相同值的节点，则不做处理，应该保证处理之后的树仍是二叉查找树。
    removeNode(node, data) {
        if (node === null) { // 如果根节点为空
            return null;
        }
        if (data === node.data) {
            // 没有子节点，即node为叶子节点
            if (node.left === null && node.right === null) {
                return null;
            }
            // 要删除的节点下只有右节点
            if (node.left === null) {
                return node.right;
            }
            // 要删除的节点下只有左节点
            if (node.right === null) {
                return node.left;
            }
            // 要删除的节点下有两个子节点的情况
            // getSmallest用于找到该节点右子树中的最小节点，用以替代要删除的节点，然后删除此最小节点
            let getSmallest = function (node) {
                if (node.left === null && node.right === null) {
                    return node;
                }
                if (node.left !== null) {
                    return node.left;
                }
                if (node.right !== null) {
                    return getSmallest(node.right);
                }
            }
            let temNode = getSmallest(node.right);
            node.data = temNode.data;
            node.right = this.removeNode(temNode.right, temNode.data);
            return node;
        } else if (data < node.data) {
            node.left = this.removeNode(node.left, data);
            return node;
        } else {
            node.right = this.removeNode(node.right, data);
            return node;
        }
    }
    // 查找方法
    find(data) {
        let currentNode = this.root;
        while (currentNode !== null) {
            if (data === currentNode.data) {
                return true;
            }
            if (data < currentNode.data) {
                if (currentNode.left !== null) {
                    currentNode = currentNode.left;
                } else {
                    return false;
                }
            } else {// data > currentNode.data
                if (currentNode.right !== null) {
                    currentNode = currentNode.right;
                } else {
                    return false;
                }
            }
        }
    }
}

