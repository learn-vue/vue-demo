var faker = require('faker');

// ///////|||后台返回数据说明

module.exports = {
	title : "获取当前用户所有发布过的应用名称",
	desc : "获取当前用户所有发布过的应用名称",
	type : 'GET',
	url : '/v1/dev/names/apps',
	request : {

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
