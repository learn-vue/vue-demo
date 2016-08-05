<template>
	<div class="dev-user-pass">
	
		<div class="crumbs">
			<h4 class="crumbs-title">修改密码</h4>
		</div>

		<validator name="validation" >

			<form novalidate>

				<div class="form-group old-pass-field">
					<label class="form-title" for="old_pass">原密码：</label>
					<input  id="old_pass" type="password" v-validate:old-pass="{required: true, maxlength: 18, minlength: 6}" class="form-control" placeholder="请输入原密码"  v-model="oldPass"/>

					<div v-if="$validation.oldPass.touched" class="errors">
						<div v-if="$validation.oldPass.required">密码不能为空！</div>
						<div v-if="!$validation.oldPass.required && $validation.oldPass.maxlength">密码长度不能大于18位！</div>
						<div v-if="!$validation.oldPass.required && $validation.oldPass.minlength">密码长度不能小于6位！</div>
					</div>
				</div>

				<div class="form-group new-pass-field">
					<label class="form-title" for="new_pass">新密码：</label>
					<input  id="new_pass" type="password" v-validate:new-pass="{required: true, maxlength: 18, minlength: 6}" class="form-control" placeholder="请输入新密码"  v-model="newPass"/>

					<div v-if="$validation.newPass.touched" class="errors">
						<div v-if="$validation.newPass.required">密码不能为空！</div>
						<div v-if="!$validation.newPass.required && $validation.newPass.maxlength">密码长度不能大于18位！</div>
						<div v-if="!$validation.newPass.required && $validation.newPass.minlength">密码长度不能小于6位！</div>
					</div>
				</div>

				<div class="form-group confirm-pass-field">
					<label class="form-title" for="confirm_pass">密码确认：</label>
					<input  id="confirm_pass" type="password" v-validate:confirm-pass="{required: {rule:true}, maxlength:{rule:18}, minlength:{rule:6},passEqConfirm:{rule:newPass}}" class="form-control" placeholder="请再次输入新密码"  v-model="confirmPass"/>

					<div v-if="$validation.confirmPass.touched" class="errors">
						<div v-if="$validation.confirmPass.required">密码不能为空！</div>
						<div v-if="!$validation.confirmPass.required && $validation.confirmPass.maxlength">密码长度不能大于18位！</div>
						<div v-if="!$validation.confirmPass.required && $validation.confirmPass.minlength">密码长度不能小于6位！</div>
						<div v-if="!$validation.confirmPass.required && !$validation.confirmPass.maxlength && !$validation.confirmPass.minlength && $validation.confirmPass.passEqConfirm">两次输入密码不一致！</div>
					</div>
				</div>

				<div class="operation-bar">
					<a href="javascript:void(0);" @click="updatePass" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:$validation.invalid}">保存修改</a>
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
				oldPass: '',
				newPass: '',
				confirmPass:""
			};
		},
		validators: {
			passEqConfirm: function (val,target) {

		     	return target == val;
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
					path:'/dev/user/index'
				});
				
			},
			updatePass:function(){

				this.mask();
				
				this.$http.put("/v1/dev/users/current/pass",{
					oldPass : this.oldPass,
					newPass : this.newPass
				}).then(function(res){

					this.unmask();

					var data = res.data;

					if(data.ret != 1)
						return $.confirm({
							title: "提示",
							content: '密码修改失败:'+data.message,
							confirmButton:"确定",
							cancelButton: false
						});
						
						$.confirm({
							title: "提示",
							content: '密码修改成功',
							confirmButton:"确定",
							cancelButton: false
						});
					
				},function(){
				
					this.unmask();
					
					$.confirm({
							title: "提示",
							content: '系统异常，请稍后重试或联系管理员！',
							confirmButton:"确定",
							cancelButton: false
						});
							
				});
			}
		}
	};
</script>

<style lang="less">
	
	.dev-user-pass{
		padding:15px 28px 0;
		background-color: white;
		height:100%;
	}

	.dev-user-pass .crumbs-title{
		margin-bottom: 20px;
		margin-top: 0;
	}
	
	.dev-user-pass .form-title{
		width: 120px;
		text-align: right;
		padding-right: 15px;
		margin-top: 5px;
	}

	.dev-user-pass .form-control{
		width: 30%;
		display: inline-block;
	}
	
	.dev-user-pass .operation-bar{
		margin:30px 0 0 125px;
	}
	
	.dev-user-pass .btn-cancel{
		margin-left:30px;
	}

	.dev-user-pass .errors{
		color: red;
		display:inline-block;
		margin-left:10px;
	}
</style>