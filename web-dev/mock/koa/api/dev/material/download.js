var faker = require('faker');

module.exports = {
	title : "下载用户上传营业执照附件",
	desc : "下载用户上传营业执照附件",
	type : '',// 二进制流导出，方法名称我不确定，可暂时放空
	url : '/v1/dev/finances/materials/:materialId',
	request : {
		financeType : "1",// 1-个人账户，2-企业账户
		certificateType:"",//个人账户会传递此参数，见API列出来的类型，/v1/dict/types/certificates
		cardType : 1,// 1正面，2反面
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
