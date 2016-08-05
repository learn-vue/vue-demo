var faker = require('faker');

module.exports = {
	title : "分页查看财务结算数据",
	desc : "分页查看财务结算数据",
	type : 'GET',
	url : '/v1/adv/finances/settles/:pageNum/:pageSize',
	request : {
		pageNum : 1,// 分页页码，必填
		pageSize : 10,
		startDate : 444444,
		endDate : 55555555555
	},
	res : {
		fn : function(req, res, query) {

			var results = [];
			for (var i = 0; i < query.pageSize; i++) {
				results.push({
					date : faker.date.past().getTime(),
					depositAmount : faker.finance.amount(),// 收入
					withdrawLAmount : faker.finance.amount()
				// 结算
				});
			}

			return {
				ret : 1,
				result : {
					pageSize : query.pageSize,
					pageNum : query.pageNum,
					total : 400,
					list : results
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
