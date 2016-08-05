module.exports = {
	title : "开发者更新应用",
	desc : "开发者更新应用",
	type : 'PUT',
	url : '/v1/dev/apps/:id',
	request : {
		id : "2423",// 应用ID
		name : "捕鱼达人",// 应用名称
		industryCategory1: '1',//类型
		industryCategory2: '2',//类型
		platform : "IOS",// 应用平台ISO/ANDROID
		description : "钱",// 应用描述
		packageName : "com.lpf",// 应用包名
		materialId : 34543,// 应用附件
		adslots : [ {//后台要判定删除的，与已经有的数据做比较，判断哪些是删除的，那些是更新的，哪些是新增的
			id : "3432",// 这个有可能没有的，注意，新增和修改一起的
			name : "广告1",
			type : "Banner"
		}, {
			name : "广告3",
			type : "Banner"
		} ]
	},
	res : {
		ok : {
			ret : 1,
			result : {
				id : "321"
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
