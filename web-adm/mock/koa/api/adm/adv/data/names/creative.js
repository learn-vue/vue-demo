var faker = require('faker');

// ///////|||后台返回数据说明

module.exports = {
	title : "获取计划的创意名称列表",
	desc : "获取计划的创意名称列表",
	type : 'GET',
	url : '/v1/adm/names/campaigns/:campaignId/creatives',
	request : {
		advId:5
	},
	res : {
		fn : function() {

			return {
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
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
