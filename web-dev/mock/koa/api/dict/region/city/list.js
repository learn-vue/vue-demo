module.exports = {
	title : "加载省份",
	desc : "加载省份",
	type : 'GET',
	url : '/v1/dict/regions/cities',
	request : {
		provinceId:"233"//上一级，省/市ID,非必填
	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				id : "闵行区",
				text : "闵行区"
			}, {
				id : "黄浦区",
				text : "黄浦区"
			}, {
				id : "浦东新区",
				text : "浦东新区"
			}, {
				id : "静安区",
				text : "静安区"
			}, {
				id : "普陀区",
				text : "普陀区"
			}]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
