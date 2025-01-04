// 给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。

// 图中的每个节点都包含它的值 val（int） 和其邻居的列表（list[Node]）。

// class Node {
//     public int val;
//     public List<Node> neighbors;
// }
 
const visited = new Map();
var cloneGraph = function(node) {
    if(node == null){
        return node;
    }
    if (visited.get(node)) {
        return visited.get(node);
    }
    const newNode = new Node(node.val, []);
    visited.set(node, newNode);

    for(let i = 0, len = newNode.neighbors.length; i<len; i++) {
        newNode.neighbors[i].push(cloneGraph(node.neighbors[i]));
    }
    return newNode;
};