var faker = require('faker');

module.exports = {
	title : "查看消息详情",
	desc : "查看消息详情",
	type : 'GET',
	url : '/v1/ads/messages/:messageId',
	request : {},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : {
					id : query.messageId,
					date : faker.date.past(),
					title : '这是一条重要消息',
					content : '你可能注意到这种事件监听的方式违背了传统理念 “separation of concern”。不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护困难。实际上，使用 v-on 有几个好处'
				}
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
