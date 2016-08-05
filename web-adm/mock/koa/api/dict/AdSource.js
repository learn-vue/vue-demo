module.exports = {
	title : "广告源名称类型",
	desc : "广告源名称类型",
	type : 'GET',
	url : '/v1/dict/types/adSource',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [{
				channelCode: 'SYSTEM',
				channelName : '系统'
			},{
				channelCode: 'BAIDU',
				channelName : '百度'
			}, {
				channelCode : 'WEIBO',
				channelName : '微博'
			}, {
				channelCode : 'WECHAT',
				channelName : '微信'
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
