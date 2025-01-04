// 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' 组成，捕获 所有 被围绕的区域：

// 连接：一个单元格与水平或垂直方向上相邻的单元格连接。
// 区域：连接所有 'O' 的单元格来形成一个区域。
// 围绕：如果您可以用 'X' 单元格 连接这个区域，并且区域中没有任何单元格位于 board 边缘，则该区域被 'X' 单元格围绕。
// 通过 原地 将输入矩阵中的所有 'O' 替换为 'X' 来 捕获被围绕的区域。你不需要返回任何值。

 

// 示例 1：

// 输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

// 输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

// 解释：


// 在上图中，底部的区域没有被捕获，因为它在 board 的边缘并且不能被围绕。
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
let m, n;
var dfs = function(board, x, y) {
    if (x<0 || x>= n| y<0 || y>=m || board[x][y]!= '0'){
        return;
    }
    board[x][y] = 'A';
    dfs(board, x+1, y);
    dfs(board, x-1, y);
    dfs(board, x, y+1);
    dfs(board, x, y-1);
}
var solve = function(board) {
    n = board.length;
    if(n === 0) {return;}
    m = board[0].length;
    for(let i = 0; i< n; i++) {
        dfs(board, i, 0);
        dfs(board, i, m -1)
    }
    for(let i = 0; i< m -1; i++) {
        dfs(board, 0, i);
        dfs(board, n-1,i)
    }
    for(let i = 0; i<n; i++) {
        for(let j = 0; j<m; j++) {
            if(board[i][j] == 'A') {
                board[i][j] = '0';
            } else if(board[i][j] === '0') {
                board[i][j] = 'X';
            }
        }
    }
};