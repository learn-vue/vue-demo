var faker = require('faker');

// ///////|||后台返回数据说明
// ///////|||axisX:['2013-04-05','2015-05-03']，以日期为格式的横轴坐标
// ///////|||axisY:[333,53.2]，以数据为格式的纵轴坐标

module.exports = {
	title : "根据过滤条件查询效果数据序列图表数据",
	desc : "根据过滤条件查询效果数据序列图表数据",
	type : 'GET',
	url : '/v1/adm/stats/dev/adslotOfDay',
	request : {
		startDate : 44444444,
		endDate : 66666666666666,
		appId : '34',
		adsoltId : '443',
		devId:'2222'
	},
	res : {
		fn : function(req, res, query) {

			var rpad = function(v) {
				return v < 10 ? "0" + v : v;
			};

			var startDate = new Date(+query.startDate);

			var endDate = new Date(+query.endDate);

			var axisX = [];

			var numOfAdReq = [], numOfAdRes = [], numOfAdClicks = [], numOfAdImpressions = [], chargeOfImpressions = [], chargeOfClicks = [], ctr = [], cpm = [];

			for (var date = startDate; date.getTime() < endDate.getTime();) {

				axisX.push(date.getFullYear() + "-" + rpad(date.getMonth() + 1)
						+ "-" + rpad(date.getDate()));

				numOfAdReq.push(faker.random.number());// 请求数量
				numOfAdRes.push(faker.random.number());// 有效请求数量
				numOfAdClicks.push(faker.random.number());// 点击数
				numOfAdImpressions.push(faker.random.number());// 展现数量
				chargeOfImpressions.push(faker.random.number());// 展示收入
				chargeOfClicks.push(faker.random.number());// 点击收入
				ctr.push(faker.random.number());// 点击率
				cpm.push(faker.random.number());// 千次展现收入

				date.setDate(date.getDate() + 1);
			}

			return {

				ret : 1,
				result : {
					axisX : axisX,
					numOfAdReq : numOfAdReq,// 请求数量
					numOfAdRes : numOfAdRes,// 有效请求数量
					numOfAdClicks : numOfAdClicks,// 点击数
					numOfAdImpressions : numOfAdImpressions,// 展现数量
					chargeOfImpressions : chargeOfImpressions,// 展示收入
					chargeOfClicks : chargeOfClicks,// 点击收入
					ctr : ctr,// 点击率
					cpm : cpm
				// 千次展现收入
				}
			}
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
