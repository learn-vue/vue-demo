var faker = require('faker');

module.exports = {
	title : "广告主启用、停用创意投放",
	desc : "广告主启用、停用创意投放",
	type : 'PUT',
	url : '/v1/adv/campaigns/:campaignId/creatives/:creativeId/availabilities/:availabilityStatus',
	request : {
		campaignId : 344,
		creativeId : 344,
		availabilityStatus : "ALLOWED ",// "DISALLOWED",二选一
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {}
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
