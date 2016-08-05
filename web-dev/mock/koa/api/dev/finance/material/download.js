var faker = require('faker');

module.exports = {
	title : "开发者下载证件",
	desc : "开发者下载证件",
	type : '',// 二进制流导出，方法名称我不确定，可暂时放空
	url : '/v1/dev/finances/materials/:materialId',
	request : {
		financeType:2,//2-个人、1-企业
		certificateType:'FIRST_GENERATION_ID_CARD',//证件类型
		materialId : 44
	// 附件ID
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
				// java二进制流输出
				}
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
