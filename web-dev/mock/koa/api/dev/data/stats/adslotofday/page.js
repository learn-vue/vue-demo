var faker = require('faker');

module.exports = {
	title : "开发者数据管理分页数据API",
	desc : "开发者数据管理分页数据API",
	type : 'GET',
	url : '/v1/dev/stats/adSlotOfDay/:appId/:adslotId/:pageNum/:pageSize',
	request : {
		pageNum : 1,// 分页页码，必填
		pageSize : 10,
		startDate : 345434554,
		endDate : 7876545,
		appId : '34',
		adslotId : '443'
	},
	res : {
		fn : function(req, res, query) {

			var results = [];
			for (var i = 0; i < query.pageSize; i++) {
				results.push({
					id : faker.random.number(),
					date : faker.date.past().getTime(),
					numOfAdReq : faker.random.number(),// 请求数量
					numOfAdRes : faker.random.number(),// 有效请求数量
					numOfAdClicks : faker.random.number(),// 点击数
					numOfAdImpressions : faker.random.number(),// 展现数量
					chargeOfImpressions : faker.finance.amount(),// 展示收入
					chargeOfClicks : faker.finance.amount(),// 点击收入
					ctr : faker.finance.amount(),// 点击率
					cpm : faker.finance.amount()
				// 千次展现收入
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
