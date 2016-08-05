<template>
	<div id="g_top" class='g-top'>
		<div class='g-container clearfix'>
			 <h1 class="pull-left top-logo">
				<a class="logo">ADroi 广告平台</a>
			 </h1>
		</div>
	</div>
	<div class="adv-findpsw-reset">
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
				<li class="step step-three">完成</li>
			</ul>

			<div class="findpsw-body">
				<validator name="validation" >
					<form novalidate name="signForm">
						<div class="form-group">
							<label for="password">设置新密码</label>
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

						<div class="clearfix button-group">
							<a type="button" @click="nextStep" :class="{'next-btn':true,btn:true,'btn-save':true,'btn-primary':true,disabled:$validation.invalid}">提交</a>
							<a type="button" v-link="{path:'/adv/login'}" :class="{'btn-cancel':true,btn:true,'btn-default':true}">取消</a>
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
				email:'',
				userId:this.$route.query.userId
			};
		},
		
		validators: {
			passEqConfirm: function (val,target) {
		     	return target === val;
		    }
		},
		
		ready:function(){},
		methods:{
			mask:function(){
				$(document.body).mask();
			},

			unmask:function(){
				$(document.body).unmask();
			},

			nextStep:function(){
				this.mask();
				
				this.$http.put("/v1/adv/findpsw/setNewPass",{
					userId		: this.userId,
					userPass	: this.userPass
				}).then(function(res){
					this.unmask();

					var data = res.data;
					if(data.ret != 1) {
						return $.confirm({
							title: '提示',
							content: "密码修改失败:" + data.message,
							confirmButton: '确认',
							cancelButton:false
						});
					}
					
					this.$route.router.go({
						path:'/adv/findpsw/success?userId=' + 111
					});
					
				},function(){this.unmask();});
			}
		}
	};
	
</script>

<style>
	.adv-findpsw-reset{
		margin: 50px auto 0;
		height: 200px;
		width: 700px;
		margin: 0 auto;
	}

	.adv-findpsw-reset .fz12{
		font-size: 12px;
	}

	.adv-findpsw-reset .margintop15{
		margin-top: 15px;
	}

	.adv-findpsw-reset .findpsw-logo{
		text-align: center;
		color: #09c;
		margin: 50px 0;
	}

	.adv-findpsw-reset .findpsw-step-box{
		text-align: center;
		height: 35px;
	}

	.adv-findpsw-reset .findpsw-step{
		display: inline-block;
	}

	.adv-findpsw-reset .findpsw-step.active{
		color: #09c;
	}

	.adv-findpsw-reset .step-line{
		margin: 0 20px;
	}

	.adv-findpsw-reset .findpsw-content{
		border: 1px solid #c2c3c7;
		margin-bottom: 50px;
	}
	
	.adv-findpsw-reset .findpsw-tab{
		width: 100%;
		text-align: center;
		display: inline-block; 
		height: 42px;
		line-height: 42px;
		background: #f0f0f0;
		color: #333;
	}

	.adv-findpsw-reset .findpsw-tab:hover{
		text-decoration: none;
	}

	.adv-findpsw-reset .findpsw-tab.active{
		background: #09c;
		color: #fff;
	}

	.adv-findpsw-reset .findpsw-steping{
		color: #09c;
		background: #fff;
		padding: 10px 20px;
	}
	
	.adv-findpsw-reset .findpsw-body{
		background: #fff;
		padding: 65px 85px;
	}

	.adv-findpsw-reset .next-btn{
		margin: 20px 0;
	    width: 150px;
	    padding: 10px 12px;
	}

	.adv-findpsw-reset .btn-cancel{
		margin: 20px 0;
	    width: 150px;
	    margin-left: 25px;
	    padding: 10px 12px;
	}

	.adv-findpsw-reset .errors{
		color: red;
		margin-top: 5px;
		margin-left: 105px;
	}

	.adv-findpsw-reset .font16{
		font-size: 16px;
	}
	
	.adv-findpsw-reset .form-control{
		width: 330px;
		display: inline-block;
	}

	.adv-findpsw-reset .form-group label{
		width: 100px;
		text-align: right;
		padding-right: 15px;
		font-weight: normal;
	}

	.adv-findpsw-reset .button-group{
		margin-left: 105px;
    	width: 330px;
	}
	/*进度条部分*/
	.adv-findpsw-reset .findpsw-title{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-bottom: 0;
	}

	.adv-findpsw-reset .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.adv-findpsw-reset .step-one{
		width: 33.33%;
		background: #09c;
		color: #fff;
	}
	
	.adv-findpsw-reset .step-two{
		width: 33.33%;
		background: #09c;
		color: #fff;
	}

	.adv-findpsw-reset .step-three{
		width: 33.33%;
		background: #cccfd3;
		color: #fff;
	}

	.adv-findpsw-reset .step-one .triangle-right,.adv-findpsw-reset .step-two .triangle-right{
		border-color: transparent transparent transparent #09c;
	}

	.adv-findpsw-reset .step-three .triangle-right{
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
