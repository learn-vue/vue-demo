var faker = require('faker');

module.exports = {
	title : "广告主获取推广计划下创意所有数据",
	desc : "广告主获取推广计划下创意所有数据",
	type : 'GET',
	url : '/v1/adv/campaigns/:campaignId/creatives',
	request : {
		campaignId : '123'
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : [
						{
							id : 333,
							createTime:faker.date.past().getTime(),
							adTypeOnProduct : 'BANNER',// 广告类型
							codeName : 'D创意天使',// 广告名称
							href:'http://www.baidu.com',//广告链接
							adTypeOnInterface : 'TEXT',// 广告形式
							materialLogoId : 4444,// 图标素材附件ID
							materialLogoName : '1',// 图标素材附件名称
							materialAppIconId : 5555,// 应用图标素材附件ID
							materialAppIconName : '2',// 应用图标素材附件名称
							materialBannerImageId : 777,// 横幅图片素材附件ID
							materialBannerImageName : '3',// 横幅图片素材附件名称
							materialSplashImageId : 9999,// 开屏图片素材附件ID
							materialSplashImageName : '4',// 开屏图片素材附件名称
							materialInterstitialImageId : 5433,// 插屏图片素材附件ID
							materialInterstitialImageName : '',// 插屏图片素材附件名称
							headline:"321",//广告语
							body:'312',//描述
							verificationStatus : [ "CREATING", "PENGDING",
									"APPROVED", "DENIED" ][faker.random
									.number() % 4],// 应用审核状态
							availabilityStatus : [ "ALLOWED", "DISALLOWED" ][faker.random
									.number() % 2],// 应用审核通过以后才可能有这个状态，应用投放状态
							adTypeOnInteraction: 'LINK'//交互类型   LINK网页链接 APP下载应用  NONE无
						},
						{
							id : 444,
							createTime:faker.date.past().getTime(),
							adTypeOnProduct : 'NATIVE',
							href:'http://www.baidu.com',//广告链接
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
							headline:"312",//广告语
							body:'3122',//描述
							verificationStatus : [ "CREATING", "PENGDING",
									"APPROVED", "DENIED" ][faker.random
									.number() % 4],// 应用审核状态
							availabilityStatus : [ "ALLOWED", "DISALLOWED" ][faker.random
									.number() % 2],// 应用审核通过以后才可能有这个状态，应用投放状态
							adTypeOnInteraction: 'APP'//交互类型   LINK网页链接 APP下载应用  NONE无
						} ]
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
