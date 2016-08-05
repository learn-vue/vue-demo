var faker = require('faker');

module.exports = {
	title : "控制创意的审核状态",
	desc : "控制创意的审核状态",
	type : 'PUT',
	url : '/v1/adm/campaigns/:campaignId/creatives/:creativeId/verifications',
	request : {
		advId:2231,//广告主ID
		campaignId : 344,//计划ID
		creative : 344,//创意ID
		verificationStatus : "ALLOWED ",// "DISALLOWED",二选一
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					message : "审批成功！"
				}
			}
		},
		err : {
			ret : 0,
			message : "审批失败，请稍后重试！"
		}
	}
};
