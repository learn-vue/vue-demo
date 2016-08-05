<template>
	<div class="dev-app-create">
		
		<a v-link="{path:'/dev/app/index'}" class="btn btn-primary btn-common">返回</a>
		
		<ul class="dev-app-create-steps">
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
		
		<validator name="validation" >

			<form class="dev-app-create-form" novalidate>

				<div class="form-group">
					<label class="form-title">应用名称</label>
					<input type="text" v-validate:name="{ required: true}" class="form-control" placeholder="请填写应用名称" v-model="name"/>
					
					<div v-if="$validation.name.touched" class="errors">
						<div v-if="$validation.name.required">应用名称不能为空</div>
					</div>
				</div>
				
				<div class="form-group">
					<label class="form-title">应用类型</label>
					<select class="form-control industry-category" @change="getIndustryCategories2()" v-model="industryCategory1">
						<option v-for="result in industryCategories1" value="{{result.id}}">{{result.text}}</option>
					</select><select class="form-control industry-category" v-model="industryCategory2">
						<option v-for="result in industryCategories2" value="{{result.id}}">{{result.text}}</option>
					</select>
				</div>

				<div class="form-group">
					<label class="form-title form-title-top">应用平台</label>
					<label class="radio-inline">
						<input type="radio" v-model="platform" value="iOS">iOS
					</label>
					<label class="radio-inline">
						<input type="radio" v-model="platform" value="Android">Android
					</label>
				</div>

				<div class="form-group">
					<label class="form-title form-title-top">应用描述</label>
					<textarea class="form-control" v-validate:description="{required: true, maxlength: 300}" v-model="description" rows="3" placeholder="请填写描述(不超过300字)"></textarea>

					<div v-if="$validation.description.touched" class="errors errors-top">
						<div v-if="$validation.description.required">应用描述不能为空</div>
						<div v-if="!$validation.description.required && $validation.description.maxlength">请不要超过300字</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title">应用包名</label>
					<input type="text" class="form-control" v-validate:package-name="{required: true}" v-model="packageName" placeholder="请填写应用包名">

					<div v-if="$validation.packageName.touched" class="errors">
						<div v-if="$validation.packageName.required">应用包名称不能为空</div>
					</div>
				</div>
				
				<div class="form-group">
					<label class="form-title form-title-top">应用上传</label>
					<div class="file-control">
						<file accepts="apk|ipa"
							upload="/v1/dev/apps/materials"
						  	download="/v1/dev/apps/materials/{materialId}" 
						  	:material-id.sync="materialId" 
						  	:material-name.sync="materialName"></file>
					</div>
				</div>

				<a href="javascript:void(0);" @click="createApp()" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:$validation.invalid}">保存并继续</a>

			</form>

		</validator>
	</div>
</template>	

