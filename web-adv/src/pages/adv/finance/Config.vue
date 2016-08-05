<template>
	<div class="adv-finance-info">
		
		<div class="crumbs">
			<h4 class="crumbs-title">广告主财务信息设置</h4>
		</div>
		
		<validator name="validation" >
	
			<form novalidate>

				<!--公司账户-->
				<div class="form-group"> 
					<label class="form-title"><span class="require">*</span>联系人</label>
					<input type="text" class="form-control" v-validate:contactor="{required: true}" placeholder="请填写联系人名称" v-model="contactor"/>

					<div v-if="$validation.contactor.touched" class="errors">
						<div v-if="$validation.contactor.required">联系人不能为空！</div>
					</div>
				</div>

				<!--公司账户-->
				<div class="form-group">
					<label class="form-title"><span class="require">*</span>联系手机</label>
					<input type="text" class="form-control" v-validate:contact-mobile="{required: true,phone:true}" placeholder="请填写联系手机" v-model="contactMobile"/>

					<div v-if="$validation.contactMobile.touched" class="errors">
						<div v-if="$validation.contactMobile.required">联系手机不能为空！</div>
						<div v-if="!$validation.contactMobile.required && $validation.contactMobile.phone">手机号格式不正确！</div>
					</div>
				</div>
	
				<!--公司账户-->
				<div class="form-group">
					<label class="form-title"><span class="require">*</span>公司名称</label>
					<input type="text" class="form-control" v-validate:company="{required: true}" placeholder="请填写公司名称" v-model="company"/>

					<div v-if="$validation.company.touched" class="errors">
						<div v-if="$validation.company.required">公司名称不能为空！</div>
					</div>
				</div>

				<!--公司账户-->
				<div class="form-group">
					<label class="form-title"><span class="require">*</span>开户银行</label>
					<select class="form-control" v-model="bankType" placeholder="请选择银行类型">
						<option v-for="bt in bankTypes" value="{{bt.id}}">{{bt.text}}</option>
					</select>
				</div>

				<!--公司账户-->
				<div class="form-group">
					<label class="form-title"><span class="require">*</span>开户行支行</label>
					<input type="text" class="form-control" v-validate:bank-name="{required: true}" placeholder="请填写开户行支行" v-model="bankName"/>

					<div v-if="$validation.bankName.touched" class="errors">
						<div v-if="$validation.bankName.required">开户行支行不能为空！</div>
					</div>
				</div>

				<!--公司账户-->
				<div class="form-group">
					<label class="form-title"><span class="require">*</span>银行账号</label>
					<input type="text" class="form-control" v-validate:bank-account="{required: true,bankNo:true}" placeholder="请填写银行账号" v-model="bankAccount"/>

					<div v-if="$validation.bankAccount.touched" class="errors">
						<div v-if="$validation.bankAccount.required">银行账号不能为空！</div>
						<div v-if="!$validation.bankAccount.required && $validation.bankAccount.bankNo">银行账号格式不正确！</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title"><span class="require">*</span>证件类型</label>
					<select class="form-control" v-model="certificateType" placeholder="请选择证件类型">
						<option v-for="ct in certificateTypes" value="{{ct.id}}">{{ct.text}}</option>
					</select>
				</div>
				
				<!--公司账户-->
				<div class="form-group">
					<label class="form-title"><span class="require">*</span>证件用户名称</label>
					<input type="text" class="form-control" v-validate:certificate-name="{required: true}" placeholder="请输入证件姓名" v-model="certificateName"/>

					<div v-if="$validation.certificateName.touched" class="errors">
						<div v-if="$validation.certificateName.required">证件姓名不能为空！</div>
					</div>
				</div>
				
				<!--公司账户-->
				<div class="form-group">
					<label class="form-title"><span class="require">*</span>证件号码</label>
					<input type="text" class="form-control" v-validate:certificate-num="{required: true}" placeholder="请填写证件号码" v-model="certificateNum"/>

					<div v-if="$validation.certificateNum.touched" class="errors">
						<div v-if="$validation.certificateNum.required">证件号码不能为空！</div>
					</div>
				</div>

				<div class="form-group">
					
					<label class="form-title form-title-top"><span class="require">*</span>证件上传</label>
					
					<div class="file-control">
		
						<file accepts="jpg|pgn|gif|jpeg"
							upload="/v1/adv/finances/materials"
							:upload-params="{certificateType:certificateType}"
						  	download="/v1/adv/finances/materials/{materialId}"
						  	:download-params="{certificateType:certificateType}"
						  	:material-id.sync="materialId" 
						  	:material-name.sync="materialName"></file>
						  	
					  	<div class="file-tips">上传图片需为GIF、PNG、JPG格式，文件大小最高为1M</div>
					
					</div>
					
				</div>
				
				<!-- <div class="dividing"></div> -->
				
				<!-- <div class="form-group">
				
					<label class="form-title"></label>
				
					<label class="label-text">
						<input type="checkbox" value="1" v-model="readNotice" v-validate:read-notice="{required: true}"/>
						我已查看并同意
					</label>
				
					<a href="">财务须知</a>
		
					<div v-if="$validation.readNotice.touched" class="errors errors-notice">
						<div v-if="$validation.readNotice.required">请阅读财务须知并勾选！</div>
					</div>
					
				</div> -->
				
				<div class="operation-bar">
					<a href="javascript:void(0);" @click="updateFinance" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:$validation.invalid}">保存修改</a>
					<a href="javascript:void(0);" @click="onCancelClick" class="btn btn-default btn-cancel">&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;</a>
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
		data:function(){

			return {
				certificateTypes:[{id:-1,text:"加载中,请稍后..."}],//企业证件类型
				bankTypes:[{id:-1,text:"加载中,请稍后..."}],//所有证件类型
				contactor:'',//联系人
				contactMobile:'',//联系手机
				company:'',//公司
				bankType:"-1",//开户类型
				bankName:'',//开户支行名称
				bankAccount:'',//开户账号
				certificateType:"-1",//公司证照类型
				certificateName:'',//证明名字
				certificateNum:'',//证件号码
				materialId:-1,//营业执照附件ID
				materialName:'',//营业执照附件名称
				readNotice:"0"	
			};

		},
		ready:function(){

			this.mask();
		
		//加载数据字典 公司证照类型
			this.$http.get("/v1/dict/types/certificates/company").then(function(res){
				
				this.unmask();

				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				if(!result.length)
					return;
				
				this.certificateTypes=result;
				
				if(!this.certificateType || this.certificateType=="-1")
					this.certificateType=result[0].id;
			
			},function(){this.unmask();});
			
			////////////////////////////////////////////////////
			
			//加载数据字典 银行类型
			this.$http.get("/v1/dict/types/banks").then(function(res){
				
				this.unmask();

				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				if(!result.length)
					return;
				
				this.bankTypes=result;
				
				if(!this.bankType || this.bankType=="-1")
					this.bankType=result[0].id;
		
			},function(){this.unmask();});
			
			////////////////////////////////////////////////////
			
			//加载数据字典 应用类型
			this.$http.get("/v1/adv/finances/user").then(function(res){
				
				this.unmask();

				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
		
				this.contactor=result.contactor;//联系人
				this.contactMobile=result.contactMobile;//联系手机
				this.company=result.company;//公司
				this.bankType=result.bankType;//开户类型
				this.bankName=result.bankName;//开户支行名称
				this.bankAccount=result.bankAccount;//开户账号
				this.certificateType=result.certificateType;//公司证照类型
				this.certificateName=result.certificateName;//证明名字
				this.certificateNum=result.certificateNum;//证件号码
				this.materialId=result.materialId;//营业执照附件ID
				this.materialName=result.materialName;//营业执照附件名称	
			
			},function(){this.unmask();});
				
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
					path:'/adv/index'
				});
				
			},
			updateFinance:function(){

				if(!this.materialId || this.materialId==-1)
					return $.confirm({
							title: "提示",
							content: '请先上传证件文件！',
							confirmButton: '确定',
	    					cancelButton: false
						});
						
				this.mask();
				
				var data={
					contactor:this.contactor,//联系人
					contactMobile:this.contactMobile,//联系手机
					company:this.company,//公司
					bankType:this.bankType,//开户类型
					bankName:this.bankName,//开户支行名称
					bankAccount:this.bankAccount,//开户账号
					certificateType:this.certificateType,//公司证照类型
					certificateName:this.certificateName,//证明名字
					certificateNum:this.certificateNum,//证件号码
					materialId:this.materialId//营业执照附件ID
				};
				
				//保存信息
				this.$http.put("/v1/adv/finances/user",data).then(function(res){

					this.unmask();
					
					var data = res.data;

					if(data.ret!=1)
						return $.confirm({
								title: "提示",
								content: '修改失败：'+data.message,
								confirmButton:"确认",
								cancelButton: false
							});
							
					$.confirm({
						title: "提示",
						content:'修改成功！',
						confirmButton:"确认",
						cancelButton: false
					});
					
				},function(){
				
					this.unmask();
					
					$.confirm({
						title: false,
						content:'系统异常，修改失败！',
						confirmButton:"确认",
						cancelButton: false
					});
					
				});
				
			}

		}
    };

