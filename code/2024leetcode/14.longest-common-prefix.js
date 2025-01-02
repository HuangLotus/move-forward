// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。
var longestCommonPrefix = function(strs) {
    let result = '';
    if(strs.length === 0){ return result; }

    for(let i = 0, l = strs[0].length; i< l; i++){
        const standard = strs[0][i];
        for(let j = 0, len = strs.length; j<len; j++){
            if (strs[j].substring(i, i+1) !== standard){
                return result;
            }
        }
        result += standard;
    }
    return result;
};