var faker = require('faker');

module.exports = {
	title : "控制创意的投放状态",
	desc : "控制创意的投放状态",
	type : 'PUT',
	url : '/v1/adm/campaigns/:campaignId/creatives/:creativeId/availabilities',
	request : {
		advId:2231,//广告主ID
		campaignId:344,
		creativeId: 344,
		availabilityStatus:"ALLOWED"// "DISALLOWED",二选一
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					message : "开启成功！"
				}
			}
		},
		err : {
			ret : 0,
			message : "开启失败，请稍后重试！"
		}
	}
};
