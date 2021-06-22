
// 快速排序（算法参考某个元素值，将小于它的值，放到左数组中，大于它的值的元素就放到右数组中，
// 然后递归进行上一次左右数组的操作，返回合并的数组就是已经排好顺序的数组了）
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let midIndex = Math.floor(arr.length / 2);
    let midNum = arr.splice(midIndex, 1)[0];
    let left = [];
    let right = [];
    for(let i = 0; i < arr.length; i++) {
        let cur = arr[i];
        if (cur <= midNum) {
            left.push(cur);
        } else {
            right.push(cur);
        }
    }
    return quickSort(left).concat(midNum, quickSort(right));
}

let arr = [2, 4, 12, 9, 22, 10, 18, 6];
quickSort(arr);
