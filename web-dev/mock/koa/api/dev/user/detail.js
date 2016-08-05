var faker = require('faker');

module.exports = {
	title : "查看用户数据",
	desc : "查看用户数据",
	type : 'GET',
	url : '/v1/dev/users/current',
	request : {

	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					userName : 'lqx',
					realName : '大飞哥',
					email:'1@qq.com',
					contactMobile : '13167208888',
					contactQq : '123456789',
					contactWechat : '薄荷少年半心凉丶'
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
