var faker = require('faker');

module.exports = {
	title : "分页查看日志",
	desc : "分页查看日志",
	type : 'GET',
	url : '/v1/dev/messages/:pageNo/:pageSize',
	request : {
		pageNo : 1,// 分页页码，必填
		pageSize : 10,
		readState : 0
	// 0所有消息，1未读消息
	},
	res : {
		fn : function(req, res, query) {

			var results = [];
			for (var i = 0; i < query.pageSize; i++) {
				results.push({
					id : faker.random.number(),
					date : faker.date.past(),
					title : '[重要]' + faker.name.firstName() + ','
							+ faker.name.lastName(),
					content : '[haha]' + faker.name.firstName() + ','
							+ faker.name.lastName()
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
