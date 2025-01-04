// 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。

// 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let currentIndex = 0;
    while(currentIndex < nums.length - 1) {
        currentIndex += nums[currentIndex];
        if (nums[currentIndex] === 0 || currentIndex > nums.length - 1) {
            break;
        }
    }
    console.log('currentIndex', currentIndex)
    if (currentIndex >= nums.length -1) {
        return true;
    }
    return false;
};
// [2, 3, 1, 1, 4] -> true