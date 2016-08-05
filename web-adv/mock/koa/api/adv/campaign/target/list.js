var faker = require('faker');

module.exports = {
	title : "广告主获取推广计划下创意所有数据",
	desc : "广告主获取推广计划下创意所有数据",
	type : 'GET',
	url : '/v1/adv/campaigns/:campaignId/targets',
	request : {
		campaignId : '123'
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : [ {"hour":"9,17","mediaType":"1","network":"WIFI,2G,3G,4G","os":"iOS","region":"110000"} ]
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
