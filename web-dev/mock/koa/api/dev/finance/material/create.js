var faker = require('faker');

module.exports = {
	title : "开发者上传证件",
	desc : "开发者上传证件",
	type : 'POST',
	url : '/v1/dev/finances/materials',
	request : {
		financeType:2,//2-个人、1-企业
		certificateType:'FIRST_GENERATION_ID_CARD',//证件类型
		material : ""// 附件
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
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
