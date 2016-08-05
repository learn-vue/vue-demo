var faker = require('faker');

module.exports = {
	title : "分页查看账号",
	desc : "分页查看账号",
	type : 'GET',
	url : '/v1/adm/accounts/:pageNo/:pageSize',
	request : {
		type:"dev",//dev adm adv分别指代开发者，管理员，广告主
		pageNo : 1,// 分页页码，必填
		pageSize : 10,
		keyword : ""// 关键字
	},
	res : {
		fn : function(req, res, query) {

			var type=query.type;
			
			var typeText='开发者';
			
			if(type=='adm')
				typeText="管理员";
			
			if(type=='adv')
				typeText="广告主";
			
			var results = [];
			for (var i = 0; i < query.pageSize; i++) {
				results.push({
					id : faker.random.number(),
					type : typeText,
					account : faker.name.lastName(),
					companyName : faker.name.title(),
					contractor : faker.name.lastName(),
					phone : faker.date.past()
				});
			}

			return {
				ret : 1,
				result : {
					pageSize : query.pageSize,
					pageNo : query.pageNo,
					totalRecords : 400,
					results : results
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
