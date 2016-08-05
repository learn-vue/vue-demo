var faker = require('faker');

module.exports = {
	title : "开发者首页-7日收益概览API",
	desc : "开发者首页-7日收益概览API",
	type : 'GET',
	url : '/v1/dev/stats/chargeOf7Day',
	request : {},
	res : {
		ok : {
			ret : 1,// 状态码表示成功
			result : [// 7日收益数据
			faker.finance.amount(), faker.finance.amount(),
					faker.finance.amount(), faker.finance.amount(),
					faker.finance.amount(), faker.finance.amount(),
					faker.finance.amount() ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
