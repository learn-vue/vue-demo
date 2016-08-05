var faker = require('faker');

module.exports = {
	title : "更新用户数据",
	desc : "更新用户数据",
	type : 'PUT',
	url : '/v1/adv/users/current',
	request : {
		userName : '123456789',
		realName : '大飞哥',
		email:'1@qq.com',
		contact : '13167208888',
		QQ : '123456789',
		wechat : '薄荷少年半心凉丶'
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					msg : '修改成功！'
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
