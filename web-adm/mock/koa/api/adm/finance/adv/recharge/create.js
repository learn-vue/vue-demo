var faker = require('faker');

module.exports = {
	title : "创建广告主充值信息",
	desc : "创建广告主充值信息",
	type : 'POST',
	url : '/v1/adm/adv/recharges',
	request : {
		advId:'1111',
		amount:'222'
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				message:'充值成功'
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
