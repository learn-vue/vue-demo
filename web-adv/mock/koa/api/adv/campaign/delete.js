module.exports = {
	title : "广告主删除推广计划",
	desc : "广告主删除推广计划",
	type : 'DELETE',
	url : '/v1/adv/campaigns/:campaignId',
	request : {
		campaignId : '123'
	},
	res : {
		ok : {
			ret : 1,
			result : {

			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
