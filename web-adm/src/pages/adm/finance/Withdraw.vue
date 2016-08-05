<template>
	<div class="adm-finance-withdraw">
		
		<div class="crumbs">
			<h4 class="crumbs-title">开发者提现</h4>
		</div>
		
		<validator name="validation" >
		
			<form novalidate class="withdraw-form">
			
				<div class="form-group">
					<label class="form-title">开发者ID</label>
					<input type="text" class="form-control" v-validate:dev-id="{required: true}" v-model="devId" placeholder="请填写开发者ID">
					<div v-if="$validation.devId.touched" class="errors">
						<div v-if="$validation.devId.required">广告主ID不能为空！</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title">提现金额</label>
					<input type="text" class="form-control" v-validate:amount="{required: true,number:true}" v-model="amount" placeholder="请填写提现金额">
					<div v-if="$validation.amount.touched" class="errors">
						<div v-if="$validation.amount.required">提现金额不能为空！</div>
						<div v-if="!$validation.amount.required && $validation.amount.number">请输入正确的金额</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title" for="">提现凭证</label>
					<div class="file-control">
						<file accepts="jpg|png"
							upload="/v1/adm/dev/withdraws/materials"
						  	download="/v1/adm/dev/withdraws/materials/{materialId}" 
						  	:material-id.sync="materialId" 
						  	:material-name.sync="materialName"></file>
					</div>
								
				</div>

				<div class="operation-bar">
					<a href="javascript:void(0);" @click="withdraw()" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:$validation.invalid}">保存</a>
								
					<a  v-link="{path:'/adm/finance/withdraws'}" class="btn btn-default btn-cancel">取消</a>
				
				</div>
				
			</form>
		</validator>
	</div>

</template>

<script>

import File from '../../../components/File.vue';
	
module.exports = {
	components:{
		'file':File
	},
	data : function() {
	  	return {
	  		devId:'',
	  		amount:0,
	  		materialId:-1,
	  		materialName:''
	  	};
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
		withdraw:function(){

			if(!this.materialId || this.materialId==-1){
				return $.confirm({
					title: "提示",
					content: '请先上传凭证文件！',
					confirmButton: '确定',
					cancelButton: false
				});
			}
		
			this.mask();

			this.$http.post("/v1/adm/dev/withdraws",{
				devId:this.devId,
				amount:this.amount,
				materialId:this.materialId
			}).then(function(res){

				this.unmask();
				
				var data = res.data;

				if(data.ret != 1)
					return $.confirm({
						title: '提示',
						content: "提现创建失败："+data.message,
						confirmButton: '确认',
						cancelButton:false
					});
				
				$.confirm({
					title: '提示',
					content: "提现创建成功",
					confirmButton: '确认',
					cancelButton:false
				});
					
			},function(){this.unmask();});
			
		}
	}
};
</script>

<style lang="less">
	
	.adm-finance-withdraw{
		padding:15px 28px 30px;
		background: white;
	}

	.adm-finance-withdraw .withdraw-form{
		padding:20px 0 20px 20px;
	}

	.adm-finance-withdraw .form-title{
		width: 80px;
		text-align: right;
		padding-right: 15px;
		vertical-align: top;
		margin-top: 5px;
		font-weight: normal;
	}
	
	.adm-finance-withdraw .operation-bar{
		margin: 0 20px 0 85px; 
	}

	.adm-finance-withdraw .btn-cancel{
		margin-left: 20px;
	}

	.adm-finance-withdraw .form-control{
		width: 30%;
		display: inline-block;
	}
	
	.adm-finance-withdraw .file-control{
		display:inline-block;
		margin-top: 5px;
	}
	
	.adm-finance-withdraw .errors{
		color: red;
		margin-left: 10px;
		display:inline-block;
	}
</style>
