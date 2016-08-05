var faker = require('faker');

module.exports = {
	title : "开发者创建应用的广告位",
	desc : "开发者创建应用的广告位",
	type : 'POST',
	url : '/v1/dev/apps/:appId/adslots',
	request : {
		// 注意，根据此API处创建的应用，后台必须表示状态为临时状态，分步骤创建应用，最后一步才更新为持久状态
		appId : '333',// 应用ID
		// 注意ID有可能没有，所以你们判断，有ID就是更新，没有ID就是新增
		adslots : [ {// 所有广告位
			id : 333,
			name : "广告位Hello",
			type : "Banner"
		}, {
			name : "广告位Hello",
			type : "Banner"
		} ]
	},
	res : {
		ok : function() {

			return {
				ret : 1,
				result : {}
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
