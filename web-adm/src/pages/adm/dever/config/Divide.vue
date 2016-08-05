<template>
	<div class="dev-config">
		
		<div class="crumbs">
			<h4 class="crumbs-title">配置分成比例</h4>
		</div>
		
		<validator name="validation" >

			<form novalidate class="config-form">
			
				<div class="form-group">
					<label class="form-title">开发者名称：</label>
					<input type="text" class="form-control" v-model="devName" readonly placeholder="请填写开发者名称">
				</div>

				<div class="form-group">
					<label class="form-title">应用名称：</label>
					<input type="text" class="form-control" v-model="appName" readonly placeholder="请填写应用名称">
				</div>

				<div class="form-group">
					<label class="form-title">分成比例：</label>
					<input type="text" class="form-control" v-validate:divide="{required: true,percent:true}" v-model="divide" placeholder="请填写分成比例">
					<div v-if="$validation.divide.touched" class="errors">
						<div v-if="$validation.divide.required">分成比例不能为空！</div>
						<div v-if="!$validation.divide.required && $validation.divide.percent">请输入正确的分成比例！</div>
					</div>
				</div>

				<div class="btn-operation">
					<a href="javascript:void(0);" @click="submit" :class="{btn:true,'btn-primary':true,'btn-next':true,'btn-save':true,disabled:$validation.invalid}">保存</a>
					<a  v-link="{path:'/adm/dev/app'}" class="btn btn-default btn-cancel">取消</a>
				</div>
			</form>
		</validator>
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
			devId: 		this.$route.query.devId,
			devName: 	this.$route.query.devName,
			id: 		this.$route.query.id,
			appName: 	this.$route.query.appName,
			divide: 	this.$route.query.divide,
		}
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
	computed:{
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
		submit:function(){

			var me = this;
			
			this.mask();

			this.$http.post("/v1/adm/apps/"+this.id+"/divide",{divide:this.divide}).then(function(res){

				this.unmask();
				
				var data = res.data;

				if(data.ret == 1){
					$.confirm({
						title: '提示',
						content: "配置成功",
						confirmButton: '确认',
						cancelButton:false,
						confirm:function(){
							me.$route.router.go({
								path:'/adm/dev/app'
							});
						}
					});
				}else{
					$.confirm({
						title: '提示',
						content: "配置失败："+data.message,
						confirmButton: '确认',
						cancelButton:false
					});
				}
			},function(){

				this.unmask();
			});
		}
	},
	ready : function() {

	}
};
</script>

<style lang="less">
	
	.dev-config{
		padding:15px 28px 30px;
		background: white;
	}

	.dev-config .config-form{
		padding:20px 0 20px 20px;
	}

	.dev-config .form-title{
		width: 100px;
		text-align: right;
		padding-right: 15px;
		vertical-align: top;
		margin-top: 5px;
	}
	
	.dev-config .submit{
		margin-left: 10px;
	}

	.dev-config .form-control{
		width: 30%;
		display: inline-block;
	}
	
	.dev-config .no-margin{
		margin: 0;
	}

	.dev-config .form-title  .form-control{
		width: 100%;
		display: inline-block;
	}

	.dev-config .btn-operation{
		margin: 40px 20px 0 105px; 
	}

	.dev-config .btn-cancel{
		margin-left: 20px;
	}

	.dev-config .errors{
		color: red;
		margin-left: 10px;
		display:inline-block;
	}
</style>
