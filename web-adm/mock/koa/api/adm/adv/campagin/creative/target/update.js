var faker = require('faker');

module.exports = {
	title : "更新创意的定向信息",
	desc : "更新创意的定向信息",
	type : 'POST',
	url : '/v1/adm/campaigns/:campaignId/creatives/:creativeId/targetings',
	request : {
		advId:4444,
		medias:[{
			mediaId: '111111122222',
			mediaName:'百度',
		},{
			mediaId: '111111122222',
			mediaName:'微博',
		}]
	},
	res : {
		ok : {
			ret : 1,
			result : {

			}
		},
		err : {
			ret : 0,
			message : "更新失败"
		}
	}
};
