var faker = require('faker');

module.exports = {
	title : "开发者财务概览",
	desc : "开发者财务概览",
	type : 'GET',
	url : '/v1/dev/stats/finances/balance',
	request : {

	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					earnings : faker.finance.amount(),// 总收入
					balance : faker.finance.amount()
				// 余额

				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
