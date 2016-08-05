<template>
	<div id="g_top" class='g-top'>
		<div class='g-container clearfix'>
			 <h1 class="pull-left top-logo">
				<a class="logo">ADroi 广告平台</a>
			 </h1>
		</div>
	</div>
	<div class="adv-findpsw-email">
	
		<h3 class="findpsw-logo">ADroi <span class="font16">找回密码</span></h3>
		<div class="findpsw-content clearfix">
			<ul class="findpsw-title">
				<li class="step step-one">邮箱验证
					<i class="triangle-right-bg"></i>
					<i class="triangle-right"></i>
				</li>
				<li class="step step-two">重置密码
					<i class="triangle-right-bg"></i>
					<i class="triangle-right"></i>
				</li>
				<li class="step step-three">完成
				</li>
			</ul>
			<div class="findpsw-body">
				<validator name="validation" >

					<form novalidate name="signForm">
						<div class="form-group">
							<label for="findpsw-email">注册邮箱</label>
							<input type="text" v-validate:email="{ required: true,email:true}" v-model="email" class="form-control" id="findpsw-email" placeholder="请填写您的注册邮箱"/>
							
							<div v-if="$validation.email.touched" class="errors">
								<div v-if="$validation.email.required">注册邮箱不能为空</div>
								<div v-if="!$validation.email.required && $validation.email.email">邮箱格式不正确！</div>
							</div>
						</div>

						<div v-if="sendState==false" class="clearfix button-group">
							<a type="button" 
								@click="sendAuthCode" 
								:class="{'send-btn':true,btn:true,'btn-common':true,'btn-primary':true,disabled:$validation.email.email||$validation.email.required}">
								发送验证码</a>
						</div> 

						<div v-else>
							<div v-else class="clearfix button-group fz12">
								<p>验证码已发送到邮箱，请登录邮箱查看验证码。</p>
								<p>没有收到邮件？<a @click="sendAuthCode">重新发送验证码</a></p>
							</div> 

						</div>
						
						<div class="form-group margintop15">
							<label for="">验证码</label>
							<input type="text" v-validate:auth-code="{ required: true}" v-model="authCode" class="form-control" placeholder="请填写邮箱验证码"/>
							
							<div v-if="$validation.authCode.touched" class="errors">
								<div v-if="$validation.authCode.required">邮箱验证码不能为空</div>
							</div>
						</div>

						<div class="clearfix button-group">
							<a type="button" href="javascript:history.go(-1)" :class="{'btn-cancel':true,btn:true,'btn-default':true}">上一步</a>
							<a type="button" @click="nextStep" :class="{'next-btn':true,btn:true,'btn-save':true,'btn-primary':true,disabled:$validation.invalid}">下一步</a>
						</div> 
					</form>
				</validator>
			</div>
		</div>

		<div class="copyright">上海卓悠网络科技有限公司 沪ICP备14018373号-5</div>
		
	</div>

</template>

<script>

	module.exports = {
		data:function(){
			return {
				sendState:false,
				userName:"",
				verificationCode:'',
				email:'',
				authCode:''
			};
		},
		validators: {
		
		},
		ready:function(){

		},
		methods:{
			mask:function(){
				$(document.body).mask();
			},
			unmask:function(){
				$(document.body).unmask();
			},

			sendAuthCode:function(){
				this.mask();
				var params = { email:this.email};
				this.$http.post('/v1/adv/findpsw/sendEmail', params).then(function(response){
					this.unmask();
					var data = response.data;
					if (data.ret != 1) {
						this.sendState = false;
						return $.confirm({
							title			:	'提示',
							content			: 	data.message,
							confirmButton	:	'确定',
							cancelButton	:	false
						});
					}
					
					this.sendState = true;
				}, function(){});
			
			},
			nextStep:function(){
				this.mask();
				var params = {
					email		:	this.email,
					authCode	:	this.authCode
				}
				
				this.$http.post('/v1/adv/findpsw/confirmEmail', params).then(function(response){
					this.unmask();
					var data = response.data;
					if (data.ret != 1) {
						this.sendState = false;
						return $.confirm({
							title			:	'提示',
							content			: 	data.message,
							confirmButton	:	'确定',
							cancelButton	:	false
						});
					}
					
					var userId = data.result.userId;
					
					this.$route.router.go({
						path:'/adv/findpsw/reset?userId=' + userId
					});
					
				}, function(){});
			}
		}
	};
	
