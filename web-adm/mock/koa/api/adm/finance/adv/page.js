var faker = require('faker');

module.exports = {
	title : "根据关键词搜索广告主信息",
	desc : "根据关键词搜索广告主信息",
	type : 'GET',
	url : '/v1/adm/adv/finance/:pageNum/:pageSize',
	request : {
		pageNum : 1,// 分页页码，必填
		pageSize : 10,
		keyword : ""// 关键字
	},
	res : {
		fn : function(req, res, query) {

			var results = [];
			var NameArr = ['卡尔玛','蕾欧娜','戴安娜','安妮','布隆','艾希','盖伦','赵信','嘉文','瑞文',]

			for (var i = 0; i < query.pageSize; i++) {
				results.push({
					id : faker.random.number(),
					advName: NameArr[faker.random.number().toString().slice(-1)],
					accountType: faker.random.number().toString().slice(-1) > 5?'个人':'企业',
					certificate:  faker.name.title(),
					submitTime : faker.date.past().getTime()
				});
			}

			return {
				ret : 1,
				result : {
					pageSize : query.pageSize,
					pageNum : query.pageNum,
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
