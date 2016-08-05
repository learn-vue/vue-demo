<template>
	<div class="adm-adv-config">
		
		<div class="crumbs">
			<h4 class="crumbs-title">配置</h4>
		</div>

		<form class="config-form">
		
			<div class="form-group">
				<label class="form-title">账户名称：</label>
				<input type="text" class="form-control" v-model="advName" readonly placeholder="请填写账户名称">
			</div>

			<div class="form-group">
				<label class="form-title">计划ID：</label>
				<input type="text" class="form-control" v-model="campaignId" readonly placeholder="请填写计划ID">
			</div>

			<div class="form-group">
				<label class="form-title">计划名称：</label>
				<input type="text" class="form-control" v-model="campaignName" readonly placeholder="请填写计划名称">
			</div>

			<div class="form-group">
				<label class="form-title">创意ID：</label>
				<input type="text" class="form-control" placeholder="请填写创意ID" readonly v-model="creativeId">
			</div>

			<div class="form-group">
				<label class="form-title">创意名称：</label>
				<input type="text" class="form-control" placeholder="请填写创意名称" readonly v-model="creativeName">
			</div>

			<div class="form-group">
				<label class="form-title">广告类型：</label>
				<input type="text" class="form-control" placeholder="请填写广告类型：" @blur="doBlur()" readonly v-model="adTypeOnProduct | dict adslotTypes">
			</div>

			<div class="form-group" v-for="media in medias" track-by="_timestamp">
				
				<label class="form-title">定向媒体：</label>
				
				<input type="text" class="form-control media-group" @blur="doBlurValidate($index,media.mediaId)" placeholder="请输入媒体ID" v-model="media.mediaId"><input type="text" class="form-control media-group" placeholder="请填写媒体ID" @blur="doBlur()" readonly v-model="media.mediaName">
				
				<!-- <select class="form-control media-group" v-model="media.advType">
					<option v-for="adslotType in adslotTypes" value="{{adslotType.id}}">{{adslotType.text}}</option>
				</select> -->

				<a class="delete-adv" @click="deleteAdv($index,$event)">删除</a>
				
				<div id="errors_mediaId_{{$index}}" class="errors">媒体ID不能为空</div>
			
			</div>

			<div class="form-group">
				<label class="form-title"></label>
				<a href="javascript:void(0);" @click="addMedia" class="btn btn-default btn-more">+ 添加更多媒体</a>
			</div>

			<div class="btn-operation">
				<a href="javascript:void(0);" @click="doSubmitAction" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:!allowNext}">保存</a>
				<a  v-link="{path:'/adm/adv/campaign'}" class="btn btn-default btn-cancel">取消</a>
			</div>

		</form>
	</div>

</template>

<script>

