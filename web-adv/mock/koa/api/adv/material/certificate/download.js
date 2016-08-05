var faker = require('faker');

module.exports = {
	title : "下载用户上传营业执照附件",
	desc : "下载用户上传营业执照附件",
	type : 'GET',
	url : '/v1/adv/finances/materials/:materialId',
	request : {
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
