var faker = require('faker');

module.exports = {
	title : "新增广告位",
	desc : "新增应用第二步 广告位",
	type : 'POST',
	url : '/v1/adv/campaigns/:campaignId/creatives',
	request : {
		// 数据保存到临时表，表明创建的应用没有最终提交,这个字段很关键啊
		campaignId : "2423",
		creatives : [ {
			id : 333,
			adTypeOnProduct : 'BANNER',// 广告类型
			codeName : 'A创意天使',// 广告名称
			href:'www.baidu.com',//广告链接
			adTypeOnInterface : 'TEXT',// 广告形式,全部时传递-1
			materialLogoId : 4444,// 图标素材附件ID
			materialAppIconId : 5555,// 应用图标素材附件ID
			materialBannerImageId : 777,// 横幅图片素材附件ID
			materialSplashImageId : 9999,// 开屏图片素材附件ID
			materialInterstitialImageId : 5433,
			headline:"",//广告语
			body:'',//描述
			adTypeOnInteraction: 'LINK'//交互类型   LINK网页链接 APP下载应用  NONE无
		// 插屏图片素材附件ID
		}, {
			adTypeOnProduct : 'BANNER',// 广告类型
			codeName : 'B创意',// 广告名称
			adTypeOnInterface : 'TEXT',// 广告形式
			href:'www.baidu.com',//广告链接
			materialLogoId : 4444,// 图标素材附件ID
			materialAppIconId : 5555,// 应用图标素材附件ID
			materialBannerImageId : 777,// 横幅图片素材附件ID
			materialSplashImageId : 9999,// 开屏图片素材附件ID
			materialInterstitialImageId : 5433,
			headline:"",//广告语
			body:'',//描述
			adTypeOnInteraction: 'LINK'//交互类型   LINK网页链接 APP下载应用  NONE无
		// 插屏图片素材附件ID
		} ]

	// 传递的创意数组，有ID后台执行update，没有执行insert
	},
	res : {
		ok : {
			ret : 1,
			result : {

			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
