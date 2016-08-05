module.exports = {
	title : "DEV-DeleteAPI",
	desc : "更新广告信息",
	type : 'PUT',
	url : '/v1/adv/campaigns/:campaignId',
	request : {
		campaignId : 333,
		name : "",// 计划名称
		budgetAmountTotal : 0,// 计划预算
		budgetAmountDaily : 0,// 计划每日预算
		bidType : "-1",// 计费类型
		bidPrice : 0,// 出价
		endDate: this.endDate,//投放日期
		startDate:this.startDate//投放日期
	},
	res : {
		ok : {
			ret : 1,
			result : {
				id : "321"
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
