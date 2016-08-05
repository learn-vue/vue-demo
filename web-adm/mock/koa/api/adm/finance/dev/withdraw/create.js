var faker = require('faker');

module.exports = {
	title : "创建开发者提现信息",
	desc : "创建开发者提现信息",
	type : 'POST',
	url : '/v1/adm/dev/withdraws',
	request : {
		devId:'1111',
		amount:'222'
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				message:'提现成功'
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};