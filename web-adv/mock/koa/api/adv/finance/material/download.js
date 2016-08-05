var faker = require('faker');

module.exports = {
	title : "广告主下载证件",
	desc : "广告主下载证件",
	type : 'GET',
	url : '/v1/adv/finances/materials/:materialId',
	request : {
		certificateType:'FIRST_GENERATION_ID_CARD',//证件类型
		materialId : 333
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
