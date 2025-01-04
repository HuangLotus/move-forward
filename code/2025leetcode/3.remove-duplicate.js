// 给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，
// 返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let fast = 1;
    let slow = 1;
    for(let fast = 1, len = nums.length; fast<len; fast++){
        if (nums[fast] != nums[fast-1]) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    return slow
};