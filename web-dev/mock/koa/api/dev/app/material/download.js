var faker = require('faker');

module.exports = {
	title : "下载用户上传应用附件",
	desc : "下载用户上传应用附件",
	type : '',// 二进制流导出，方法名称我不确定，可暂时放空
	url : '/v1/dev/apps/materials/:materialId',
	request : {
		materialId : ""// 附件ID
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
