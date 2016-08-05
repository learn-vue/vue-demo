var faker = require('faker');

module.exports = {
	title : "开发者创建应用第一步API",
	desc : "开发者创建应用第一步API",
	type : 'POST',
	url : '/v1/dev/apps/materials',
	request : {
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
