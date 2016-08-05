var faker = require('faker');

module.exports = {
	title : "预览财务结算凭证物料",
	desc : "预览财务结算凭证物料",
	type : 'POST',
	url : '/v1/adm/dev/withdraws/materials/:materialId',
	request : {
		materialId:""//附件
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
