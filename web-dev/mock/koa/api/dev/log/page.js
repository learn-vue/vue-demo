var faker = require('faker');

module.exports = {
	title : "分页查看日志",
	desc : "分页查看日志",
	type : 'GET',
	url : '/v1/dev/logs/:pageNo/:pageSize',
	request : {
		pageNo : 1,// 分页页码，必填
		pageSize : 10
	},
	res : {
		fn : function(req, res, query) {

			var results = [];
			for (var i = 0; i < query.pageSize; i++) {
				results
						.push({
							id : faker.random.number(),
							date : faker.date.past(),
							account : faker.name.firstName(),
							module : [ '应用管理', '财务管理', '数据管理', '日志管理', '报表管理',
									'用户管理' ][faker.random.number() % 6],
							operation : [ '新增', '修改', '删除', '查询', '导出', '密码变更' ][faker.random
									.number() % 6]
						});
			}

			return {
				ret : 1,
				result : {
					pageSize : query.pageSize,
					pageNo : query.pageNo,
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
