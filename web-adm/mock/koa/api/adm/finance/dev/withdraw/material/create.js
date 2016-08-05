var faker = require('faker');

module.exports = {
	title : "上传财务结算凭证物料",
	desc : "上传财务结算凭证物料",
	type : 'POST',
	url : '/v1/adm/dev/withdraws/materials',
	request : {
		material:""//附件
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					// 返回上传应用ID以及Name
					materialId : faker.random.number(),
					materialName : faker.name.firstName()
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
