<template>
	<div id="g_top" class='g-top'>
		<div class='g-container clearfix'>
			 <h1 class="pull-left top-logo">
			 	<a class="logo">ADroi 广告平台</a>
			 </h1>
		</div>
	</div>
	
	<div class="adv-signup">
	
		<h3 class="signup-logo">ADroi <span class="font16">广告主注册</span></h3>
		
		<!-- <div class="signup-step-box">
			<div class="signup-step signup-step-one active">
				<span class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>
				<span>STEP1 - 设置账户</span>
				<span class="step-line">- - -></span>
			</div>
			<div class="signup-step signup-step-two">
				<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
				<span>STEP2 - 填写基本信息</span>
				<span class="step-line">- - -></span>
			</div>
			<div class="signup-step signup-step-three">
				<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
				<span>STEP3 - 注册成功</span>
			</div>
		</div> -->
		
		<div class="signup-content clearfix">
		
			<!-- <div class="signup-title">
				<a v-link="{path:'/adm/signup'}" class="signup-tab active">广告主注册</a>
			</div> -->

			<ul class="signup-title">
				<li class="step step-one">设置账户
					<i class="triangle-right-bg"></i>
					<i class="triangle-right"></i>
				</li>
				<li class="step step-two">填写基本信息
					<i class="triangle-right-bg"></i>
					<i class="triangle-right"></i>
				</li>
				<li class="step step-three">注册成功
				</li>
			</ul>
			
			<!-- <div class="signup-steping">
				<span class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>
				<span>STEP1 - 账户设置</span>
			</div> -->
			
			<div class="signup-body">
			
				<validator name="validation" >

					<form novalidate name="signForm">
					
						<div class="form-group">
							<label>注册账号</label>
							<input type="text" v-validate:user-name="{ required: true}" v-model="userName" class="form-control" autocomplete="off" placeholder="用户名、手机或者邮箱注册，用来登录ADroi平台"/>
							<div v-if="$validation.userName.touched" class="errors">
								<div v-if="$validation.userName.required">用户名/邮箱/手机号不能为空</div>
							</div>
						</div>
						
						<div class="form-group">
							<label for="password">登录密码</label>
							<input type="password" v-validate:user-pass="{required: true, maxlength: 18, minlength: 6}" v-model="userPass" class="form-control" placeholder="6-16个字符，区分大小写"/>

							<div v-if="$validation.userPass.touched" class="errors">
								<div v-if="$validation.userPass.required">密码不能为空！</div>
								<div v-if="!$validation.userPass.required && $validation.userPass.maxlength">密码长度不能大于18位！</div>
								<div v-if="!$validation.userPass.required && $validation.userPass.minlength">密码长度不能小于6位！</div>
							</div>
						</div>
						
						<div class="form-group">
							<label for="password">确认密码</label>
								<input type="password" v-validate:confirm-pass="{required: {rule:true}, maxlength:{rule:18}, minlength:{rule:6},passEqConfirm:{rule:userPass}}" v-model="confirmPass" class="form-control" placeholder="请再次输入密码"/>

							<div v-if="$validation.confirmPass.touched" class="errors">
								<div v-if="$validation.confirmPass.required">密码不能为空！</div>
								<div v-if="!$validation.confirmPass.required && $validation.confirmPass.maxlength">密码长度不能大于18位！</div>
								<div v-if="!$validation.confirmPass.required && $validation.confirmPass.minlength">密码长度不能小于6位！</div>
								<div v-if="!$validation.confirmPass.required && !$validation.confirmPass.maxlength && !$validation.confirmPass.minlength && $validation.confirmPass.passEqConfirm">两次输入密码不一致！</div>
							</div>
						</div>

						<div class="form-group">
							<label for="text">验证码</label>
							<span>
								<input type="text"  class="form-control verification-code" v-validate:verification-code="{ required: true}" v-model="verificationCode" placeholder="请填写验证码"/>
								<img class="verification-code-img" :src="verificationCodeUrl" @click="refreshVerifyCode"/>
								<a href="javascript:void(0)" class="refresh" @click="refreshVerifyCode">刷新</a>
							</span>
							<div v-if="$validation.verificationCode.touched" class="errors">
								<div v-if="$validation.verificationCode.required">验证码不能为空</div>
							</div>
						</div>
						
						<div class="clearfix button-group">
							<a type="button" @click="signUp" :class="{'signup-btn':true,btn:true,'btn-save':true,'btn-primary':true,disabled:$validation.invalid}">下一步</a>
							<a type="button" v-link="{path:'/adv/login'}" :class="{'btn-cancel':true,btn:true,'btn-default':true}">取消</a>
						</div>  
						
					</form>
					
				</validator>
				
			</div>
			
		</div>
		
	</div>
	
	<div class="copyright">上海卓悠网络科技有限公司 沪ICP备14018373号-5</div>
	
