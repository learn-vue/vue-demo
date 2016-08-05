var faker = require('faker');

module.exports = {
	title : "更新用户密码",
	desc : "更新用户密码",
	type : 'PUT',
	url : '/v1/dev/users/current/pass',
	request : {
		oldPass : "",
		newPass : ""
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {

				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
