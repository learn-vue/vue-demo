<template>

	<div id="g_top" class='g-top'>
		<div class='g-container clearfix'>
			 <h1 class="pull-left top-logo">
			 	<a class="logo">ADroi 广告平台</a>
			 </h1>
		</div>
	</div>
	
	<div class="dev-signup-success">
		
		<h3 class="signup-logo">ADroi <span class="font16">开发者注册</span></h3>
		
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
				<a v-link="{path:'/dev/signup'}" class="signup-tab active">开发者注册</a>
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
					<button type="submit" class="btn btn-primary btn-save signup-btn" v-link="{path:'/dev/login'}">进入ADroi平台</button>
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
	.dev-signup-success{
		margin: 30px 25%;
	}

	.dev-signup-success .signup-logo{
		text-align: center;
		color: #0098ce;
		margin-bottom: 20px;
	}

	.dev-signup-success .signup-step-box{
		text-align: center;
		height: 35px;
	}

	.dev-signup-success .signup-step{
		display: inline-block;
	}

	.dev-signup-success .signup-step.active{
		color: #0098ce;
	}

	.dev-signup-success .step-line{
		margin: 0 20px;
	}

	.dev-signup-success .signup-success-info{
		text-align: center;
		padding: 30px;
	}

	.dev-signup-success .success-icon{
		font-size: 70px;
		color: #37d61b;
	}

	.dev-signup-success .signup-content{
		border: 1px solid #c2c3c7;
		margin-bottom: 50px;
	}
	
	.dev-signup-success .signup-tab{
		width: 100%;
		text-align: center;
		display: inline-block; 
		height: 40px;
		line-height: 40px;
		background: #f0f0f0;
		color: #333;
		text-decoration: none;
	}

	.dev-signup-success .signup-tab.active{
		background: #0098ce;
		color: #fff;
	}

	.dev-signup-success .signup-body{
		background: #fff;
		padding: 30px 20%;
	}

	.dev-signup-success .signup-btn{
		margin: 20px 0;
	    padding-bottom: 10px;
	    padding-top: 10px;
	    width: 100%;
	}
	.dev-signup-success .font16{
		font-size: 16px;
	}
	/*进度条部分*/
	.dev-signup-success .signup-title{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-bottom: 0;
	}

	.dev-signup-success .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.dev-signup-success .step-one{
		width: 33.333333333%;
		background: #0098ce;
		color: #fff;
	}
	
	.dev-signup-success .step-two{
		width: 33.333333333%;
		background: #0098ce;
		color: #fff;
	}

	.dev-signup-success .step-three{
		width: 33.333333333%;
		background: #0098ce;
		color: #fff;
	}

	.dev-signup-success .step-one .triangle-right,.dev-signup-success .step-two .triangle-right{
		border-color: transparent transparent transparent #0098ce;
	}

	.dev-signup-success .step-three .triangle-right{
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
