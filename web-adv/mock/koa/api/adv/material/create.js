var faker = require('faker');

module.exports = {
	title : "广告主上传营业执照附件API",
	desc : "广告主上传营业执照附件API",
	type : 'POST',
	url : '/v1/adv/finances/materials',
	request : {
		material : ""// 附件
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					// 返回上传应用ID以及Name
					materialId : faker.random.number().toString(),
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
