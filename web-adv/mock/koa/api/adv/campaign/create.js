var faker = require('faker');

// 需要注意的事，通过这个接口创建的计划，也是分步骤的，就是说
// 你要考虑创建中状态，最终一步提交，要更改状态的
module.exports = {
	title : "广告主创建推广计划",
	desc : "广告主创建推广计划",
	type : 'POST',
	url : '/v1/adv/campaigns',
	request : {
		name : "",// 计划名称
		budgetAmountTotal : 0,// 计划预算
		budgetAmountDaily : 0,// 计划每日预算
		bidType : "-1",// 计费类型
		bidPrice : 0,// 出价
		endDate: this.endDate,//投放日期
		startDate:this.startDate//投放日期
	},	
	res : {
		fn : function(req, res, query) {
			return {
				ret : 1,
				result : {
					id : faker.random.number().toString()
				}
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
