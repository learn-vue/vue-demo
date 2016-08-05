<template>
	<div class="dev-sdk-create">
		
		<a v-link="{path:'/dev/app/index'}" class="btn btn-primary btn-common">返回</a>
		
		<ul class="dev-sdk-create-steps">
		
			<li class="step step-one">新增应用
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
		
			<li class="step step-two">创建广告位
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
		
			<li class="step step-three">下载SDK
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
		
			<li class="step step-four">完成
			</li>
		</ul>
		<form class="dev-sdk-create-form">
		
			<div class="form-group">
				<label class="form-title">AppID：</label>
				<input type="text" class="form-control" v-model="appId" readonly />
			</div>
		
			<div v-for="adslot in adslots">
	
				<div class="form-group">
					<label class="form-title">广告位ID：</label>
					<input type="text" v-model="adslot.id" class="form-control" readonly />
				</div>
				
				<div class="form-group">
					<label class="form-title">广告位类型：</label>
					
					<input type="text" value="{{adslot.type | dict adslotTypes}}" class="form-control" readonly />
		
				</div>
	
			</div>
			
			<div class="form-group">
				<label class="form-title">SDK开发包：</label>
				<div v-for="sdk in sdks" class="formline">
					<a href={{sdk.url}} class="download">{{sdk.text}}</a>
				</div>
			</div>

			<div class="btn-operation">
				<a href="javascript:void(0);" @click="back" class="btn btn-default btn-cancel">上一步</a>
				<a href="javascript:void(0);" @click="submitApp" class="btn btn-primary btn-save">提交审核</a>
			</div>
			
		</form>
	</div>
</template>	

<script>
	module.exports = {
	
		data:function(){

			return {
				appId:this.$route.query.appId,
				adslotTypes:[],
				adslots:[],
				sdks:[]
			};

		},
		ready:function(){
	
			//加载数据字典 广告位置
			this.$http.get("/v1/dict/types/adslots").then(function(res){
			
				this.unmask();
			
				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				this.adslotTypes=data.result;
				
			},function(){this.unmask();});
			
			this.mask();
			
			//加载广告位数据
			this.$http.get("/v1/dev/apps/{appId}/adslots",{appId:this.appId}).then(function(res){
			
				this.unmask();
			
				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				if(result && result.length)
					this.adslots=result;
				
			},function(){this.unmask();});
			
			this.mask();
			
			/////////////////////////////////////
			
			//加载SDK下载链接
			this.$http.get("/v1/dev/sdk").then(function(res){
			
				this.unmask();
			
				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				if(result && result.length)
					this.sdks=result;
				
			},function(){this.unmask();});
			
		},
		route:{
			activate: function (transition) {
			 
			  transition.next();
			  
			},
			deactivate: function (transition) {
			 
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
				this.mask();
				
				//更新APP状态，不再是临时态
				this.$http.put("/v1/dev/apps/"+this.appId+"/audit").then(function(res){
					var data = res.data;
					
					if(data.ret != 1){
						this.unmask();
					
						return $.confirm({
								title: '提示',
								content: '提交失败：'+data.message,
								confirmButton: '确定',
								cancelButton: false
							});
					}
					
					this.$route.router.go({
						path:'/dev/app/create/suc'
					});
				
				},function(){this.unmask();});
			},
			back:function(){

				//回到上一步
				this.$route.router.go({
					path:'/dev/app/create/adslot?appId=' + this.appId
				});
			
			}
		}
	}
	
</script>

<style>
	.dev-sdk-create{
		padding:15px 28px 0;
		background-color: white;
		height:100%;
	}

	/*进度条部分*/
	.dev-sdk-create-steps{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-top:20px;
		margin-bottom: 0;
	}

	.dev-sdk-create .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.dev-sdk-create .step-one{
		width: 25%;
		background: #09c;
		color: #fff;
	}
	
	.dev-sdk-create .step-two{
		width: 25%;
		background: #09c;
		color: #fff;
	}
	
	.dev-sdk-create .step-three{
		width: 25%;
		background: #09c;
		color: #fff;
	}

	.dev-sdk-create .step-four{
		width: 25%;
		background: #cccfd3;
	}

	.dev-sdk-create .step-one .triangle-right,.dev-sdk-create .step-two .triangle-right,.dev-sdk-create .step-three .triangle-right{
		border-color: transparent transparent transparent #09c;
	}

	.dev-sdk-create-steps .triangle-right {
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -42px;
		width: 0;
		z-index: 1;
	}

	.dev-sdk-create-steps .triangle-right-bg {
		border-color: transparent transparent transparent #fff;
		border-style: solid;
		border-width: 22px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -46px;
		top: -1px;
		width: 0;
		z-index: 1;
	}

	.dev-sdk-create-form{
		padding: 40px 20px 30px;
		margin-bottom: 20px;
		background-color: #fff;
	}

	.dev-sdk-create .formline{
		display: inline-block;
	}

	.dev-sdk-create .form-title{
		width: 120px;
		text-align: right;
		padding-right: 15px;
		margin-top: 5px;
		font-weight: normal;
	}

	.dev-sdk-create .form-control{
		width: 30%;
		display: inline-block;
	}
	
	.dev-sdk-create .download{
		margin-right:25px;
	}

	.dev-sdk-create .btn-operation{
		margin: 50px 20px 0 125px; 
	}
	
	.dev-sdk-create .btn-save{
		margin-left:20px;
	}

</style>