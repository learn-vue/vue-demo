var faker = require('faker');

module.exports = {
	title : "控制计划的投放状态",
	desc : "控制计划的投放状态",
	type : 'PUT',
	url : '/v1/adm/campaigns/:campaignId/availabilities',
	request : {
		campaignId : 344,
		availabilityStatus : "ALLOWED",// "DISALLOWED",二选一
		advId:2314
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
