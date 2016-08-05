var faker = require('faker');

module.exports = {
	title : "获取应用的广告源信息",
	desc : "获取应用的广告源信息",
	type : 'GET',
	url : '/v1/adm/apps/:appId/:adslotId/sources',
	request : {
		devId:'2332'
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					ads:[{
						channelCode:'SYSTEM',
						channelAppId:'12312',
						channelSlotId:'223',
						channelWeight:'11'
					},{
						channelCode:'BAIDU',
						channelAppId:'321312',
						channelSlotId:'312',
						channelWeight:'12'
					}]
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};

