<template>
	<div class="adv-campaign-update">
		
		<div class="crumbs">
			<h4 class="crumbs-title">修改应用</h4>
		</div>
		
		<form id="appcreate_form">
			<div class="form-group">
				<label class="form-title">应用名称</label>
				<input type="text" v-model="appName" class="form-control"  placeholder="例如：愤怒的小鸟">
			</div>
			<div class="form-group">
				<label class="form-title">应用类型</label>
				<select name="" id="" class="form-control" v-model="appType">
					<option v-for="appType in appTypes" value="{{appType.id}}">{{appType.text}}</option>
				</select>
			</div>
			<div class="form-group">
				<label class="form-title" for="">应用平台</label>
				<label class="radio-inline">
					<input type="radio" v-model="appPlatform" name="inlineRadioOptions" id="" checked value="option1"> IOS
				</label>
				<label class="radio-inline">
					<input type="radio" v-model="appPlatform" name="inlineRadioOptions" id="" value="option2"> Android
				</label>
			</div>
			<div class="form-group">
				<label class="form-title">应用描述</label>
				<textarea class="form-control" v-model="appDesc" rows="3" placeholder="请填写描述"></textarea>
			</div>
			<div class="form-group">
				<label class="form-title">应用包名</label>
				<input type="text" class="form-control" v-model="appPackage" placeholder="请填写应用包名">
			</div>
			<div class="form-group">
				<label class="form-title" for="">应用上传</label>
				<input type="file" id="">
			</div>
			<div v-for="appAdv in appAdvs" class="form-group">
				<label class="form-title">广告位</label>
				<input type="hidden" v-model="appAdv.id" />
				<input type="text" class="form-control" placeholder="请输入广告位置名称" v-model="appAdv.advName">
				<select class="form-control" v-model="appAdv.advType">
					<option v-for="advType in advTypes" value="{{advType.id}}">{{advType.text}}</option>
				</select>
				<a class="delete-adv" @click="deleteAdv($index,$event)">删除</a>
			</div>
			<div class="form-group">
				<button type="button" @click="addAdv" class="btn btn-primary next-step">+创建更多广告位</button>
			</div>
			<a @click="update" class="btn btn-success next-step">提交</a>
		</form>
	</div>
</template>

<script>

	module.exports = {
		data:function(){

			return {
				appId:this.$route.query.appId,
				appName : 		'',// 应用名称
				appType : 		'',// 应用类型
				appPlatform :  	'',// 应用平台ISO/ANDROID
				appDesc : 		'',// 应用描述
				appPackage : 	'',// 应用包名
				appTypes:[{id:-1,text:'加载中...'}],
				advTypes:[{id:-1,text:'加载中...'}],
				appAdvs:[]
			};

		},
		ready:function(){
			//加载数据字典  应用类型
			this.$http.get("/v1/dict/dev/apps/type").then(function(res){
				
				var data=res.data;
				
				if(data.ret==1)
					this.appTypes=data.result;
			
			},function(){});
			//加载数据字典 广告位置
			this.$http.get("/v1/dict/dev/apps/advs/type").then(function(res){
				
				var data=res.data;
				
				if(data.ret==1)
					this.advTypes=data.result;

			},function(){});
			// 获取APP信息
			var resource = this.$resource('/v1/dev/app/{appId}');

			resource.get({'appId':this.appId}).then(function(res){

			var data=res.data;
			this.appName = data.result.appName;// 应用名称
			this.appType = data.result.appType;// 应用类型
			this.appPlatform = data.result.appPlatform;// 应用平台ISO/ANDROID
			this.appDesc = data.result.appDesc;// 应用描述
			this.appPackage = data.result.appPackage;// 应用包名		
			},function(){});

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

			addAdv:function(){

				this.appAdvs.push({
					advName:"",
					advType:"1"
				});
			},
			
			deleteAdv:function(index,$event){
				// 删除一个广告位
				this.appAdvs.splice(index, 1);
			},
			
			update: function(){
				//更新应用信息
				this.$http.post("/v1/update/app",{
					appId: 			this.appId,
					appName : 		this.appName,// 应用名称
					appType : 		this.appType,// 应用类型
					appPlatform :  	this.appPlatform,// 应用平台ISO/ANDROID
					appDesc : 		this.appDesc,// 应用描述
					appPackage : 	this.appPackage,// 应用包名
					appAdvs: 		JSON.stringify(this.appAdvs)
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
	};
</script>

<style>
	.adv-campaign-update{
		padding:15px 28px 30px;
		background: white;
	}
	
	.adv-creative-add .crumbs{
		margin-bottom: 20px;
	}
	
	.adv-campaign-update .next-step{
		margin: 0 20px 0 155px; 
	}
	.adv-campaign-update .form-title{
		width: 150px;
		text-align: right;
		padding-right: 15px;
		vertical-align: top;
		margin-top: 5px;
		font-weight: normal;
	}
	.adv-campaign-update input[type='file']{
		display: inline-block;
	}
	.adv-campaign-update .radio-inline{
		line-height: 34px;
	}
	.adv-campaign-update .radio-inline input{
		margin-top: 10px;
	}
	.adv-campaign-update textarea{
		resize:none;
	}
</style>
