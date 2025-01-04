// 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。

// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let slow = 2;
    for(let fast = 2, len = nums.length; fast < len; fast++){
        if(nums[fast] !== nums[slow -2]) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    return slow;
};