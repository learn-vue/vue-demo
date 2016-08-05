var faker = require('faker');

module.exports = {
	title : "获取应用的广告源配置信息",
	desc : "获取应用的广告源配置信息",
	type : 'GET',
	url : '/v1/adm/apps/:appId/aaaaa',
	request : {
		devId:'2332'
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					ads:[{
						adName:'系统广告',
						adscale:'0.1'
					},{
						adName:'百度',
						adscale:'0.2'
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

