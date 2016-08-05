var faker = require('faker');

module.exports = {
	title : "根据关键词搜索平台的广告计划",
	desc : "根据关键词搜索平台的广告计划",
	type : 'GET',
	url : '/v1/adm/campaigns/:pageNum/:pageSize',
	request : {
		pageNum : 1,// 分页页码，必填
		pageSize : 10,
		keyword : ''// 关键词，选填
	},
	res : {

		fn : function(req, res, query) {

			var results = [];

			var NameArr = ['卡尔玛','潘森','卡特琳娜','安妮','布隆','艾希','盖伦','赵信','嘉文','瑞文',]

			for (var i = 0; i < query.pageSize; i++) {
				results.push({
					id : faker.random.number().toString(),// 计划ID
					advId : faker.random.number().toString(),// 广告主ID
					advName : NameArr[(faker.random.number()+'').slice(-1)],// 广告主名称
					name : faker.name.firstName(),// 计划名称
					budgetAmountTotal : faker.finance.amount(),// 计划预算
					budgetAmountDaily : faker.finance.amount(),// 计划每日预算
					verificationStatus : [ "CREATING", "PENGDING",
							"APPROVED", "DENIED" ][faker.random
							.number() % 4],// 应用审核状态
					availabilityStatus : [ "ONLINE",
										"OFFLINE_COMPLETEDONLINE",
										"OFFLINE_OUT_OF_DAILY_BUDGET",
										"OFFLINE_OUT_OF_TOTAL_BUDGET",
										"OFFLINE_UNKNOWN_EXECEPTION",
										"OFFLINE_SUSPEND" ][faker.random
							.number() % 6],// 应用审核通过以后才可能有这个状态，应用投放状态
					createdAt : faker.date.past().getTime()
				});
			}

			return {
				ret : 1,
				result : {
					pageSize : query.pageSize,
					pageNum : query.pageNum,
					totalRecords : 400,
					results : results
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