</script>

<style>

	.adv-finance-info{
		padding:15px 28px 0 28px;
		background-color: white;
		height:100%;
	}
	
	.adv-finance-info .crumbs-title{
		margin-bottom: 20px;
		margin-top: 0;
	}
	
	/*表单*/
	.adv-finance-info .form-title{
		width: 120px;
		text-align: right;
		padding-right: 15px;
		margin-top: 5px;
		font-weight: normal;
	}
	
	.adv-finance-info .form-title-top{
		vertical-align:top;
	}

	.adv-finance-info .label-text{
		font-weight: normal;
	}
	
	.adv-finance-info .label-text input{   
		 vertical-align: top;
	}
	
	.adv-finance-info .radio-inline{
		line-height: 34px;
	}
	
	.adv-finance-info .radio-inline input{
		margin-top: 10px;
	}
	
	.adv-finance-info .form-control{
		width: 30%;
		display: inline-block;
	}
	
	.adv-finance-info .file-control{
		display:inline-block;
		margin-top: 5px;
	}
	
	.adv-finance-info .file-form{
		margin-bottom:15px;
	}
	
	.adv-finance-info .file-tips{
		color:red;
	}
	
	.adv-finance-info .dividing{
		border-top: 1px solid #ccc;
		width: 70%;
		margin-bottom: 20px;
	}

	.adv-finance-info .operation-bar{
		margin:40px 0 40px 125px; 
	}

	.adv-finance-info .require{
		color: red;
		padding-right: 5px;
	}
	
	.adv-finance-info .btn-cancel{
		margin-left: 15px;
	}
	
	.adv-finance-info .errors{
		color: red;
		display:inline-block;
		margin-left:10px;
	}

</style>