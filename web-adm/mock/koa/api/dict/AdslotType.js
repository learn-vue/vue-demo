module.exports = {
	title : "广告位类型",
	desc : "广告位类型",
	type : 'GET',
	url : '/v1/dict/types/adslots',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				id : 'BANNER',
				text : '横幅'
			}, {
				id : 'SPLASH',
				text : '开屏'
			}, {
				id : 'INTERSTITIAL',
				text : '插屏'
			}, {
				id : 'NATIVE',
				text : '原生'
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
