// 延迟打印
for(var i=0 ; i<10; i++) {
  (function(i){
      setTimeout(function() {
          console.log(i);//输出0-9
      }, 1000);
  })(i);
}

// js–for循环每隔一秒打印一个数（1 2 3 4 5）
// 方法一
for( let i = 1 ; i < 6 ; i++ ){
	setTimeout(function(){
		console.log('log', i )
	}, 1000*i )
}
// 方法二
for( var i = 1 ; i < 6 ; i++ ){
	(function(j){
		setTimeout( function(){
			console.log( j )
		},1000*j )
	})(i)
}