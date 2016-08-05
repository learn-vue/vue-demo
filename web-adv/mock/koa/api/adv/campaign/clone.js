var faker = require('faker');

module.exports = {
	title : "根据传递的ID，复制一个广告计划，深度复制",
	desc : "根据传递的ID，复制一个广告计划，深度复制",
	type : 'POST',
	url : '/v1/adv/campaigns/:campaignId/clone',
	request : {
		campaignId : "22"
	},
	res : {
		ok : {
			ret : 1,
			result : {
				id : faker.random.number().toString()
			// 返回新创建的ID
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
