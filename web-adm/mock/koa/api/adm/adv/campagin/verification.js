var faker = require('faker');

module.exports = {
	title : "控制计划的审核状态",
	desc : "控制计划的审核状态",
	type : 'PUT',
	url : '/v1/adm/campaigns/:campaignId/verifications',
	request : {
		campaignId : 344,
		verificationStatus : "APPROVED ",// "DENIED",二选一
		advId:2314
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

