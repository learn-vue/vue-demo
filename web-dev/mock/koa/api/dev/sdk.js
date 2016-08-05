module.exports = {
	title : "为开发者提供的SDK连接",
	desc : "为开发者提供的SDK连接",
	type : 'GET',
	url : '/v1/dev/sdk',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				text : "iOS SDK下载",
				url : "www.baidu.com"
			}, {
				text : "Android SDK下载",
				url : "www.google.com"
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
