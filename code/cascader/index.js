// 课程
//     数学
//         小学数学
//         初中数学
//             代数
//             几何
//     语文
//     英语
//
var data = [{
  name: '课程',
  id: 1,
  child: [
      {
          name: '数学',
          id: 11,
          child: [
              {
                  name: '小学数学',
                  id: 111
              },
              {
                  name: '初中数学',
                  id: 112
              }
          ]
      },
      {
          name: '语文',
          id: 12
      },
      {
          name: '英语',
          id: 13
      }
  ]
}]
const parentHtmlPrefix = '<ul class="parent">';
const parentHtmlSurffix = '</ul>';
function render(data){
  let html = '';
  function _r(d,html){
      html += parentHtmlPrefix;
      for(let i = 0,len= d.length; i<len; i++){
        html += `<li class="child">${d[i].name}`;
        if(d[i].child && d[i].child.length >0){
            html = _r(d[i].child, html);
        } 
        html += '</li>';
      }
      return html + parentHtmlSurffix;
  }
  return _r(data, html);
}
console.log(render(data));

// <ul class="parent"> 
//     <li class="child">课程
//         <ul class="parent"> 
//             <li class="child">数学
//                 <ul class="parent"> 
//                     <li class="child">小学数学</li> 
//                     <li class="child">初中数学</li>
//                 </ul>
//             </li> 
//             <li class="child">语文</li> 
//             <li class="child">英语</li>
//         </ul>
//     </li>
// </ul>
