// 求一个数组的全排列
class Permutation {
  constructor(arr) {
      this.arr = Array.from(arr);
      this.result = [];
      this.len = 0;
      this.run(0);
  }

  run(index) {
    if (this.arr.length === 0) {
      return
    }
    if (index == this.arr.length - 1) {
      this.result.push(Array.from(this.arr));
      this.len++;
      return;
    }
    for(let i = index; i < this.arr.length; i++) {
      [this.arr[index], this.arr[i]] = [this.arr[i], this.arr[index]];  // 与下标为i的元素交换位置
      this.run(index + 1);  // 剩下元素全排列
      [this.arr[index], this.arr[i]] = [this.arr[i], this.arr[index]]; // 复原数组
    }
  }
}

let p = new Permutation([1,2,3]);
console.log(p.result);
console.log(p.len);