module.exports = {
	title : "广告创意交互形式类型列表",
	desc : "广告创意交互形式类型列表",
	type : 'GET',
	url : '/v1/dict/types/adinteractions',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				id : 'LINK',
				text : '网页链接'
			}, {
				id : 'APP',
				text : '下载应用'
			}]
		},
		err : {
			ret : 0,
			message : "获取失败"
		}
	}
};