<script>

	import File from '../../../components/File.vue';
	
	module.exports = {		
		components: {
	   		'file':File
		},
		data:function(){
			return {
				appId:this.$route.query.appId,
				industryCategories1:[{id:"",text:'加载中...'}],
				industryCategories2:[{id:"",text:'请选择应用类型...'}],
				name:'',//名称
				industryCategory1:'',//类型
				industryCategory2:'',//类型
				platform:'iOS',//平台
				description:'',//描述
				packageName:'',//包名称
				materialId:-1,//附件上传路径
				materialName:''//附件上传路径
			}
		},
		route:{
			activate: function (transition) {
			 
			  transition.next();
			  
			},
			deactivate: function (transition) {
			 
				transition.next();
			}
		},
		ready:function(){
		
			this.mask();
		
			//加载数据字典 应用类型
			this.$http.get("/v1/dict/apps/industry/category1").then(function(res){
				
				this.unmask();

				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				this.industryCategories1=data.result;

				if(this.industryCategory1=='')
					this.industryCategory1=this.industryCategories1[0].id;
					
				this.getIndustryCategories2();
				
			},function(){this.unmask();});

			if(!this.appId)
				return;
			
			this.mask();
			
			this.$http.get("/v1/dev/apps/{appId}",{
				appId:this.appId
			}).then(function(res){
				
				this.unmask();

				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				this.name = result.name;//名称
				this.industryCategory1 = result.industryCategory1;//类型
				this.industryCategory2 = result.industryCategory2;//类型
				this.platform = result.platform;//平台
				this.description = result.description;//描述
				this.packageName = result.packageName;//包名称
				this.materialId = result.materialId;//附件上传路径
				this.materialName = result.materialName;//附件上传路径
							
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
			createApp:function(){

				if(!this.materialId || this.materialId==-1)
					return $.confirm({
							title: "提示",
							content: '请先上传应用文件！',
							confirmButton: '确定',
	    					cancelButton: false
						});
							
				this.mask();

				var params = {
					name:this.name,
					industryCategory1:this.industryCategory1,
					industryCategory2:this.industryCategory2,
					platform:this.platform,
					description:this.description,
					packageName:this.packageName,
					materialId:this.materialId
				}

				var promise=null;
			
				//更新
				if(this.appId)
					promise=this.$http.put("/v1/dev/apps/"+this.appId,params)
				else//新增
					promise=this.$http.post("/v1/dev/apps",params);
				
				//创建一个APP
				promise.then(function(res){
	
					var data = res.data;

					if(data.ret!=1){
											
						this.unmask();
					
						return $.confirm({
								title: "提示",
								content: '保存失败!',
								confirmButton: '确定',
	        					cancelButton: false
							});

					}
					
					this.$route.router.go({
						path:'/dev/app/create/adslot?appId=' + data.result.id 
					});
					
				},function(){
					
					this.unmask();
				
					$.confirm({
						title: "提示",
						content: '系统异常，请稍后重试或联系管理员！',
						confirmButton: '确定',
    					cancelButton: false
					});
								
				});
				
			},
			getIndustryCategories2:function(){

				var param = {industryCategory1:this.industryCategory1};
		
				//加载数据字典 应用类型
				this.$http.get("/v1/dict/apps/industry/{industryCategory1}/category2",param).then(function(res){
					
					var data=res.data;
					
					if(data.ret!=1)
						return;
					
					this.industryCategories2=data.result;
					
					if(this.industryCategory2=='')
						this.industryCategory2=this.industryCategories2[0].id;
					
				});
				
			}
		}
	};

</script>

<style>

	.dev-app-create{
		padding:15px 28px 0;
		background-color: white;
		height:100%;
	}

	.dev-app-create-steps{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-bottom: 0;
		margin-top: 20px;
	}

	.dev-app-create .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.dev-app-create .step-one{
		width: 25%;
		background: #09c;
		color: #fff;
	}

	.dev-app-create .step-two{
		width: 25%;
		background: #cccfd3;
		color: #fff;
	}

	.dev-app-create .step-three{
		width: 25%;
		background: #cccfd3;
		color: #fff;
	}

	.dev-app-create .step-four{
		width: 25%;
		background: #cccfd3;
		color: #fff;
	}

	.dev-app-create .step-one .triangle-right{
		border-color: transparent transparent transparent #09c;
	}

	.dev-app-create .step-two .triangle-right{
		border-color: transparent transparent transparent #cccfd3;
	}

	.dev-app-create .step-three .triangle-right{
		border-color: transparent transparent transparent #cccfd3;
	}

	.dev-app-create-steps .triangle-right {
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -42px;
		width: 0;
		z-index: 1;
	}

	.dev-app-create-steps .triangle-right-bg {
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

	.dev-app-create-form{
		padding: 20px 10px;
		margin-bottom: 20px;
		background-color: #fff;
	}

	.dev-app-create .btn-save{
		margin: 0 20px 0 155px; 
	}

	.dev-app-create .form-title{
		width: 150px;
		text-align: right;
		padding-right: 15px;
		margin-top: 5px;
		font-weight: normal;
	}
	
	.dev-app-create .form-title-top{
		vertical-align: top;
	}

	.dev-app-create .file-control{
		display: inline-block;
		margin-right:20px;
		margin-top:5px;
		width:30%;
	}
	
	.dev-app-create textarea{
		resize:none;
	}

	.dev-app-create .radio-inline{
		line-height: 34px;
	}

	.dev-app-create .radio-inline input{
		margin-top: 10px;
	}

	.dev-app-create .form-control{
		width: 30%;
		display: inline-block;
	}

	.dev-app-create .errors{
		color:red;
		margin-left:5px;
		display: inline-block;
	}
	
	.dev-app-create .errors-top{
	    vertical-align: top;
	}

	.dev-app-create .industry-category{
		width: 14.5%;
		margin-right: 1%;
	}
</style>