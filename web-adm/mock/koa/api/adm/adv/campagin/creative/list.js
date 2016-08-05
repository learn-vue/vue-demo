var faker = require('faker');

module.exports = {
	title : "获取计划的创意信息列表",
	desc : "获取计划的创意信息列表",
	type : 'GET',
	url : '/v1/adm/campaigns/:campaignId/creatives',
	request : {
		advId:44 //广告主ID
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : [
						{
							id : 333,
							createdTime: faker.date.past().getTime(),
							adTypeOnProduct : 'BANNER',// 广告类型
							codeName : 'A创意天使',// 广告名称
							adTypeOnInterface : 'TEXT',// 广告形式
							materialLogoId : 4444,// 图标素材附件ID
							materialLogoName : '',// 图标素材附件名称
							materialAppIconId : 5555,// 应用图标素材附件ID
							materialAppIconName : '',// 应用图标素材附件名称
							materialBannerImageId : 777,// 横幅图片素材附件ID
							materialBannerImageName : '',// 横幅图片素材附件名称
							materialSplashImageId : 9999,// 开屏图片素材附件ID
							materialSplashImageName : '',// 开屏图片素材附件名称
							materialInterstitialImageId : 5433,// 插屏图片素材附件ID
							materialInterstitialImageName : '',// 插屏图片素材附件名称
							verificationStatus : [ "CREATING", "PENGDING",
									"APPROVED", "DENIED" ][faker.random
									.number() % 4],// 应用审核状态
							availabilityStatus : [ "ALLOWED", "DISALLOWED" ][faker.random
									.number() % 2],// 应用审核通过以后才可能有这个状态，应用投放状态
						},
						{
							id : 444,
							createdTime: faker.date.past().getTime(),
							adTypeOnProduct : 'NATIVE',
							codeName : 'B投资专家',
							adTypeOnInterface : 'IMAGE',
							materialLogoId : 222,// 图标素材附件ID
							materialLogoName : '',// 图标素材附件名称
							materialAppIconId : 234,// 应用图标素材附件ID
							materialAppIconName : '',// 应用图标素材附件名称
							materialBannerImageId : 66,// 横幅图片素材附件ID
							materialBannerImageName : '',// 横幅图片素材附件名称
							materialSplashImageId : 88,// 开屏图片素材附件ID
							materialSplashImageName : '',// 开屏图片素材附件名称
							materialInterstitialImageId : 64,// 插屏图片素材附件ID
							materialInterstitialImageName : '',// 插屏图片素材附件名称
							verificationStatus : [ "CREATING", "PENGDING",
									"APPROVED", "DENIED" ][faker.random
									.number() % 4],// 应用审核状态
							availabilityStatus : [ "ALLOWED", "DISALLOWED" ][faker.random
									.number() % 2],// 应用审核通过以后才可能有这个状态，应用投放状态
						} ]
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
