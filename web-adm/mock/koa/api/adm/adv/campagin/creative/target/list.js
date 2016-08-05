var faker = require('faker');

module.exports = {
	title : "获取创意的定向信息",
	desc : "获取创意的定向信息",
	type : 'GET',
	url : '/v1/adm/campaigns/:campaignId/creatives/:creativeId/targetings',
	request : {
		advId:'2332'
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : [{
					mediaId: '12345',
					mediaName:'手机百度',
				},{
					mediaId: '54321',
					mediaName:'微博',
				}]
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};

