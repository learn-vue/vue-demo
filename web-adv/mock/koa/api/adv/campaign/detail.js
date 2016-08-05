var faker = require('faker');

module.exports = {
	title : "广告主获取推广计划详情",
	desc : "广告主获取推广计划详情",
	type : 'GET',
	url : '/v1/adv/campaigns/:campaignId',
	request : {
		campaignId : "22"
	},
	res : {
		ok : {
			ret : 1,
			result : {
				id:3333,
				name : "ABC",// 计划名称
				budgetAmountTotal : 3222,// 计划预算
				budgetAmountDaily : 45554,// 计划每日预算
				bidType : "3",// 计费类型
				bidPrice : 532,// 出价
				endDate: faker.date.past().getTime(),//投放日期
				startDate:faker.date.past().getTime()//投放日期
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
