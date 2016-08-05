
// API 服务器地址
//var _apiServer_ = "http://adm.adroi.com.cn/api";
// var _apiServer_ = "'http://114.55.53.19:8090/BE-adm";
 var _apiServer_ = "http://droi.reachinet.cn/BE-adm";
// var _apiServer_ = "http://192.168.1.104:8090/BE-adm";

// 是否请求API服务器：true为请求，false为不请求
var _publish_ = true;

var config={
		login:'/adm/login',
		index:'/adm/adv/campaign',
		apiServer: _apiServer_,
		publish: _publish_
 };

export default config;
