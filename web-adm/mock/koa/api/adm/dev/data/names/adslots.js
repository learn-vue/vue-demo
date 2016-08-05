var faker = require('faker');

// ///////|||后台返回数据说明

module.exports = {
	title : "获取应用的广告位名称列表",
	desc : "获取应用的广告位名称列表",
	type : 'GET',
	url : '/v1/adm/names/apps/:appId/adslots',
	request : {
		devId:4
	},
	res : {
		fn : {
			ret : 1,
			result : [ {
				id : faker.random.number().toString(),
				text : faker.name.firstName()
			}, {
				id : faker.random.number().toString(),
				text : faker.name.firstName()
			}, {
				id : faker.random.number().toString(),
				text : faker.name.firstName()
			}, {
				id : faker.random.number().toString(),
				text : faker.name.firstName()
			}, {
				id : faker.random.number().toString(),
				text : faker.name.firstName()
			}, {
				id : faker.random.number().toString(),
				text : faker.name.firstName()
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
