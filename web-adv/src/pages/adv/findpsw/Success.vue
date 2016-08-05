<template>

	<div id="g_top" class='g-top'>
	
		<div class='g-container clearfix'>
			 <h1 class="pull-left top-logo">
				<a class="logo">ADroi 广告平台</a>
			 </h1>
		</div>
	</div>
	
	<div class="adv-findpsw-success">
		
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
				
				<div class="findpsw-success-info">
					<span class="glyphicon glyphicon-ok-sign success-icon" aria-hidden="true"></span>
					<h4>密码重置成功啦 : )</h4>
				</div>
				
				<div class="clearfix">
					<button type="submit" class="btn btn-primary btn-save findpsw-btn" v-link="{path:'/adv/login'}">重新登录 ADroi 广告主平台</button>
				</div>
				 
			</div>
			
		</div>
		<div class="copyright">上海卓悠网络科技有限公司 沪ICP备14018373号-5</div>
		
	</div>

</template>

<script>

	import Vue from 'vue';
	
	module.exports = {
		components: {
		   
		},
		data:function(){
			return {
				findpswName:''
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
	.adv-findpsw-success{
		width: 50%;
		margin: 50px 25% 0;
		height: 200px;
	}

	.adv-findpsw-success .findpsw-logo{
		text-align: center;
		color: #0098ce;
		margin-bottom: 20px;
	}

	.adv-findpsw-success .findpsw-step-box{
		text-align: center;
		height: 35px;
	}

	.adv-findpsw-success .findpsw-step{
		display: inline-block;
	}

	.adv-findpsw-success .findpsw-step.active{
		color: #0098ce;
	}

	.adv-findpsw-success .step-line{
		margin: 0 20px;
	}

	.adv-findpsw-success .findpsw-success-info{
		text-align: center;
		padding: 30px;
	}

	.adv-findpsw-success .success-icon{
		font-size: 70px;
		color: #41d430;
	}

	.adv-findpsw-success .findpsw-content{
		border: 1px solid #c2c3c7;
		margin-bottom: 50px;
	}
	
	.adv-findpsw-success .findpsw-tab{
		width: 100%;
		text-align: center;
		display: inline-block; 
		height: 40px;
		line-height: 40px;
		background: #f0f0f0;
		color: #333;
	}

	.adv-findpsw-success .findpsw-tab:hover{
		text-decoration: none;
	}

	.adv-findpsw-success .findpsw-tab.active{
		background: #0098ce;
		color: #fff;
	}

	.adv-findpsw-success .findpsw-body{
		background: #fff;
		padding: 30px 20%;
	}

	.adv-findpsw-success .findpsw-btn{
		margin: 20px 22px;
	    padding-bottom: 10px;
	    padding-top: 10px;
	    width: 360px;
	}
	.adv-findpsw-success .font16{
		font-size: 16px;
	}
	/*进度条部分*/
	.adv-findpsw-success .findpsw-title{
		text-align: center;
		padding-left: 0;
		height: 40px;
		margin-bottom: 0;
	}

	.adv-findpsw-success .step{
		float: left;
		height: 40px;
		line-height: 40px;
		list-style: none;
		position: relative;
	}

	.adv-findpsw-success .step-one{
		width: 33.33%;
		background: #0098ce;
		color: #fff;
	}
	
	.adv-findpsw-success .step-two{
		width: 33.33%;
		background: #0098ce;
		color: #fff;
	}

	.adv-findpsw-success .step-three{
		width: 33.33%;
		background: #0098ce;
		color: #fff;
	}

	.adv-findpsw-success .step-one .triangle-right,.adv-findpsw-success .step-two .triangle-right{
		border-color: transparent transparent transparent #0098ce;
	}

	.adv-findpsw-success .step-three .triangle-right{
		border-color: transparent transparent transparent #0098ce;
	}

	.findpsw-title .triangle-right {
		border-style: solid;
		border-width: 20px;
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
		border-width: 20px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -42px;
		top: 0px;
		width: 0;
		z-index: 1;
	}
</style>
