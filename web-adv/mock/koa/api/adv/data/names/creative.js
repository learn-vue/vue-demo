var faker = require('faker');

// ///////|||后台返回数据说明

module.exports = {
	title : "获取当前用户所有发布过的广告计划下的广告创意",
	desc : "获取当前用户所有发布过的广告计划下的广告创意",
	type : 'GET',
	url : '/v1/adv/names/campaigns/:campaignId/creatives',
	request : {
		campaignId : 333
	},
	res : {
		fn : function() {

			faker.random.number();
			faker.random.number();
			faker.random.number();
			faker.random.number();
			faker.random.number();
			faker.random.number();
			faker.random.number();
			faker.name.firstName();
			faker.name.firstName();
			faker.name.firstName();
			faker.name.firstName();
			faker.name.firstName();
			faker.name.firstName();
			faker.name.firstName();

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
