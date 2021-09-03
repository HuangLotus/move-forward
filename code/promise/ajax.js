window.jQuery.ajax = ({ method, path, body, headers })=>{//ES6语法
  //进行Promise封装
  return new Promise((resolve,reject)=>{//这句话是套路,记住
    let request = new XMLHttpRequest();
    request.open(method,path);//配置

    for (const key in headers) {
      let value = headers[key];
      request.setRequestHeader(key, value);
    }
    request.send(body);//发送,并配置响应体

    request.onreadystatechange = ()=>{
      if(request.readyState === 4){
        if ( request.status>=200&&request.status<=400){
          resolve.call(undefined, request.responseText);//执行成功函数
        } else if( request.status>=400 ){
          reject.call(undefined,request);//执行失败函数
        }
      }
    }
  })
}

let myButton = document.querySelector('.btn')
myButton.addEventListener("click", (e)=>{
  //使用ajax
  $.ajax({
      method:"post",
      path:"/xxx",
      body:"username=mtt&password=1",
      headers:{
        "content-type":'application/x-www-form-urlencoded'
      }
  }).then(
    (responseText)=>{console.log(responseText);},//成功就调用这个函数
    (request)=>{console.log(request);}//失败就调用这个函数
  )
})