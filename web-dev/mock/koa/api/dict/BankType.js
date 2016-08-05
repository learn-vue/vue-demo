module.exports = {
	title : "银行类型",
	desc : "银行类型",
	type : 'GET',
	url : '/v1/dict/types/banks',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				id : '1',
				text : '中国银行'
			}, {
				id : '2',
				text : '农业银行'
			}, {
				id : '3',
				text : '工商银行'
			}, {
				id : '4',
				text : '建設银行'
			}, {
				id : '5',
				text : '香港银行'
			}]
		},
		err : {
			ret : 0,
			message : "获取失败"
		}
	}
};
