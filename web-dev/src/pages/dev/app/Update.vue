<template>
	<div class="dev-app-update">
		
		<div class="crumbs">
			<h4 class="crumbs-title">修改应用</h4>
		</div>
		
		<validator name="validation" >

			<form novalidate>
				<div class="form-group">
					<label class="form-title">应用名称：</label>
					<input type="text" v-validate:name="{ required: true}" v-model="name" class="form-control"  placeholder="例如：愤怒的小鸟">
					<div v-if="$validation.name.touched" class="errors">
						<div v-if="$validation.name.required">应用名称不能为空</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title">应用类型</label>
					<select class="form-control industryCategory" @change="getIndustryCategoryList2(industryCategory1)" v-model="industryCategory1">
						<option v-for="result in industryCategories1" value="{{result.id}}">{{result.text}}</option>
					</select><select class="form-control industryCategory" v-model="industryCategory2">
						<option v-for="result in industryCategories2" value="{{result.id}}">{{result.text}}</option>
					</select>
				</div>
				
				<div class="form-group">
					<label class="form-title form-title-top">应用平台：</label>
					<label class="radio-inline">
						<input type="radio" v-model="platform" value="iOS"> iOS
					</label>
					<label class="radio-inline">
						<input type="radio" v-model="platform" value="Android"> Android
					</label>
				</div>
				
				<div class="form-group">
					<label class="form-title form-title-top">应用描述：</label>
					<textarea class="form-control" v-validate:description="{required: true, maxlength: 300}" v-model="description" rows="3" placeholder="请填写描述"></textarea>

					<div v-if="$validation.description.touched" class="errors errors-top">
						<div v-if="$validation.description.required">应用描述不能为空</div>
						<div v-if="!$validation.description.required && $validation.description.maxlength">请不要超过300字</div>
					</div>
				</div>
				
				<div class="form-group">
					<label class="form-title">应用包名：</label>
					<input type="text" class="form-control" v-validate:package-name="{required: true}" v-model="packageName" placeholder="请填写应用包名">

					<div v-if="$validation.packageName.touched" class="errors">
						<div v-if="$validation.packageName.required">应用包名称不能为空</div>
					</div>
				</div>
				
				<div class="form-group">
					<label class="form-title form-title-top">应用上传：</label>
					<div class="file-control">
						<file accepts="apk|ipa"
								upload="/v1/dev/apps/materials"
							  	download="/v1/dev/apps/materials/{materialId}" 
							  	:material-id.sync="materialId" 
							  	:material-name.sync="materialName"></file>
					</div>
				</div>
			
				<div v-for="adslot in adslots" class="form-group adslot-list" trace-id="_timestamp">
					<label class="form-title">广告位：</label>
					<input type="hidden" v-model="adslot.id" />
					<input type="text" class="form-control" placeholder="请输入广告位置名称" v-model="adslot.name"><select class="form-control" v-model="adslot.type">
						<option v-for="adslotType in adslotTypes" value="{{adslotType.id}}">{{adslotType.text}}</option>
					</select>
					<a class="delete-adslot" @click="deleteAdslot($index,$event)">删除</a>
				</div>
				
				<div class="form-group">
					<button type="button" @click="addAdslot" class="btn btn-default btn-more">+创建更多广告位</button>
				</div>
				
				<div class="operation-bar">
					<a @click="update" :class="{btn:true,'btn-save':true,'btn-primary':true,disabled:$validation.invalid}">保存</a>
					<a @click="submitApp" class="btn btn-primary btn-save" href="javascript:void(0);">提交审核</a>
					<a href="javascript:history.go(-1)" class="btn btn-default btn-cancel">取消</a>
				</div>
			
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
				industryCategories1:[{id:'',text:'加载中...'}],
				industryCategories2:[{id:'',text:'请选择应用类型...'}],
				appTypes:[{id:'',text:'加载中...'}],
				adslotTypes:[{id:'',text:'加载中...'}],
				id:this.$route.query.appId,
				name:'',//名称
				industryCategory1:'',//类型
				industryCategory2:'',//类型
				platform:'iOS',//平台
				description:'',//描述
				packageName:'',//包名称
				materialId:-1,//附件上传路径
				materialName:'',//附件上传路径
				adslots:[]
			};
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
									
				this.getIndustryCategoryList2(this.industryCategory1);
				
			},function(){this.unmask();});

			/////////////////////////////////////////////////////////////////
			
			this.mask();
			
			//加载数据字典 广告位置
			this.$http.get("/v1/dict/types/adslots").then(function(res){
				this.unmask();
				var data=res.data;
				
				if(data.ret!=1)
					return;
					
				this.adslotTypes=data.result;
			},function(){this.unmask();});

			/////////////////////////////////////////////////////////////////
			
			// 获取APP信息
			var resource = this.$resource('/v1/dev/apps/{appId}');
			resource.get({'appId':this.id}).then(function(res){
				this.unmask();
				
				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				this.name=result.name;//名称
				this.industryCategory1=result.industryCategory1;//类型
				this.industryCategory2=result.industryCategory2;//类型
				this.platform=result.platform;//平台
				this.description=result.description;//描述
				this.packageName=result.packageName;//包名称
				this.materialId=result.materialId;//附件上传路径
				this.materialName=result.materialName;//附件上传路径

			},function(){this.unmask();});


			/////////////////////////////////////////////////////////////////
			
			this.mask();
			var resource = this.$resource('/v1/dev/apps/{appId}/adslots');
			resource.get({appId:this.id}).then(function(res){
				this.unmask();
				var data=res.data;
				
				if(data.ret!=1)
					return;
					
				var timestamp=+new Date();
				var result=data.result;
				for(var i=0,l=result.length;i<l;i++)
					result[i]._timestamp=timestamp+i;
					
				this.adslots = result;
			
			},function(){this.unmask();});
			
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
			addAdslot:function(){
				this.adslots.push({
					_timestamp:+new Date(),
					name:"",
					type:this.adslotTypes[0].id
				});
				
			},
			deleteAdslot:function(index,$event){
				if(this.adslots.length==1)
					return $.confirm({
							title: "提示",
							content: '请至少保留一个广告位数据！',
							confirmButton: '确定',
	    					cancelButton: false
						});
					
				// 删除一个广告位
				this.adslots.splice(index, 1);
			},
			getIndustryCategoryList2:function(id){
				var param = {category1:id}
		
				//加载数据字典 应用类型
				this.$http.get("/v1/dict/apps/industry/{category1}/category2",param).then(function(res){
					var data=res.data;
					
					if(data.ret!=1)
						return;
					
					this.industryCategories2=data.result;
					
					if(this.industryCategory2==''){
						this.industryCategory2=this.industryCategories2[0].id;
						return;
					}
					
					for(var i=0,l=this.industryCategories2.length;i<l;i++)
						if(this.industryCategories2[i]==this.industryCategory2)
							return;
					
					this.industryCategory2=this.industryCategories2[0].id;
				});
				
			},
			
			submitApp:function(){
				if(!this.materialId || this.materialId==-1)
					return $.confirm({
							title: "提示",
							content: '请先上传应用文件！',
							confirmButton: '确定',
	    					cancelButton: false
						});
				
				var adslots=this.adslots;
				for(var i=0,l=adslots.length;i<l;i++)
					if(!adslots[i].name)
						return $.confirm({
								title: "提示",
								content: '请确认已输入广告位名称！',
								confirmButton: '确定',
		    					cancelButton: false
							});
						
				this.mask();
				
				//更新应用信息
				this.$http.put("/v1/dev/apps/"+this.id,{
					id: this.id,
					name : this.name,// 应用名称
					industryCategory1 : this.industryCategory1,
					industryCategory2 : this.industryCategory2,
					platform : this.platform,// 应用平台ISO/ANDROID
					description : this.description,// 应用描述
					packageName : this.packageName,// 应用包名
					materialId : this.materialId,//附件
					adslots : JSON.stringify(this.adslots)
				}).then(function(res){
					var data = res.data;
					if(data.ret != 1) {
						this.unmask();
						return $.confirm({
							title: "提示",
							content: '更新失败:'+data.message,
							confirmButton: '确定',
        					cancelButton: false
						});
					}
					else {
						this.$http.put("/v1/dev/apps/"+this.id+"/audit").then(function(res){
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
								path:'/dev/app/index'
							});
					
						},function(){this.unmask();});
					}
				},function(){
					this.unmask();
					$.confirm({
						title: '提示',
						content: '系统异常，请稍后重试，或联系管理员！',
						confirmButton: '确定',
						cancelButton: false
					});
						
				});

			},
			
			update: function(){
				if(!this.materialId || this.materialId==-1)
					return $.confirm({
							title: "提示",
							content: '请先上传应用文件！',
							confirmButton: '确定',
	    					cancelButton: false
						});
				
				var adslots=this.adslots;
				for(var i=0,l=adslots.length;i<l;i++)
					if(!adslots[i].name)
						return $.confirm({
								title: "提示",
								content: '请确认已输入广告位名称！',
								confirmButton: '确定',
		    					cancelButton: false
							});
						
				this.mask();
				
				//更新应用信息
				this.$http.put("/v1/dev/apps/"+this.id,{
					id: this.id,
					name : this.name,// 应用名称
					industryCategory1 : this.industryCategory1,
					industryCategory2 : this.industryCategory2,
					platform : this.platform,// 应用平台ISO/ANDROID
					description : this.description,// 应用描述
					packageName : this.packageName,// 应用包名
					materialId : this.materialId,//附件
					adslots : JSON.stringify(this.adslots)
				}).then(function(res){
					this.unmask();
					var data = res.data;

					if(data.ret != 1)
						return $.confirm({
							title: "提示",
							content: '更新失败:'+data.message,
							confirmButton: '确定',
        					cancelButton: false
						});
					
					var self=this;
					
					$.confirm({
						title: '提示',
						content: '更新成功',
						confirmButton: '确定',
						cancelButton: false,
						confirm:function(){self.$route.router.go({path:'/dev/app/index'});}
					});
					
					
				},function(){
					this.unmask();
					$.confirm({
						title: '提示',
						content: '系统异常，请稍后重试，或联系管理员！',
						confirmButton: '确定',
						cancelButton: false
					});
						
				});
			}
		}
	};
