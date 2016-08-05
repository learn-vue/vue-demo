var faker = require('faker');

module.exports = {
	title : "上传开发者的财务证照物料",
	desc : "上传开发者的财务证照物料",
	type : 'POST',
	url : '/v1/dev/finances/materials/certificate',
	request : {
		financeType : "1",// 1-个人账户，2-企业账户
		certificateType:"",//个人账户会传递此参数，见API列出来的类型，/v1/dict/types/certificates
		cardType : 1,// 个人账户会传递此参数，1正面，2反面
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
