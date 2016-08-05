var faker = require('faker');

module.exports = {
	title : "控制应用的投放状态",
	desc : "控制应用的投放状态",
	type : 'PUT',
	url : '/v1/adm/apps/:appId/availabilities',
	request : {
		appId : 344,
		availabilityStatus:"ALLOWED",// "DISALLOWED",二选一
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
