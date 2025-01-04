// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

// 此外，你可以假设该网格的四条边均被水包围。
// apple ms 
/**
 * @param {character[][]} grid
 * @return {number}
 */
var dfs = function(grid, i, j) {
    let m = grid.length;
    let n = grid[0].length;
    grid[i][j] = '0';
    if(i-1 >= 0 && grid[i-1][j] == '1') dfs(grid, i-1, j);
    if(i+1<m && grid[i+1][j] == '1') dfs(grid, i+1, j);
    if(j-1>= 0 && grid[i][j-1] == '1') dfs(grid, i, j - 1);
    if(j+1 <n && grid[i][j+1] == '1') dfs(grid, i, j+1);
}
var numIslands = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    if(m === 0 || n === 0) { return 0; }
    let numIslands = 0;
    for (let i = 0; i< m; i++) {
        for(let j = 0; j< n; j++) {
            if(grid[i][j] === '1') {
                numIslands++;
                dfs(grid, i, j);
            }
        }
    }
    return numIslands;
};