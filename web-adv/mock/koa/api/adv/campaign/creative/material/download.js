var faker = require('faker');

module.exports = {
	title : "广告主下载附件API",
	desc : "广告主下载附件API",
	type : '',// 方法应该是不写，或者特殊，具体还有待开发实现调试，java可不配置
	url : '/v1/adv/campaigns/:campaignId/materials/:materialId',
	request : {
		campaignId : 443,// 计划ID
		materialId : 454,// 附件ID
		type : "LOGO",// 必填，LOGO ICON_IAMGE BANNER_IMAGE SPLASH_IMAG
	// INTERSTITIAL_IMAGE之一
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
