// 微信红包算法
// 设置最小金额为0.01，最大金额为剩余金额/剩余红包数量的2倍
// 在最大最小金额之间取一个随机数作为红包的金额
// 储存该金额到moneyList同时红包数量减一，剩余总金额减去该金额
// 循环1,2,3步骤直到红包数量只剩1个
// 将最后一个红包数量添加到moneyList，返回moneyList就是红包的分配结果

function getRandomMoney(remainMoney,remainSize){
	let moneyList=[];
	const min=0.01;
	let max,money;
	while (remainSize>1){
		max=remainMoney/remainSize*2;
		money=Math.random()*max;
		console.log('each ', remainMoney, remainSize, max, money)
		money=money<min ? min : money;
		money=Math.round(money*100)/100;
		moneyList.push(money);
		remainSize--;
		remainMoney-=money;
	}
	
	moneyList.push(Math.round(remainMoney*100)/100);
	return moneyList;
}
const maxMoney=100;   //红包总金额
const maxSize=20;    //红包个数
console.log(getRandomMoney(maxMoney,maxSize))