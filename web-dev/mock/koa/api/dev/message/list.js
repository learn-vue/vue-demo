var faker = require('faker');

module.exports = {
	title : "查看日志",
	desc : "查看日志",
	type : 'GET',
	url : '/v1/dev/messages',
	request : {
		readState : 0
	// 0所有消息，1未读消息
	},
	res : {
		fn : function(req, res, query) {

			var results = [];

			for (var i = 0; i < 343; i++) {
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
				results : results
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
