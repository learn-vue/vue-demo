var faker = require('faker');
//后台开发注意，这个地方，实际上是java生成后台图片，后台response返回的不再是json，而是二进制图片流，可以参考jcaptcha
module.exports = {
	title : "获取验证码",
	desc : "获取验证码",
	type : 'GET',
	url : '/v1/dev/verificationcode',
	request : {
	},
	res : {
		fn : function(req, res, query) {
			
			//请注意，这个仅仅是json示例而已，是错误的，此接口要反馈图片二进制流
			return {
				ret : 1,
				result : {}
			};

		},
		err : {
			ret : 0,
			message : "当获取验证码失败"
		}
	}
};
