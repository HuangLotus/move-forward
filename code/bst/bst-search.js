// 找出二叉树中某两个节点的第一个共同祖先，
// 不得将其他的节点存储在另外的数据结构中
// root = [3,5,1,6,2,0,8,null,null,7,4], p = 5 ,q = 1;
// 输出 3

function findAncestor(root, p, q){
  //当前节点为p或q或null时，直接把当前节点返回
  if (root == p || root == q || root == null) {
    console.log('find it ,', root)
    return root;
}

//left的值可能为p或q中的一个，也可能是p和q的最近共同祖先
 left = findAncestor(root.left, p, q);

//right的值可能为p或q中的一个，也可能是p和q的最近共同祖先
 right = findAncestor(root.right, p, q);

//如果当前节点的左子树和右子树都存在p或q中的一个，说明当前节点就是p和q的最近共同祖先
if (left != null && right != null) {
  console.log('find it ,', root)
    return root;
}

//返回值left或right的含义可能是从某一支逐层返回的最近共同祖先，也可能是找到的单个节点p或节点q
return left == null ? right : left;
}
rt = [3,5,1,6,2,0,8,null,null,7,4], p = 5 ,q = 1;
findAncestor(rt, p, q);