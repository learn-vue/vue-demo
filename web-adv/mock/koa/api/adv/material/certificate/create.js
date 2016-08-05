var faker = require('faker');

module.exports = {
	title : "上传广告主的财务证照物料",
	desc : "上传广告主的财务证照物料",
	type : 'POST',
	url : '	/v1/adv/finances/materials',
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