</script>

<style>
	.adv-findpsw-email{
		margin: 50px auto 0;
		height: 200px;
		width: 700px;
		margin: 0 auto;
	}

	.adv-findpsw-email .fz12{
		font-size: 12px;
	}

	.adv-findpsw-email .margintop15{
		margin-top: 15px;
	}

	.adv-findpsw-email .findpsw-logo{
		text-align: center;
		color: #09c;
		margin: 50px 0;
	}

	.adv-findpsw-email .findpsw-step-box{
		text-align: center;
		height: 35px;
	}

	.adv-findpsw-email .findpsw-step{
		display: inline-block;
	}

	.adv-findpsw-email .findpsw-step.active{
		color: #09c;
	}

	.adv-findpsw-email .step-line{
		margin: 0 20px;
	}

	.adv-findpsw-email .findpsw-content{
		border: 1px solid #c2c3c7;
		margin-bottom: 50px;
	}
	
	.adv-findpsw-email .findpsw-tab{
		width: 100%;
		text-align: center;
		display: inline-block; 
		height: 42px;
		line-height: 42px;
		background: #f0f0f0;
		color: #333;
	}

	.adv-findpsw-email .findpsw-tab:hover{
		text-decoration: none;
	}

	.adv-findpsw-email .findpsw-tab.active{
		background: #09c;
		color: #fff;
	}

	.adv-findpsw-email .findpsw-steping{
		color: #09c;
		background: #fff;
		padding: 10px 20px;
	}
	
	.adv-findpsw-email .findpsw-body{
		background: #fff;
		padding: 65px 85px;
	}

	.adv-findpsw-email .next-btn{
		margin: 20px 0;
	    width: 150px;
	    margin-left: 25px;
	    padding: 10px 12px;
	    line-height: 20px
	}

	.adv-findpsw-email .btn-cancel{
		margin: 20px 0;
	    width: 150px;
	    padding: 10px 12px;
	    line-height: 20px
	}

	.adv-findpsw-email .errors{
		color: red;
		margin-top: 5px;
		margin-left: 105px;
	}

	.adv-findpsw-email .font16{
		font-size: 16px;
	}
	
	.adv-findpsw-email .form-control{
		width: 330px;
		display: inline-block;
	}

	.adv-findpsw-email .form-group label{
		width: 100px;
		text-align: right;
		padding-right: 15px;
		font-weight: normal;
	}

	.adv-findpsw-email .button-group{
		margin-left: 105px;
    	width: 330px;
	}
	/*进度条部分*/
	.adv-findpsw-email .findpsw-title{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-bottom: 0;
	}

	.adv-findpsw-email .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.adv-findpsw-email .step-one{
		width: 33.33%;
		background: #09c;
		color: #fff;
	}
	
	.adv-findpsw-email .step-two{
		width: 33.33%;
		background: #cccfd3;
		color: #fff;
	}

	.adv-findpsw-email .step-three{
		width: 33.33%;
		background: #cccfd3;
		color: #fff;
	}

	.adv-findpsw-email .step-one .triangle-right{
		border-color: transparent transparent transparent #09c;
	}

	.adv-findpsw-email .step-three .triangle-right,.adv-findpsw-email .step-two .triangle-right{
		border-color: transparent transparent transparent #cccfd3;
	}

	.findpsw-title .triangle-right {
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -40px;
		width: 0;
		z-index: 1;
	}

	.findpsw-title .triangle-right-bg {
		border-color: transparent transparent transparent #fff;
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -42px;
		top: 0px;
		width: 0;
		z-index: 1;
	}
</style>
