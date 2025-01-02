// Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return  the number of islands.

// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// ```js
// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1

// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3
// ```

function findIsland(srcData) {
    if(srcData.length ===0 || srcData[0]?.length === 0) return 0;
    let result = null;
    const iLen = srcData.length;
    const jLen = srcData.length;
    let zeroIndex = [];// 4, 2, 2, 0
    for(let i = 0; i< iLen; i++) {
      const rowData = srcData[i];
      for(let j = 0; j< jLen;j++) {
        if (rowData[j] === 0) {
          zeroIndex.push(j);
          break;
        }
      }
    }
    let markOcclusionTimes= 0;
    for(let k = 0; k< jLen; k++) {
      const distance = zeroIndex[k] - zeroIndex[k+1] - 1;
      while(distance>0) {
        if (srcData[0][zeroIndex[k] - distance] === 0){
          markOcclusionTimes++;
          distance--;
        }
      }
    }
    if(markOcclusionTimes >=1)
  }