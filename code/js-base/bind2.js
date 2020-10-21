var nickname = 'lilei';
function person (name){
  this.nickname = name;
  this.sayHi = function(){
    console.log('i',this.nickname);
    setTimeout(function(){
      console.log('s',this.nickname);
    },0);
  }
}

var male = {
  nickname: 'xiaofang',
  sayHi: () => {
    console.log('o',this.nickname)
  }
}

var p = new (person.bind(male, 'hong'));
p.sayHi();