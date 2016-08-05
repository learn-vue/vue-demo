module.exports = {
	title : "加载省份",
	desc : "加载省份",
	type : 'GET',
	url : '/v1/dict/regions/provinces',
	request : {
		countryId:"china"//上一级，国家ID,非必填
	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				id : "henan",
				text : "河南"
			}, {
				id : "shagnhai",
				text : "上海"
			}, {
				id : "shandong",
				text : "山东"
			}, {
				id : "shanxi",
				text : "山西"
			}, {
				id : "111",
				text : "青海"
			}, {
				id : "222",
				text : "黑龙江"
			}, {
				id : "333",
				text : "内蒙古"
			}, {
				id : "444",
				text : "重庆"
			}, {
				id : "555",
				text : "西藏"
			}, {
				id : "666",
				text : "宁夏"
			}, {
				id : "777",
				text : "吉林"
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
