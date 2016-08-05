var faker = require('faker');

module.exports = {
	title : "个人证件类型",
	desc : "个人证件类型",
	type : 'GET',
	url : '/v1/dict/types/certificates/person',
	request : {
	},
	res : {
		fn : function(req, res, query) {

			return {
				ret : 1,
				result : [
						{
							id : "FIRST_GENERATION_ID_CARD",
							text : "第一代身份证"
						},
						{
							id : "SECOND_GENERATION_ID_CARD",
							text : "第二代身份证"
						},
						{
							id : "PEOPLES_REPUBLIC_OF_CHINA_PASSPORT",
							text : "护照"
						},
						{
							id : "HONG_KONG_IDENTITY_CARD",
							text : "香港居民身份证"
						},
						{
							id : "MAINLAND_TRAVEL_PERMIT_FOR_HONG_KONG_AND_MACAO_RESIDENTS",
							text : "回乡证/港澳居民来往内地通行证"
						}, {
							id : "MAINLAND_TRAVEL_PERMIT_FOR_TAIWAN_RESIDENTS",
							text : "台胞证/台湾居民来往大陆通行证"
						} ]
			};
		},
		err : {
			ret : 0,
			message : "当前用户不存在，请确认"
		}
	}
};
