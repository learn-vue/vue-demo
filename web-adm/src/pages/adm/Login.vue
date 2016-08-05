<template>
	<div id="g_top" class='g-top'>
		<div class='g-container clearfix'>
			<h1 class="pull-left top-logo">
			 	<a class="logo">ADroi 广告平台</a>
			 </h1>
		</div>
	</div>
	
	<div class="adm-login">
	
		<h3 class="login-logo">ADroi 登录</h3>
		
		<div class="login-content">
		
			<div class="login-title">
				<a v-link="{path:'/adm/login'}" class="login-tab active">管理员账号</a>
			</div>
			
			<div class="login-body">
			
				<validator name="validation" >

					<form novalidate>
					
						<div class="form-group">
							<label for="userName">用户名/邮箱/手机号</label>
							<input type="text" v-validate:user-name="{ required: true}" v-model="userName" autocomplete="off" class="form-control" id="userName" placeholder="请填写用户名/邮箱/手机号"/>
							<div v-if="$validation.userName.touched" class="errors">
								<div v-if="$validation.userName.required">用户名/邮箱/手机号不能为空</div>
							</div>
						</div>

						<div class="form-group">

							<label for="password">密码</label>
							<input type="password" v-validate:user-pass="{ required: true,maxlength: 18, minlength: 6}" v-model="userPass" autocomplete="off" class="form-control" placeholder="请填写密码"/>
							<div v-if="$validation.userPass.touched" class="errors">
								<div v-if="$validation.userPass.required">密码不能为空</div>
								<div v-if="!$validation.userPass.required && $validation.userPass.maxlength">密码长度不能大于18位！</div>
								<div v-if="!$validation.userPass.required && $validation.userPass.minlength">密码长度不能小于6位！</div>
							</div>
						</div>

						<div class="form-group">
							<label for="text">验证码</label>
							<div>
								<img class="pull-right verification-code-img" :src="verificationCodeUrl" @click="refreshVerifyCode"/>
								<input type="text"  class="form-control verification-code" v-validate:verification-code="{ required: true}" v-model="verificationCode" placeholder="请填写验证码"/>
							</div>
							<div v-if="$validation.verificationCode.touched" class="errors">
								<div v-if="$validation.verificationCode.required">验证码不能为空</div>
							</div>
						</div>

						<div class="checkbox">
							<label class="pull-left">
								<input type="checkbox"> 记住密码
							</label>
							<a href="javascript:void(0)" class="pull-right" @click="refreshVerifyCode">刷新</a>
						</div>

						<div class="clearfix">
							<a href="javascript:void(0)" type="submit" class="login-btn btn-common" @click="signin" :class="{btn:true,'btn-primary':true,disabled:$validation.invalid}">登录</a>
						</div>

						<div class="login-foot">
							<a href="javascript:void(0)" class="pull-left" v-link="{path:'/adm/findpsw/email'}">忘记密码？</a>
						</div>
						
					</form>
					
				</validator>
				
			</div>
			
		</div>
		
	</div>
	
	<div class="copyright">上海卓悠网络科技有限公司 沪ICP备14018373号-5</div>
	
</template>

<script>

	import SessionUtil from './../../util/session';
	
	import ApiUtil from './../../util/api';
	
	import Config from './../../config';
	
	module.exports = {
		data:function(){
			return {
				userName:"",
				userPass:"",
				verificationCode:'',
				verificationCodeUrl:'about:blank'
			};
		},
		ready:function(){
		
			this.refreshVerifyCode();
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
			signin:function(){
				
				this.mask();
				
				this.$http.post('/v1/login/adm',{
					userName:this.userName,
					userPass:this.userPass,
					verificationCode:this.verificationCode
				}).then(function(res){
			
					this.unmask();
					
					var data=res.data;
					
					if(data.ret!=1)
						return $.confirm({
								title: "提示",
								content: '登录失败:'+data.message,
								confirmButton: '确定',
	        					cancelButton: false
							});
					
					var result=data.result;
					
					SessionUtil.setUser(result.user);
	
					var index=Config.index;
					
					var path=this.$route.query.redirectPath;
					
					path=path || SessionUtil.getLastPath();
					
					path=path || index;
					
					if(path===Config.login)
						path=index;
						
					this.$route.router.go({path:path});
					
				},function(){this.unmask();});
				
			},
			refreshVerifyCode:function(){

				var url=ApiUtil.url("/v1/adm/verificationcode?");
				
				url+="t="+(+ (new Date()));
				
				var token=SessionUtil.getToken();
				token ? url+="&token="+token : false;
				
				this.verificationCodeUrl=url;
				
			}
		}
	};
	
</script>

<style>
	body{
		background: #eaedf1;
	}

	.adm-login{
		margin: 30px 35%;
	}

	.adm-login .login-logo{
		text-align: center;
		color: #0098ce;
		margin-bottom: 20px;
	}

	#div-login .login-content{
		border: 1px solid #c2c3c7;
	}
	
	.adm-login .login-tab{
		width:100%;
		text-align: center;
		display: block; 
		height: 40px;
		line-height: 40px;
		background: #f0f0f0;
		color: #333;
		text-decoration: none;
	}

	.adm-login .login-tab.active{
		background: #0098ce;
		color: #fff;
	}
	
	.adm-login .login-body{
		background: #fff;
		padding: 30px 40px;
	}

	.adm-login .login-body label{
		font-weight: normal;
	}
	
	.adm-login .verification-code{
		width: 60%;
	}

	.adm-login .login-btn{
		margin: 20px 0;
	    padding-bottom: 10px;
	    padding-top: 10px;
	    width: 100%;
	    line-height: 20px;
	}

	.adm-login .login-foot{
		margin-bottom: 20px;
	}
	
	.adm-login .verification-code-img {
	    border: 0 none;
	    height: 34px;
	    width: 38%;
	}

	.adm-login .errors{
		color: red;
		margin-top: 5px;
	}
</style>
