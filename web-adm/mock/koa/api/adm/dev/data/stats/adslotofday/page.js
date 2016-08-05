var faker = require('faker');

// ///////|||后台返回数据说明
// ///////|||todayRequestCount 数值类型,今日请求数量
// ///////|||todayClickCount 数值类型 ,今日点击数
// ///////|||todayShowCount 数值 类型,今日展现
// ///////|||todayProfit 数值类型,今日收益
// ///////|||last7DayProfits 数值类型数组,7日收益数据

module.exports = {
	title : "根据过滤条件分页查询效果数据列表",
	desc : "根据过滤条件分页查询效果数据列表",
	type : 'GET',
	url : '/v1/adm/stats/dev/adslotOfDay/:pageNum/:pageSize',
	request : {
		pageNum : 1,// 分页页码，必填
		pageSize : 10,
		startDate : 345434554,
		endDate : 7876545,
		appId : '34',
		adslotId : '443',
		devId:'2222'
	},
	res : {
		fn : function(req, res, query) {

			var results = [];
			for (var i = 0; i < query.pageSize; i++) {
				results.push({
					id : faker.random.number(),
					advName: faker.name.firstName(),
					date : faker.date.past().getTime(),
					numOfAdReq : faker.random.number(),// 请求数量
					numOfAdRes : faker.random.number(),// 有效请求数量
					numOfAdClicks : faker.random.number(),// 点击数
					numOfAdImpressions : faker.random.number(),// 展现数量
					chargeOfImpressions : faker.finance.amount(),// 展示收入
					chargeOfClicks : faker.finance.amount(),// 点击收入
					ctr : faker.finance.amount(),// 点击率
					cpm : faker.finance.amount()//千次展现收入
				});
			}

			return {
				ret : 1,
				result : {
					pageSize : query.pageSize,
					pageNum : query.pageNum,
					total : 400,
					list : results
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