</script>

<style>
 	.dev-app-update{
 		padding:15px 28px 30px;
		background: white;
 	}

	.dev-app-update .crumbs{
		margin-bottom:20px;
	}

	.dev-app-update .form-title{
		width: 120px;
		text-align: right;
		padding-right: 15px;
		margin-top: 5px;
	}

	.dev-app-update .form-title-top{
		vertical-align:top;
	}
	
	.dev-app-update .form-control{
		width: 30%;
		display: inline-block;
	}
	
	.dev-app-update .file-control{
		display:inline-block;
		margin-top: 5px;
	}
	
	.dev-app-update .btn-more{
		margin: 20px 0 40px 125px; 
	}
	
	.dev-app-update .adslot-list .form-control{
		width: 14.5%;
		margin-right: 1%;
	}
	
	.dev-app-update .delete-adslot{
		margin-left:20px;
		cursor:pointer;
	}

	.dev-app-update textarea{
		resize:none;
	}

	.dev-app-update .operation-bar{
		margin:20px 0 40px 125px;
	}

	.dev-app-update .btn-save{
		margin-right: 30px;
	}

	.dev-app-update .errors{
		color: red;
		margin-left: 5px;
		display:inline-block;
	}
	
	.dev-app-update .errors-top{
		vertical-align:top;
	}

	.dev-app-update .industryCategory{
		width: 14.5%;
		margin-right: 1%;
	}
</style>