</template>

<script>
	
	import SessionUtil from './../../../util/session';
	
	import ApiUtil from './../../../util/api';

	module.exports = {
		data:function(){
			return {
				userName:"",
				userPass:"",
				confirmPass:"",
				verificationCode:'',
				verificationCodeUrl:'about:blank'
			};
		},
		validators: {
			passEqConfirm: function (val,target) {

		     	return target === val;
		    }
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
			refreshVerifyCode:function(){

				var url=ApiUtil.url("/v1/adv/verificationcode?");
				
				url+="t="+(+ (new Date()));
				
				var token=SessionUtil.getToken();
				token ? url+="&token="+token : false;
				
				this.verificationCodeUrl=url;
				
			},
			signUp:function(){
	
				this.mask();
	
				var params = {
					userName:this.userName,
					password:this.userPass,
					verificationCode:this.verificationCode,
					accountType:'adv'
				}

				this.$http.post('/v1/adv/signup',params).then(function(res){
			
					this.unmask();
					
					var data=res.data;
					
					if(data.ret!=1)
						return $.confirm({
							title: '提示',
							content: data.message||'操作失败',
							confirmButton: '确定',
							cancelButton: false
						});

					this.$route.router.go({
						path:'/adv/signup/next?userId=' + data.result.userId 
					});
					
				},function(){

					this.unmask();
					
					$.confirm({
						title: '提示',
						content: '提交失败，请稍后重试',
						confirmButton: '确定',
						cancelButton: false
					});
				
				});

			}
		}
	};
	
</script>

<style>
	.adv-signup{
		margin: 30px auto;
		width:680px;
	}

	.adv-signup .signup-logo{
		text-align: center;
		color: #0098ce;
		margin-bottom: 20px;
	}

	.adv-signup .signup-step-box{
		text-align: center;
		height: 35px;
	}

	.adv-signup .signup-step{
		display: inline-block;
	}

	.adv-signup .signup-step.active{
		color: #0098ce;
	}

	.adv-signup .step-line{
		margin: 0 20px;
	}

	.adv-signup .signup-content{
		border: 1px solid #c2c3c7;
	}
	
	.adv-signup .signup-tab{
		width: 100%;
		text-align: center;
		display: inline-block; 
		height: 42px;
		line-height: 42px;
		background: #f0f0f0;
		color: #333;
		text-decoration: none;
	}

	.adv-signup .signup-tab.active{
		background: #0098ce;
		color: #fff;
	}

	.adv-signup .signup-steping{
		color: #0098ce;
		background: #fff;
		padding: 10px 20px;
	}
	
	.adv-signup .signup-body{
		background: #fff;
		padding: 30px 85px;
	}
	
	.adv-signup .form-control.verification-code{
		width: 220px;
	}

	.adv-signup .signup-btn{
		margin: 20px 0;
	    width: 150px;
	}

	.adv-signup .btn-cancel{
		margin: 20px 0;
	    width: 150px;
	    margin-left: 25px;
	}
	
	.adv-signup .verification-code-img{
		width: 100px;
		height:34px;
		border:none 0;
		margin-left: 5px;
	}

	.adv-signup .refresh{
		line-height: 34px;
		vertical-align: text-top;
	}
	
	.adv-signup .errors{
		color: red;
		margin-left: 105px;
	}

	.adv-signup .font16{
		font-size: 16px;
	}
	
	.adv-signup .form-control{
		width: 330px;
		display: inline-block;
	}

	.adv-signup .form-group label{
		width: 100px;
		text-align: right;
		padding-right: 15px;
		font-weight: normal;
	}

	.adv-signup .button-group{
		margin-left: 105px;
    	width: 330px;
	}
	/*进度条部分*/
	.adv-signup .signup-title{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-bottom: 0;
	}

	.adv-signup .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.adv-signup .step-one{
		width: 33.333333333%;
		background: #0098ce;
		color: #fff;
	}
	
	.adv-signup .step-two{
		width: 33.333333333%;
		background: #d7dadf;
		color: #fff;
	}

	.adv-signup .step-three{
		width: 33.333333333%;
		background: #d7dadf;
		color: #fff;
	}

	.adv-signup .step-one .triangle-right{
		border-color: transparent transparent transparent #0098ce;
	}

	.adv-signup .step-three .triangle-right,.adv-signup .step-two .triangle-right{
		border-color: transparent transparent transparent #d7dadf;
	}

	.adv-signup .signup-title .triangle-right {
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -41px;
		width: 0;
		z-index: 1;
	}

	.adv-signup .signup-title .triangle-right-bg {
		border-color: transparent transparent transparent #fff;
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -43px;
		top: 0px;
		width: 0;
		z-index: 1;
	}
</style>
