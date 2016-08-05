var faker = require('faker');

module.exports = {
	title : "广告主删除推广计划下的创意",
	desc : "广告主删除推广计划下的创意",
	type : 'DELETE',
	url : '/v1/adv/campaigns/:campaignId/creatives/:creativeId',
	request : {
		campaignId : '123',
		creativeId : '32'
	},
	res : {
		ok : {
			ret : 1,
			result : {

			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
