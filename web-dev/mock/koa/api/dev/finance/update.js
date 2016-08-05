var faker = require('faker');

module.exports = {
	title : "更新当前登录开发者财务数据",
	desc : "更新当前登录开发者财务数据",
	type : 'PUT',
	url : '/v1/dev/finances/user',
	request : {
		financeType : "2",// 账户类型，2=个人，1=企业
		contactor : "张三",// 联系人
		contactMobile : "13504923420",// 联系电话
		company : "张三的公司",// 公司名称,企业类型需要
		accountName : '张三',// 开户名，个人类型需要
		bankType : "1",// 银行类型
		bankName : "招商银行上海陆家嘴支行",// 银行详细
		bankAccount : "62286765458888",// 银行账号
		materailId : 543,// 附件，营业执照,企业账号需要
		certificateType : "FIRST_GENERATION_ID_CARD",// 证件类型
		certificateName : "李四",// 证件名称
		certificateNum : "234345344334"// 证件号码
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {

				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
