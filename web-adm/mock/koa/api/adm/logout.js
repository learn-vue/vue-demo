var faker = require('faker');

module.exports = {
	title : "登出",
	desc : "登出",
	type : 'POST',
	url : '/v1/logout/adm',
	request : {
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