module.exports = {
	props: {
	},
	components:{
	},
	data : function() {
		return {
			allowNext:true,
			advId:this.$route.query.advId,
			advName:this.$route.query.advName,
			campaignId:this.$route.query.campaignId,
			campaignName:this.$route.query.campaignName,
			creativeId:this.$route.query.creativeId,
			creativeName:this.$route.query.creativeName,
			adTypeOnProduct:this.$route.query.adTypeOnProduct,
			medias:[{
				mediaName:'请填写媒体ID',
				medieId:'',
				_timestamp:-1
			}],//所有媒體類型列表
			adslotTypes:[{id:"-1",text:"加载中"}]//所有廣告類型
		};
	},
	route:{
		activate: function (transition) {
		 
		  transition.next();
		  
		},
		deactivate: function (transition) {
		 
		 	this.unmask();
		 	
			transition.next();
		}
	},
	ready : function() {

		this.mask();
			
		//加载数据字典 广告位置
		this.$http.get("/v1/dict/types/adslots").then(function(res){
		
			this.unmask();
		
			var data=res.data;
			
			if(data.ret!=1)
				return;
			
			this.adslotTypes=data.result;
		
			if(this.medias.length && this.medias[0].id=='-1')
				this.medias[0].id=this.adslotTypes[0].id;
				
		},function(){this.unmask();});
		
		///////////////////////////////////////////////////////////////

		this.mask();
		
		var params={
			advId:this.advId,
			campaignId:this.campaignId,
			creativeId:this.creativeId
		};
		
		var resource = this.$resource('/v1/adm/campaigns/{campaignId}/creatives/{creativeId}/targetings');
		
		resource.get(params).then(function(res){
		
			this.unmask();
			
			var data=res.data;
			
			//Error
			if(data.ret!=1)
				return;
		
			var result=data.result;
			
			var timestamp=+(new Date());
			for(var i=0,l=result.length;i<l;i++)
				result[i]._timestamp=timestamp+i;
				
			this.medias=result;

		},function(){this.unmask();});
		
	},
	methods:{
		//遮罩
		mask:function(){
			
			$(document.body).mask();
	
		},
		//遮罩
		unmask:function(){
			
			$(document.body).unmask();
		
		},
		addMedia:function(){
			
			this.medias.push({
				mediaName:'请填写媒体ID',
				mediaId:'',
				_timestamp:+(new Date())
			});

			this.allowNext=false;
		},
		deleteAdv:function(index,$event){
			
			// if(this.medias.length==1)
			// 	return $.confirm({
			// 				title: '提示',
			// 				content: '请至少保留一个定向媒体数据！',
			// 				confirmButton: '确定',
			// 				cancelButton: false
			// 			});
				
			// 删除一个广告源
			this.medias.splice(index, 1);
			
			if(this.allowNext===false)
				this.calAllowNext();
				
		},
		getMediaName:function(index,mediaId){

			var params={
				mediaId:mediaId
			};
			
			var resource = this.$resource('/v1/adm/campaigns/mediaName');
			
			resource.get(params).then(function(res){
			
				this.unmask();
				
				var data=res.data;
				
				//Error
				if(data.ret!=1)
					return;
			
				var result=data.result;
	
				var timestamp=+(new Date());
				
				this.medias[index]._timestamp=timestamp+index;
					
				this.medias[index].mediaName = result.mediaName

			},function(){this.unmask();});
		},
		doBlurValidate:function(index,mediaId){

			this.getMediaName(index,mediaId);
				
			var media=this.medias[index];
			
			var showError = !media.mediaId;

			document.getElementById("errors_mediaId_"+index).style.display=showError ? "block" : "none";
	
			if(showError)
				this.allowNext=false;
			else
				this.calAllowNext();
						
		},
		doBlur:function(){

			this.adTypeOnProduct = this.$route.query.adTypeOnProduct;
		},
		calAllowNext:function(){

			for(var i=0,l=this.medias.length;i<l;i++)
				if(!this.medias[i].mediaId){
					
					this.allowNext=false;
					
					return;
				}
					
			this.allowNext=true;
			
		},
		doSubmitAction:function(){
			
			this.mask();

			this.$http.post("/v1/adm/campaigns/"+this.campaignId+"/creatives/"+this.creativeId+"/targetings",{
				advId:this.advId,
				medias:JSON.stringify(this.medias)
			}).then(function(res){

				this.unmask();
				
				var data = res.data;

				if(data.ret != 1)
					return $.confirm({
								title: '提示',
								content: "配置失败："+data.message,
								confirmButton: '确定',
								cancelButton: false
							});
							
				$.confirm({
					title: '提示',
					content: '配置成功',
					confirmButton: '确定',
					cancelButton: false
				});
						
			},function(){this.unmask();});
			
		}
	}
};
</script>

<style lang="less">
	
	.adm-adv-config{
		padding:15px 28px 30px;
		background: white;
	}

	.adm-adv-config .config-form{
		padding:20px 0 20px 20px;
	}

	.adm-adv-config .form-title{
		width: 100px;
		text-align: right;
		padding-right: 15px;
		vertical-align: top;
		margin-top: 5px;
	}

	.adm-adv-config .form-control{
		width: 40%;
		display: inline-block;
	}

	.adm-adv-config .form-title  .form-control{
		width: 100%;
		display: inline-block;
	}
	
	.adm-adv-config .btn-more{
		margin-top:15px;
		margin-bottom:60px;
	}
	
	.adm-adv-config .btn-operation{
		margin: 20px 20px 10px 105px; 
	}

	.adm-adv-config .btn-cancel{
		margin-left:30px;
	}
	
	.adm-adv-config .media-group{
		width: 19.5%;
		margin-right: 1%;
	}
	
	.adm-adv-config .errors{
		display:none;
		color: red;
		margin-left: 105px;
	}
	
	.adm-adv-config .delete-adv{
		margin-left:40px;
		cursor:pointer;
	}

</style>
