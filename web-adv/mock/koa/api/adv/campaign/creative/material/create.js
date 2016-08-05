var faker = require('faker');

module.exports = {
	title : "上传LOGO图片",
	desc : "上传LOGO图片",
	type : 'POST',
	url : '/v1/adv/campaigns/:campaignId/materials',
	request : {
		type : "LOGO",// 必填，
						// LOGO 
						// ICON_IAMGE
						// BANNER_IMAGE
						// SPLASH_IMAG
						// INTERSTITIAL_IMAGE 之一
		material : ""// 附件
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					// 返回上传应用ID以及Name
					materialId : faker.random.number(),
					materialName : faker.name.firstName()
				}
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
