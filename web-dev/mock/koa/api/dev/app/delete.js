module.exports = {
	title : "开发者删除特定应用",
	desc : "开发者删除特定应用",
	type : 'DELETE',
	url : '/v1/apps/:appId',
	request : {
		appId : '123'// 应用ID
	},
	res : {
		ok : {
			ret : 1,
			result : {

			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
