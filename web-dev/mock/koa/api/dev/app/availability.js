var faker = require('faker');

module.exports = {
	title : "开发者启用、停用应用投放",
	desc : "开发者启用、停用应用投放",
	type : 'PUT',
	url : '/v1/dev/apps/:appId/availabilities/:availabilityStatus',
	request : {
		appId : 344,
		availabilityStatus : "ALLOWED ",// "DISALLOWED",二选一
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {}
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
