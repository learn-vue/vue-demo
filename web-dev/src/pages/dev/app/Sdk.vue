<template>
	<div class="app-sdk">
		<h4>下载SDK</h4>
		<form id="downloadSDK">
			<div class="form-group">
				<label class="form-title">AppID</label>
				<input type="text" class="form-control" v-model="appId"  placeholder="06b081b5">
			</div>
			<div  v-for="appAdv in appAdvs">
				<div class="form-group">
					<label class="form-title">广告位类型</label>
					<input type="text" v-model="appAdv.advType" class="form-control"  placeholder="Banner">
				</div>
				<div class="form-group">
					<label class="form-title">广告位ID</label>
					<input type="text" v-model="appAdv.id" class="form-control"  placeholder="s33884e6">
				</div>
			</div>
			
			<div class="form-group">
				<label class="form-title">SDK文档</label>
				<div class="formline">
					<a href="javascript:void(0)">IOS SDK下载</a>
					<a href="javascript:void(0)">Android SDK下载</a>
				</div>
			</div>
			<button type="button" @click="submitApp" class="btn btn-success next-step">提交审核</button>
		</form>
	</div>
</template>	

<script>
	module.exports = {
		data:function(){

			return {
				appId:this.$route.query.appId,
				appAdvs:[]
			};

		},
		ready:function(){
			//获取广告位置

			var params = {};
			
			params.appId=this.appId;
			
			var resource = this.$resource('/v1/dev/app/{appId}/advs');
			
			resource.get(params).then(function(res){

				var data=res.data;
				
				if(data.ret==1)
					this.appAdvs = data.result;
			
			},function(){});
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
		methods:{
			//遮罩
			mask:function(){
				
				$(document.body).mask();
		
			},
			//遮罩
			unmask:function(){
				
				$(document.body).unmask();
			
			},
			submitApp:function(){

				//创建一个APP
				this.$http.post("/v1/dev/app/succ",{
					status: 		'1',
					appId: 		 	this.appId
				}).then(function(res){

					var data = res.data;
					
					if(data.ret == 1){
						this.$route.router.go({
							path:'/dev/app/index'
						});
					}

				},function(){});
			}
		}
	}
	
</script>

<style>
	.app-sdk{
		margin-bottom: 40px;
	}
	.app-sdk h4{
		font-weight: bold;
		margin: 20px;
	}
	.app-sdk .formline{
		display: inline-block;
		line-height: 34px;
	}
	.app-sdk .formline a{
		text-decoration: underline;
	}
	.app-sdk .next-step{
		margin: 0 20px 0 155px; 
	}
	.app-sdk .form-title{
		width: 150px;
		text-align: right;
		padding-right: 15px;
		vertical-align: top;
		margin-top: 5px;
		font-weight: normal;
	}
	.app-sdk .form-control{
		width: 226px;
		display: inline-block;
	}
</style>