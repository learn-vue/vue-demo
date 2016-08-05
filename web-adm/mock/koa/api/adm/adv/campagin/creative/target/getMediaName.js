var faker = require('faker');

module.exports = {
	title : "根据媒体ID获取媒体名称",
	desc : "根据媒体ID获取媒体名称",
	type : 'GET',
	url : '/v1/adm/campaigns/mediaName',
	request : {
		mediaId:'12345'
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					mediaId: '12345',
					mediaName:'手机QQ',
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};

