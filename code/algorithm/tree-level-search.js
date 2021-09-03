function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function binaryTreePrint(root) {
  if (!root || !root.val) {
    console.log('not tree')
    return
  }
  let resultArr = []
  let result = [root]
  let temp = []
  while(result.length) {
    const len = result.length
    // 记住每一层的元素个数，然后只输出这一层的个数
    for(let i = 0; i<len; i++) {
      let node = result.shift()
      temp.push(node.val)
      node.left && result.push(node.left)
      node.right && result.push(node.right)
    }
    resultArr.push(temp)
    temp = []
  }
  console.log(resultArr)
}
// [
//   [3],
//   [9, 20],
//   [8, 12, 15, 7]
// ]
const root = {
	val: 3,
	left: {
		val: 9,
		left: {
			val: 8,
		},
		right: {
			val: 12
		}
	},
	right: {
		val: 20,
		left: {
			val: 15,
		},
		right: {
			val: 7
		}
	}
};
binaryTreePrint(root)
// 层序遍历
// 3
// 	   /  \
// 	  9   20
// 	 /\   / \
// 	8 12 15  7   
// [
//   [3],
//   [9, 20],
//   [8, 12, 15, 7]
// ]
