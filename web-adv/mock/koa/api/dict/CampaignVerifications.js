module.exports = {
	title : "广告的状态",
	desc : "广告的状态",
	type : 'GET',
	url : '/v1/dict/campaign/verifications',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				id : 'CREATING',
				text : '创建中'
			}, {
				id : 'PENGDING',
				text : '等待审核'
			}, {
				id : 'APPROVED',
				text : '审核通过'
			}, {
				id : 'DENIED',
				text : '审核拒绝'
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
