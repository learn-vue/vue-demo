var faker = require('faker');

module.exports = {
	title : "开发者数据管理导出数据API",
	desc : "开发者数据管理导出数据API",
	type : '',// 二进制流导出，方法名称我不确定，可暂时放空
	url : '/v1/dev/stats/adSlotOfDay/:appId/:adslotId/export',
	request : {
		startDate : 345434554,
		endDate : 7876545,
		appId : '34',
		adslotId : '443'
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
