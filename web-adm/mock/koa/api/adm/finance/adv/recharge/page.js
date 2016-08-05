var faker = require('faker');

module.exports = {
	title : "获取广告主的充值历史列表",
	desc : "获取广告主的充值历史列表",
	type : 'GET',
	url : '/v1/adm/adv/recharges/:pageNum/:pageSize',
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
					advName : NameArr[faker.random.number().toString().slice(-1)],
					amount : faker.random.number(),
					photo : '',
					operationTime : faker.date.past().getTime()
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
