var faker = require('faker');

module.exports = {
	title : "用户注册第二步 - 用户信息",
	desc : "用户注册第二步 - 用户信息",
	type : 'POST',
	url : '/v1/adm/signup/userInfo',
	request : {
		realName:'', 	//真实姓名
		phone:'', 	//手机
		email:'', 	//电子邮箱
		qq:'', 	//QQ
		country:'', 	//国家
		province:'', 	//省
		city:'', 	//市
		county:'', 	//县
		street:'', 	//街道
		userId: '' 	//客户ID
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
