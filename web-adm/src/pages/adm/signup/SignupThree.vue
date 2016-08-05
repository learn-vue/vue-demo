<template>

	<div id="g_top" class='g-top'>
		<div class='g-container clearfix'>
			 <h1 class="pull-left top-logo">
			 	<a class="logo">ADroi 广告平台</a>
			 </h1>
		</div>
	</div>
	
	<div class="adm-signup-success">
		
		<h3 class="signup-logo">ADroi <span class="font16">管理员注册</span></h3>
		
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
				
				<div class="signup-success-info">
					<span class="glyphicon glyphicon-ok-sign success-icon" aria-hidden="true"></span>
					<h4>注册成功啦 : )</h4>
				</div>
				
				<div class="clearfix">
					<button type="submit" class="btn btn-primary btn-save signup-btn" v-link="{path:'/adm/login'}">进入ADroi平台</button>
				</div>
				 
			</div>
			
		</div>
	</div>
	
	<div class="copyright">上海卓悠网络科技有限公司 沪ICP备14018373号-5</div>
	
</template>

<script>

	import Vue from 'vue';
	
	module.exports = {
		components: {
		   
		},
		data:function(){
			return {
				signupName:''
			};
		},
		methods:{
			//遮罩
			mask:function(){
				
				$(document.body).mask();
		
			},
			//遮罩
			unmask:function(){
				
				$(document.body).unmask();
			
			}
		}
	};
	
</script>

<style>
	.adm-signup-success{
		margin: 30px 25%;
	}

	.adm-signup-success .signup-logo{
		text-align: center;
		color: #0098ce;
		margin-bottom: 20px;
	}

	.adm-signup-success .signup-step-box{
		text-align: center;
		height: 35px;
	}

	.adm-signup-success .signup-step{
		display: inline-block;
	}

	.adm-signup-success .signup-step.active{
		color: #0098ce;
	}

	.adm-signup-success .step-line{
		margin: 0 20px;
	}

	.adm-signup-success .signup-success-info{
		text-align: center;
		padding: 30px;
	}

	.adm-signup-success .success-icon{
		font-size: 70px;
		color: #37d61b;
	}

	.adm-signup-success .signup-content{
		border: 1px solid #c2c3c7;
		margin-bottom: 50px;
	}
	
	.adm-signup-success .signup-tab{
		width: 100%;
		text-align: center;
		display: inline-block; 
		height: 40px;
		line-height: 40px;
		background: #f0f0f0;
		color: #333;
		text-decoration: none;
	}

	.adm-signup-success .signup-tab.active{
		background: #0098ce;
		color: #fff;
	}

	.adm-signup-success .signup-body{
		background: #fff;
		padding: 30px 20%;
	}

	.adm-signup-success .signup-btn{
		margin: 20px 0;
	    padding-bottom: 10px;
	    padding-top: 10px;
	    width: 100%;
	}
	.adm-signup-success .font16{
		font-size: 16px;
	}
	/*进度条部分*/
	.adm-signup-success .signup-title{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-bottom: 0;
	}

	.adm-signup-success .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.adm-signup-success .step-one{
		width: 33.333333333%;
		background: #0098ce;
		color: #fff;
	}
	
	.adm-signup-success .step-two{
		width: 33.333333333%;
		background: #0098ce;
		color: #fff;
	}

	.adm-signup-success .step-three{
		width: 33.333333333%;
		background: #0098ce;
		color: #fff;
	}

	.adm-signup-success .step-one .triangle-right,.adm-signup-success .step-two .triangle-right{
		border-color: transparent transparent transparent #0098ce;
	}

	.adm-signup-success .step-three .triangle-right{
		border-color: transparent transparent transparent #0098ce;
	}

	.signup-title .triangle-right {
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -40px;
		width: 0;
		z-index: 1;
	}

	.signup-title .triangle-right-bg {
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
