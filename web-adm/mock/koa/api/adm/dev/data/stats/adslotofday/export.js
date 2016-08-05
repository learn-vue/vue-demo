var faker = require('faker');

module.exports = {
	title : "下载应用的效果数据",
	desc : "下载应用的效果数据",
	type : 'GET',// 二进制流导出，方法名称我不确定，可暂时放空
	url : '/v1/adm/dev/stats/adSlotOfDay/:appId/:adslotId/export',
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
					path : 'a/b.csv'// 返回的是系统生成文件，存放的文件路径,或者直接下载excel文件，具体怎么做，后续协商
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
