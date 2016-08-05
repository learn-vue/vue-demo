module.exports = {
	title : "加载国家",
	desc : "加载国家",
	type : 'GET',
	url : '/v1/dict/regions/countries',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				id : "china",
				text : "中国"
			}, {
				id : "japan",
				text : "日本"
			}, {
				id : "american",
				text : "美国"
			}]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
