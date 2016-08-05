<template>
	<div class="adm-finance-recharge">
		
		<div class="crumbs">
			<h4 class="crumbs-title">广告主充值</h4>
		</div>
		
		<validator name="validation" >

			<form novalidate class="recharge-form">
		
				<div class="form-group">
					<label class="form-title">广告主ID</label>
					<input type="text" class="form-control" v-validate:adv-id="{required: true}" v-model="advId" placeholder="请填写广告主ID">
					<div v-if="$validation.advId.touched" class="errors">
						<div v-if="$validation.advId.required">广告主ID不能为空！</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title">充值金额</label>
					<input type="text" class="form-control" v-validate:amount="{required: true,number:true}" v-model="amount" placeholder="请填写充值金额">
					<div v-if="$validation.amount.touched" class="errors">
						<div v-if="$validation.amount.required">提现金额不能为空！</div>
						<div v-if="!$validation.amount.required && $validation.amount.number">请输入正确的金额</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title" for="">充值凭证</label>
					<div class="file-control">
						<file accepts="jpg|png"
							upload="/v1/adm/adv/recharges/materials"
						  	download="/v1/adm/dev/recharges/materials/{materialId}" 
						  	:material-id.sync="materialId" 
						  	:material-name.sync="materialName"></file>
					</div>
				</div>
				<div class="btn-operation">
				
					<a href="javascript:void(0);" @click="recharge()" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:$validation.invalid}">保存</a>
					<a  v-link="{path:'/adm/finance/recharges'}" class="btn btn-default btn-cancel">取消</a>
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
			advId:'',
			amount:'',
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
		recharge:function(){
			if(!this.materialId || this.materialId==-1){
				return $.confirm({
					title: "提示",
					content: '请先上传凭证文件！',
					confirmButton: '确定',
					cancelButton: false
				});
			}

			this.mask();

			this.$http.post("/v1/adm/adv/recharges",{
				advId:this.advId,
				amount:this.amount
			}).then(function(res){

				this.unmask();
				
				var data = res.data;

				if(data.ret == 1){
					$.confirm({
						title: '提示',
						content: "充值创建成功",
						confirmButton: '确认',
						cancelButton:false
					});
				}else{
					$.confirm({
						title: '提示',
						content: "充值创建失败："+data.message,
						confirmButton: '确认',
						cancelButton:false
					});
				}
			},function(){

				this.unmask();
			});
		}
	}
};
</script>

<style lang="less">
	
	.adm-finance-recharge{
		padding:15px 28px 30px;
		background: white;
	}

	.adm-finance-recharge .recharge-form{
		padding:20px 0 20px 20px;
	}

	.adm-finance-recharge .form-title{
		width: 80px;
		text-align: right;
		padding-right: 15px;
		vertical-align: top;
		margin-top: 5px;
	}
	
	.adm-finance-recharge .btn-operation{
		margin: 0 20px 0 85px; 
	}

	.adm-finance-recharge .btn-cancel{
		margin-left: 20px;
	}
	
	.adm-finance-recharge .form-control{
		width: 30%;
		display: inline-block;
	}

	.adm-finance-recharge .file-control {
	    display: inline-block;
	    margin-top: 5px;
	}

	.adm-finance-recharge .errors{
		color: red;
		margin-left: 10px;
		display:inline-block;
	}

</style>
