<template>
	<div class="dev-user-index">
		
		<div class="crumbs">
			<h4 class="crumbs-title">用户管理</h4>
		</div>
		
		<validator name="validation" >

			<form novalidate>
		
				<div class="form-group">
					<label class="form-title"><span class="require">*</span>注册账号：</label>
					<input type="text" class="form-control" placeholder="注册账号" v-model="userName" readonly/>
					
					<a class="btn btn-primary btn-common btn-change-pass" v-link="{path:'/dev/user/password'}">修改密码</a>
				</div>
				
				<div class="form-group">
					<label class="form-title"><span class="require">*</span>真实姓名：</label>
					<input type="text" class="form-control" v-validate:real-name="{required: true}" placeholder="请输入真实姓名" v-model="realName"/>
					<div v-if="$validation.realName.touched" class="errors">
						<div v-if="$validation.realName.required">真实姓名不能为空！</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title" for=""><span class="require">*</span>手机号码：</label>
					<input type="text" class="form-control" v-validate:contact-mobile="{required: true,phone:true}" placeholder="请输入手机号码" v-model="contactMobile"/>

					<div v-if="$validation.contactMobile.touched" class="errors">
						<div v-if="$validation.contactMobile.required">手机号码不能为空！</div>
						<div v-if="!$validation.contactMobile.required && $validation.contactMobile.phone">手机号码格式不正确！</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title"><span class="require">*</span>邮箱：</label>
					<input type="text" v-validate:email="{ required: true,email:true}"  v-model="email" class="form-control" placeholder="请填写邮箱"/>

					<div v-if="$validation.email.touched" class="errors">
						<div v-if="$validation.email.required">邮箱不能为空</div>
						<div v-if="!$validation.email.required && $validation.email.email">邮箱格式不正确！</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title" for="">QQ：</label>
					<input type="text" class="form-control" v-validate:qq="{qq:true}" placeholder="请输入QQ" v-model="contactQq"/>

					<div v-if="$validation.qq.touched" class="errors">
						<div v-if="contactQq != '' && $validation.qq.qq">QQ格式不正确！</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title" for="">微信：</label>
					<input type="text" class="form-control" placeholder="请输入微信号" v-model="contactWechat"/>
				</div>
				
				<div class="operation-bar">
					<a href="javascript:void(0);" @click="updateUser" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:$validation.invalid}">保存修改</a>
					<a href="javascript:void(0);" @click="onCancelClick" class="btn btn-default btn-cancel">取消</a>
				</div>

			</form>

		</validator>

	</div>

</template>

<script>

	module.exports = {
		components:{
			
		},
		data : function() {
			
			return {
				userName:'',
				realName:'',
				contactMobile:'',
				email:'',
				contactQq:'',
				contactWechat:''
			};
		},
		computed:{
		
		},
		validators: {

		},
		ready : function() {

			this.mask();
			
			this.$http.get("/v1/dev/users/current").then(function(res){
				
				this.unmask();

				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				this.userName=result.userName;
				this.realName=result.realName;
				this.email=result.email;
				this.contactMobile=result.contactMobile;
				this.contactQq=result.contactQq;
				this.contactWechat=result.contactWechat
			
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
			onCancelClick:function(){
				
				this.$route.router.go({
					path:'/dev/index'
				});
				
			},
			updateUser: function(){

				this.mask();
				
				this.$http.put("/v1/dev/users/current",{
					userName:this.userName,
					realName:this.realName,
					email:this.email,
					contactMobile:this.contactMobile,
					contactQq:this.contactQq,
					contactWechat:this.contactWechat
				}).then(function(res){
	
					this.unmask();
					
					var data = res.data;

					if(data.ret != 1)
						return $.confirm({
							title: "提示",
							content: '用户修改失败:'+data.message,
							cancelButton: false,
							confirmButton:"确认"
						});
					
					$.confirm({
						title: "提示",
						content: '用户信息修改成功！',
						cancelButton: false,
						confirmButton:"确认"
					});
					
				},function(){
				
					this.unmask();
					
					$.confirm({
						title: '提示',
						content: '系统异常，导出失败！',
						cancelButton:false,
						confirmButton:"确认"
					});
					
				});
				
			}
		}
	};
</script>

<style lang="less">
	
	.dev-user-index{
		padding:15px 28px 0 28px;
		background-color: white;
		height:100%;
	}
	
	.dev-user-index .crumbs-title{
		margin-bottom: 20px;
		margin-top: 0;
	}
	
	.dev-user-index .btn-change-pass{
		margin-left:10px;
	}
	
	.dev-user-index .form-title{
		width: 120px;
		text-align: right;
		padding-right: 15px;
		margin-top: 5px;
		font-weight: normal;
	}

	.dev-user-index .form-control{
		width: 30%;
		display: inline-block;
	}

	.dev-user-index .operation-bar{
		margin:30px 0 30px 125px;
	}

	.dev-user-index .require{
		color: red;
		padding-right: 5px;
	}
	
	.dev-user-index .btn-cancel{
		margin-left: 30px;
	}

	.dev-user-index .errors{
		color: red;
		display:inline-block;
		margin-left:10px;
	}
</style>