var faker = require('faker');

module.exports = {
	title : "新增广告位",
	desc : "新增应用第二步 广告位",
	type : 'POST',
	url : '/v1/adv/campaigns/:campaignId/targets',
	request : {
		os : "iOS,Android",
		campaignId : 2423,
		hour : "2,6,5",// -1表示不限
		region : "2,55,332,555",// -1表示不限
		mediaType : "4",
		network : "WIFI,2G,3G",
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
