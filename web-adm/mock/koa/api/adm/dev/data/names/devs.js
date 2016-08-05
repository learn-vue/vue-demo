var faker = require('faker');

module.exports = {
	title : "获取平台的开发者名称列表",
	desc : "获取平台的开发者名称列表",
	type : 'GET',
	url : '/v1/adm/names/devs',
	request : {
	},
	res : {
		fn : {
			ret : 1,
			result : [ {
				id : faker.random.number().toString(),
				text : '赵文杰'
			}, {
				id : faker.random.number().toString(),
				text : '程庆捷'
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};

