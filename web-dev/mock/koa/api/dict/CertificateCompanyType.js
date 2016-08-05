var faker = require('faker');

module.exports = {
	title : "公司证件类型",
	desc : "公司证件类型",
	type : 'GET',
	url : '/v1/dict/types/certificates/company',
	request : {
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : [
						{
							id : "TAX_REGISTRATION_CERTIFICATE",
							text : "税务登记证"
						},
						{
							id : "CERTIFICATE_OF_ORGANIZATION_CODE",
							text : "组织机构代码证"
						},
						{
							id : "PERMIT_FOR_OPENING_BANK_ACCOUNT",
							text : "开户许可证"
						},
						{
							id : "BUSINESS_LICENSE",
							text : "营业执照"
						}]
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
