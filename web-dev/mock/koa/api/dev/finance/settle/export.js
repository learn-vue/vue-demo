var faker = require('faker');

module.exports = {
	title : "导出查看财务结算数据",
	desc : "导出查看财务结算数据",
	type : 'GET',
	url : '/v1/dev/finances/settles/export',
	request : {
		startDate : 444444,
		endDate : 55555555555
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
