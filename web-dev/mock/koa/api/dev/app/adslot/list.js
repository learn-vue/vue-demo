module.exports = {
	title : "DEV-DeleteAPI",
	desc : "获取开发者应用所有广告位置的详情",
	type : 'GET',
	url : '/v1/dev/apps/:appId/adslots',
	request : {
		appId : '123'
	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				id : 333,
				name : '愤怒的小鸟广告',
				type : 'SPLASH'
			}, {
				id : 444,
				name : '愤怒的小狗',
				type : 'BANNER'
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
