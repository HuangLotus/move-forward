// 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let map = new Map();
    for(let i =0, len = nums.length; i<len; i++){
        let count = map.get(nums[i]) || 0;
        count++;
        map.set(nums[i], count);
    }
    let max = 0;
    let maxValue = null;
    map.forEach((value, key) => {
        if (value > max) {
            maxValue = key;
            max = value;
        }
    })
    return maxValue;
};
// 输入：nums = [3,2,3]
// 输出：3