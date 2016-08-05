var faker = require('faker');

module.exports = {
	title : "保存配置的广告源",
	desc : "保存配置的广告源",
	type : 'POST',
	url : '/v1/adm/apps/:appId/:adslotId/sources',
	request : {
		ads :[{
			channelCode:'SYSTEM',
			channelName:'系统',
			channelAppId:'12312',
			channelSlotId:'223',
			channelWeight:'11'
		},{
			channelCode:'BAIDU',
			channelName:'百度',
			channelAppId:'12312',
			channelSlotId:'223',
			channelWeight:'11'
		}]//分成比例// 
	},
	res : {
		ok : {
			ret : 1,
			message : "更新成功"
		},
		err : {
			ret : 0,
			message : "更新失败"
		}
	}
};
