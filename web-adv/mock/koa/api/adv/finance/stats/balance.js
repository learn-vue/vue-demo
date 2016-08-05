var faker = require('faker');

module.exports = {
	title : "广告主财务概览",
	desc : "广告主财务概览",
	type : 'GET',
	url : '/v1/adv/stats/finances/balance',
	request : {

	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					consume : faker.finance.amount(),// 总消费
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
