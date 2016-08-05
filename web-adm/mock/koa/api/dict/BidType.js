module.exports = {
	title : "广告计划计费类型",
	desc : "广告计划计费类型",
	type : 'GET',
	url : '/v1/dict/types/bids',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				id : '1',
				text : 'cpc'
			}, {
				id : '2',
				text : 'cpm'
			}, {
				id : '3',
				text : 'cpd'
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
