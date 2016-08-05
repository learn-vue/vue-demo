var faker = require('faker');

module.exports = {
	title : "开发者首页-今日概览API",
	desc : "开发者首页-今日概览API",
	type : 'GET',
	url : '/v1/dev/stats/adSlotOfToday',
	request : {},
	res : {
		ok : function(req,res,query){
			
			faker.finance.amount();
			faker.finance.amount();
			faker.finance.amount();
			
			return {
				ret : 1,// 状态码表示成功
				result : {
					numOfAdReq : faker.random.number(),// 请求数量
					numOfAdRes : faker.random.number(),// 有效请求数量
					numOfAdClicks : faker.random.number(),// 点击数
					numOfAdImpressions : faker.random.number(),// 展现数量
					chargeOfImpressions : faker.finance.amount(),// 展示收入
					chargeOfClicks : 1000*faker.finance.amount()
				// 点击收入
	
				}
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
