module.exports = {
	title : "DEV-DeleteAPI",
	desc : "API功能描述",
	type : 'GET',
	url : '/v1/dev/apps/:appId/adslots/:adslotId',
	request : {
		appId : '123',
		adslotId : '32'
	},
	res : {
		ok : {
			ret : 1,
			result : {
				id : 33,
				type : "BANNER",
				name : "sb"
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
