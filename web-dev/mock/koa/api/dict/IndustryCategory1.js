module.exports = {
	title : "应用类型列表",
	desc : "应用类型列表",
	type : 'GET',
	url : '/v1/dict/apps/industry/category1',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				id : '1',
				text : '图书'
			}, {
				id : '2',
				text : '教育'
			}, {
				id : '3',
				text : '娱乐'
			}, {
				id : '4',
				text : '游戏'
			}, {
				id : '5',
				text : '医疗'
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
