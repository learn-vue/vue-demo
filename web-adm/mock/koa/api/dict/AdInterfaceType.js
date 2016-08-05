module.exports = {
	title : "交互形式",
	desc : "交互形式",
	type : 'GET',
	url : '/v1/dict/types/adinterfaces',
	request : {

	},
	res : {
		ok : {
			ret : 1,
			result : [ {
				id : 'TEXT',
				text : '文字'
			}, {
				id : 'IMAGE',
				text : '图片'
			}, {
				id : 'IMAGE_TEXT',
				text : '图文'
			} ]
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
