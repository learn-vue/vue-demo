var faker = require('faker');

module.exports = {
	title : "广告主首页-7日消费概览API",
	desc : "广告主首页-7日消费概览API",
	type : 'GET',
	url : '/v1/adv/stats/chargeOf7Day',
	request : {},
	res : {
		ok : {
			ret : 1,// 状态码表示成功
			result : [// 7日消费数据
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
