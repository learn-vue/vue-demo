var faker = require('faker');

module.exports = {
	title : "获取平台的广告主名称列表",
	desc : "获取平台的广告主名称列表",
	type : 'GET',
	url : '/v1/adm/names/advs',
	request : {
	},
	res : {
		fn : {
			ret : 1,
			result : [ {
				id : faker.random.number().toString(),
				text : '李杰'
			}, {
				id : faker.random.number().toString(),
				text : '李鹏飞'
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};

