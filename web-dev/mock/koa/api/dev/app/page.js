var faker = require('faker');

module.exports = {
	title : "开发者应用分页查询API",
	desc : "开发者应用分页查询API",
	type : 'GET',
	url : '/v1/dev/apps/:pageNum/:pageSize',
	request : {
		pageNum : 1,// 分页页码，必填
		pageSize : 10,// 分页大小，必填
		keyword : ""// 搜索关键字，选填,默认空白字符串
	},
	res : {
		fn : function(req, res, query) {

			var results = [];

			for (var i = 0; i < query.pageSize; i++) {
				results
						.push({
							id : faker.random.number(),// 应用ID
							name : faker.name.firstName(),// 应用名称
							packageName : faker.name.title(),// 应用包名
							verificationStatus : [ "CREATING", "PENGDING",
									"APPROVED", "DENIED" ][faker.random
									.number() % 4],// 应用审核状态
							availabilityStatus : [ "ALLOWED", "DISALLOWED" ][faker.random
									.number() % 2],// 应用审核通过以后才可能有这个状态，应用投放状态
							createdAt : faker.date.past().getTime()
						// 创建时间
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
