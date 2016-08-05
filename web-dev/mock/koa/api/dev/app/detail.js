module.exports = {
	title : "查看APP",
	desc : "查看APP",
	type : 'GET',
	url : '/v1/dev/apps/:appId',
	request : {
		appId : "22"// 应用ID
	},
	res : {
		ok : {
			ret : 1,
			result : {
				id : "22",// 应用ID
				name : '愤怒的小鸟',// 应用名称
				industryCategory1: '1',//类型
				industryCategory2: '2',//类型
				platform : 'Android',// 应用平台ISO/ANDROID
				description : '非常好玩的游戏',// 应用描述
				packageName : 'bird.apk',// 应用包名
				materialId:433,//附件Id
				materialName:"貓和老鼠.apk"//附件名稱
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
