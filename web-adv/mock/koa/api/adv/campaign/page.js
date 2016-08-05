var faker = require('faker');

module.exports = {
	title : "广告主获取分页推广计划",
	desc : "广告主获取分页推广计划",
	type : 'GET',
	url : '/v1/adv/campaigns/:pageNum/:pageSize',
	request : {
		pageNum : 1,// 分页页码，必填
		pageSize : 10,
		keyword : ''// 关键词，选填
	},
	res : {
		fn : function(req, res, query) {

			var results = [];
			for (var i = 0; i < query.pageSize; i++) {
				results
						.push({
							id : faker.random.number().toString(),// 计划ID
							name : faker.name.firstName(),// 计划名称
							budgetAmountTotal : faker.finance.amount(),// 计划预算
							budgetAmountDaily : faker.finance.amount(),// 计划每日预算
							dateStart : faker.date.past().getTime(),// 投放起始日期
							dateEnd : faker.date.past().getTime(),// 投放结束日期
							verificationStatus : [ "CREATING", "PENGDING",
									"APPROVED", "DENIED" ][faker.random
									.number() % 4],// 应用审核状态
							availabilityStatus : [ "ALLOWED", "DISALLOWED" ][faker.random
									.number() % 2],// 应用审核通过以后才可能有这个状态，应用投放状态
							createdAt : faker.date.past().getTime()
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
