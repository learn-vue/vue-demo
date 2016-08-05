var faker = require('faker');

module.exports = {
	title : "导出查看财务结算数据",
	desc : "导出查看财务结算数据",
	type : '',// 二进制流导出，方法名称我不确定，可暂时放空
	url : '/v1/adv/stats/creativeOfDay/:campaignId/:creativeId/export',
	request : {
		startDate : 345434554,
		endDate : 7876545,
		campaignId : '34',
		creativeId : '443'
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
				// java二进制流输出
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
