var faker = require('faker');

module.exports = {
	title : "修改应用的配置分成比例",
	desc : "修改应用的配置分成比例",
	type : 'POST',
	url : '/v1/adm/apps/:appId/divide',
	request : {
		divide :'20%'//分成比例// 
	},
	res : {
		ok : {
			ret : 1,
			message : "更新成功"
		},
		err : {
			ret : 0,
			message : "更新失败"
		}
	}
};
