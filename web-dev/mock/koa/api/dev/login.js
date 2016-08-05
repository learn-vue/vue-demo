var faker = require('faker');

module.exports = {
	title : "登录",
	desc : "登录",
	type : 'POST',
	url : '/v1/login/dev',
	request : {
		userName : "",
		userPass : "",
		verificationCode:""
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					user : {
						name:"张三",
						token:"1234",//唯一标示，用户会话标识
						type:'dev'
						//需要前台本地存储的用户信息
					}
				}
			};

		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
