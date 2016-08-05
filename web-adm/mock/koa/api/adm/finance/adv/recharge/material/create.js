var faker = require('faker');

module.exports = {
	title : "上传财务结算凭证物料",
	desc : "上传财务结算凭证物料",
	type : 'POST',
	url : '/v1/adm/adv/recharges/materials',
	request : {
		material:""//附件
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,

				result:{
					materialId:'1241',
					materialName:'充值凭证'
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
