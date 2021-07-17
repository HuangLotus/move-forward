// 1.为了方便去重，我们首先将数组排序
// 2.对数组进行遍历，取当前遍历的数nums[i]为一个基准数，遍历数后面的数组为寻找数组
// 3.在寻找数组中设定两个起点，最左侧的left(i+1)和最右侧的right(length-1)
// 4.判断nums[i] + nums[left] + nums[right]是否等于0，如果等于0，加入结果，并分别将left和right移动一位
// 5.如果结果大于0，将right向左移动一位，向结果逼近
// 5.如果结果小于0，将left向右移动一位，向结果逼近
// 注意整个过程中要考虑去重

var threeSum = function (nums) {
  const result = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    // 跳过重复数字
    if (i && nums[i] === nums[i - 1]) { continue; }
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum > 0) {
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        result.push([nums[i], nums[left++], nums[right--]]);
        // 跳过重复数字
        while (nums[left] === nums[left - 1]) {
          left++;
        }
        // 跳过重复数字
        while (nums[right] === nums[right + 1]) {
          right--;
        }
      }
    }
  }
  return result;
}
