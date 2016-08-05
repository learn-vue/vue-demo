var faker = require('faker');

module.exports = {
	title : "开发者创建应用第三步API",
	desc : "开发者创建应用第三步API",
	type : 'PUT',
	url : '/v1/dev/apps/:appId/audit',
	request : {
		// 注意，分步骤创建应用，最后一步，必须更新应用状态为持久态
		appId : "445"
	},
	res : {
		ok : {
			ret : 1,
			result : {}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
