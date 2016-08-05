
// API 服务器地址
// var _apiServer_ = "http://adv.adroi.com.cn/api";
// var _apiServer_ = "'http://114.55.53.19:8090/BE-adv";
 var _apiServer_ = "http://droi.reachinet.cn/BE-adv";
// var _apiServer_ = "http://192.168.1.104:8090/BE-adv";

// 是否请求API服务器：true为请求，false为不请求
var _publish_ = true;

var config={
		login:'/adv/login',
		index:'/adv/index',
		apiServer: _apiServer_,
		publish: _publish_
};

export default config;