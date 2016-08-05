var faker = require('faker');

module.exports = {
	title : "开发者创建应用第一步API",
	desc : "开发者创建应用第一步API",
	type : 'POST',
	url : '/v1/dev/apps',
	request : {
		// 注意，根据此API处创建的应用，后台必须表示状态为临时状态，分步骤创建应用，最后一步才更新为持久状态
		name : "愤怒的小鸟",// 应用名称
		industryCategory1:'2',//应用类型1
		industryCategory2:'3',//应用类型2
		platform : "IOS",// 应用平台
		description : "游戏",// 应用描述
		packageName : 'bird.apk',// 应用包名
		materialId : 4433// 应用附件ID
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					// 返回应用ID
					id : faker.random.number().toString()
				}
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
