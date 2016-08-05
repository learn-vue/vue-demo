var faker = require('faker');

module.exports = {
	title : "查看财务数据",
	desc : "查看财务数据",
	type : 'GET',
	url : '/v1/adv/finances/user',
	request : {

	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					contactor : "张三",// 联系人
					contactMobile : "13504923420",// 联系电话
					company : "张三的公司",// 公司名称,企业类型需要
					bankType : "1",// 银行类型
					bankName : "招商银行上海陆家嘴支行",// 银行详细
					bankAccount : "62286765458888",// 银行账号
					materialId : 543,// 附件，营业执照,企业账号需要
					materialName : "反恐精英联合组织.jpg",// 附件，营业执照,企业账号需要
					certificateType : "CERTIFICATE_OF_ORGANIZATION_CODE",// 证件类型
					certificateName : "李四",// 证件名称
					certificateNum : "234345344334"// 证件号码
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
