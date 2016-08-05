var faker = require('faker');

module.exports = {
	title : "用户注册 第一步 - 注册账号",
	desc : "用户注册 第一步 - 注册账号",
	type : 'POST',
	url : '/v1/adm/signup',
	request : {
		userName:'aaa',
		password:'123',
		verificationCode:'abcd'
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					userId : 'C201603190001',
					message: '注册成功'
				}
			};

		},
		err : {
			ret : 0,
			message : "注册失败"
		}
	}
};
