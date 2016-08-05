<template>
	<div id="g_top" class='g-top'>
		<div class='g-container clearfix'>
			 <h1 class="pull-left top-logo">
				<a class="logo">ADroi 广告平台</a>
			 </h1>
		</div>
	</div>
	<div class="adm-findpsw">
	
		<h3 class="findpsw-logo">ADroi <span class="font16">找回密码</span></h3>
		<div class="findpsw-content clearfix">
			<ul class="findpsw-title">
				<li class="step step-one">确认账号
					<i class="triangle-right-bg"></i>
					<i class="triangle-right"></i>
				</li>
				<li class="step step-two">邮箱验证
					<i class="triangle-right-bg"></i>
					<i class="triangle-right"></i>
				</li>
				<li class="step step-three">重置密码
				</li>
			</ul>
			<div class="findpsw-body">
				<validator name="validation" >

					<form novalidate name="signForm">
						<div class="form-group">
							<label for="findpsw-account">登录账号</label>
							<input type="text" v-validate:user-name="{ required: true}" v-model="userName" class="form-control" id="findpsw-account" placeholder="请填写您需要找回密码的登录账号"/>
							<div v-if="$validation.userName.touched" class="errors">
								<div v-if="$validation.userName.required">登录账号不能为空</div>
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
							<a type="button" @click="nextStep" :class="{'findpsw-btn':true,btn:true,'btn-save':true,'btn-primary':true,disabled:$validation.invalid}">下一步</a>
							<a type="button" v-link="{path:'/adm/login'}" :class="{'btn-cancel':true,btn:true,'btn-default':true}">取消</a>
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
				userName:"",
				verificationCode:'',
				verificationCodeUrl:'/v1/adm/verificationcode?t='+(+(new Date()))
			};
		},
		validators: {
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
				this.verificationCodeUrl='/v1/adm/verificationcode?t='+(+(new Date()));
			},
			nextStep:function(){
				this.mask();
				var params = {
					userName:this.userName,
					password:this.userPass,
					verificationCode:this.verificationCode,
					accountType:'adm'
				}

				this.$http.post('/v1/adm/signup',params).then(function(res){
					this.unmask();
					var data=res.data;
					
					if(data.ret!=1)
						return $.confirm({
							title: '提示',
							content: data.message,
							confirmButton: '确定',
							cancelButton: false
						});
				
					this.$route.router.go({
						path:'/adm/findpsw/email?userId=' + data.result.userId 
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
	.adm-findpsw{
		margin: 50px auto 0;
		height: 200px;
		width: 700px;
		margin: 0 auto;
	}

	.adm-findpsw .findpsw-logo{
		text-align: center;
		color: #09c;
		margin: 50px 0;
	}

	.adm-findpsw .findpsw-step-box{
		text-align: center;
		height: 35px;
	}

	.adm-findpsw .findpsw-step{
		display: inline-block;
	}

	.adm-findpsw .findpsw-step.active{
		color: #09c;
	}

	.adm-findpsw .step-line{
		margin: 0 20px;
	}

	.adm-findpsw .findpsw-content{
		border: 1px solid #c2c3c7;
		height: 422px;
		background: #fff;
	}
	
	.adm-findpsw .findpsw-tab{
		width: 100%;
		text-align: center;
		display: inline-block; 
		height: 42px;
		line-height: 42px;
		background: #f0f0f0;
		color: #333;
	}

	.adm-findpsw .findpsw-tab:hover{
		text-decoration: none;
	}

	.adm-findpsw .findpsw-tab.active{
		background: #09c;
		color: #fff;
	}

	.adm-findpsw .findpsw-steping{
		color: #09c;
		background: #fff;
		padding: 10px 20px;
	}
	
	.adm-findpsw .findpsw-body{
		background: #fff;
		padding: 65px 85px;
	}
	
	.adm-findpsw .form-control.verification-code{
		width: 220px;
	}

	.adm-findpsw .findpsw-btn{
		margin: 20px 0;
	    width: 150px;
	}

	.adm-findpsw .btn-cancel{
		margin: 20px 0;
	    width: 150px;
	    margin-left: 25px;
	}
	
	.adm-findpsw .verification-code-img{
		width: 100px;
		height:34px;
		border:none 0;
		margin-left: 5px;
	}

	.adm-findpsw .refresh{
		line-height: 34px;
		vertical-align: text-top;
	}
	
	.adm-findpsw .errors{
		color: red;
		margin-top: 5px;
		margin-left: 105px;
	}

	.adm-findpsw .font16{
		font-size: 16px;
	}
	
	.adm-findpsw .form-control{
		width: 330px;
		display: inline-block;
	}

	.adm-findpsw .form-group label{
		width: 100px;
		text-align: right;
		padding-right: 15px;
		font-weight: normal;
	}

	.adm-findpsw .button-group{
		margin-left: 105px;
    	width: 330px;
	}
	/*进度条部分*/
	.adm-findpsw .findpsw-title{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-bottom: 0;
	}

	.adm-findpsw .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.adm-findpsw .step-one{
		width: 33.33%;
		background: #09c;
		color: #fff;
	}
	
	.adm-findpsw .step-two{
		width: 33.33%;
		background: #cccfd3;
		color: #fff;
	}

	.adm-findpsw .step-three{
		width: 33.33%;
		background: #cccfd3;
		color: #fff;
	}

	.adm-findpsw .step-one .triangle-right{
		border-color: transparent transparent transparent #09c;
	}

	.adm-findpsw .step-three .triangle-right,.adm-findpsw .step-two .triangle-right{
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
