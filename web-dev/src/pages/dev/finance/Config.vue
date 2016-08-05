<template>
	<div class="dev-finance-info">
		
		<div class="crumbs">
			<h4 class="crumbs-title">开发者财务信息设置</h4>
		</div>
		
		<validator name="validation" >
		
			<form novalidate>

				<div class="form-group">
					<label class="form-title"><span class="require">*</span>账户类型</label>
					<label class="radio-inline">
						<input type="radio" v-model="financeType" value="2">个人账户
					</label>
					<label class="radio-inline">
						<input type="radio" v-model="financeType" value="1">企业账户
					</label>
				</div>
				
				<!--个人账户-->
				<div class="form-group" v-if="financeType == 2"> 
					<label class="form-title"><span class="require">*</span>联系人</label>
					<input type="text" class="form-control" v-validate:person-contactor="{required: true}" placeholder="请填写联系人名称" v-model="person.contactor"/>

					<div v-if="$validation.personContactor.touched" class="errors">
						<div v-if="$validation.personContactor.required">联系人不能为空！</div>
					</div>
				</div>
				
				<!--公司账户-->
				<div class="form-group" v-if="financeType == 1"> 
					<label class="form-title"><span class="require">*</span>联系人</label>
					<input type="text" class="form-control" v-validate:company-contactor="{required: true}" placeholder="请填写联系人名称" v-model="company.contactor"/>

					<div v-if="$validation.companyContactor.touched" class="errors">
						<div v-if="$validation.companyContactor.required">联系人不能为空！</div>
					</div>
				</div>

				<!--个人账户-->
				<div class="form-group" v-if="financeType == 2">
					<label class="form-title"><span class="require">*</span>联系手机</label>
					<input type="text" class="form-control" v-validate:person-contact-mobile="{required: true,phone:true}" placeholder="请填写联系手机" v-model="person.contactMobile"/>

					<div v-if="$validation.personContactMobile.touched" class="errors">
						<div v-if="$validation.personContactMobile.required">联系手机不能为空！</div>
						<div v-if="!$validation.personContactMobile.required && $validation.personContactMobile.phone">手机号格式不正确！</div>
					</div>
				</div>
				
				<!--公司账户-->
				<div class="form-group" v-if="financeType == 1">
					<label class="form-title"><span class="require">*</span>联系手机</label>
					<input type="text" class="form-control" v-validate:company-contact-mobile="{required: true,phone:true}" placeholder="请填写联系手机" v-model="company.contactMobile"/>

					<div v-if="$validation.companyContactMobile.touched" class="errors">
						<div v-if="$validation.companyContactMobile.required">联系手机不能为空！</div>
						<div v-if="!$validation.companyContactMobile.required && $validation.companyContactMobile.phone">手机号格式不正确！</div>
					</div>
				</div>
				
				<!--个人账户-->
				<div class="form-group" v-if="financeType == 2">
					<label class="form-title"><span class="require">*</span>开户人</label>
					<input type="text" class="form-control" v-validate:person-account-name="{required: true}" placeholder="请填写开户名" v-model="person.accountName"/>

					<div v-if="$validation.personAccountName.touched" class="errors">
						<div v-if="$validation.personAccountName.required">开户人不能为空！</div>
					</div>
				</div>
				
				<!--公司账户-->
				<div class="form-group" v-if="financeType == 1">
					<label class="form-title"><span class="require">*</span>公司名称</label>
					<input type="text" class="form-control" v-validate:company-company="{required: true}" placeholder="请填写公司名称" v-model="company.company"/>

					<div v-if="$validation.companyCompany.touched" class="errors">
						<div v-if="$validation.companyCompany.required">公司名称不能为空！</div>
					</div>
				</div>

				<!--个人账户-->
				<div class="form-group" v-if="financeType == 2">
					<label class="form-title"><span class="require">*</span>开户银行</label>
					<select class="form-control" v-model="person.bankType" placeholder="请选择银行类型">
						<option v-for="bt in bankTypes" value="{{bt.id}}">{{bt.text}}</option>
					</select>
				</div>
				
				<!--公司账户-->
				<div class="form-group" v-if="financeType == 1">
					<label class="form-title"><span class="require">*</span>开户银行</label>
					<select class="form-control" v-model="company.bankType" placeholder="请选择银行类型">
						<option v-for="bt in bankTypes" value="{{bt.id}}">{{bt.text}}</option>
					</select>
				</div>

				<!--个人账户-->
				<div class="form-group" v-if="financeType == 2">
					<label class="form-title"><span class="require">*</span>开户行支行</label>
					<input type="text" class="form-control" v-validate:person-bank-name="{required: true}" placeholder="请填写开户行支行" v-model="person.bankName"/>

					<div v-if="$validation.personBankName.touched" class="errors">
						<div v-if="$validation.personBankName.required">开户行支行不能为空！</div>
					</div>
				</div>
				
				<!--公司账户-->
				<div class="form-group" v-if="financeType == 1">
					<label class="form-title"><span class="require">*</span>开户行支行</label>
					<input type="text" class="form-control" v-validate:company-bank-name="{required: true}" placeholder="请填写开户行支行" v-model="company.bankName"/>

					<div v-if="$validation.companyBankName.touched" class="errors">
						<div v-if="$validation.companyBankName.required">开户行支行不能为空！</div>
					</div>
				</div>

				<!--个人账户-->
				<div class="form-group" v-if="financeType == 2">
					<label class="form-title"><span class="require">*</span>银行账号</label>
					<input type="text" class="form-control" v-validate:person-bank-account="{required: true,bankNo:true}" placeholder="请填写银行账号" v-model="person.bankAccount"/>

					<div v-if="$validation.personBankAccount.touched" class="errors">
						<div v-if="$validation.personBankAccount.required">银行账号不能为空！</div>
						<div v-if="!$validation.personBankAccount.required && $validation.personBankAccount.bankNo">银行账号格式不正确！</div>
					</div>
				</div>
				
				<!--公司账户-->
				<div class="form-group" v-if="financeType == 1">
					<label class="form-title"><span class="require">*</span>银行账号</label>
					<input type="text" class="form-control" v-validate:company-bank-account="{required: true,bankNo:true}" placeholder="请填写银行账号" v-model="company.bankAccount"/>

					<div v-if="$validation.companyBankAccount.touched" class="errors">
						<div v-if="$validation.companyBankAccount.required">银行账号不能为空！</div>
						<div v-if="!$validation.companyBankAccount.required && $validation.companyBankAccount.bankNo">银行账号格式不正确！</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title"><span class="require">*</span>证件类型</label>
					<select v-if="financeType == 2" class="form-control" v-model="person.certificateType" placeholder="请选择证件类型">
						<option v-for="ct in certificatePersonTypes" value="{{ct.id}}">{{ct.text}}</option>
					</select>
					<select v-if="financeType == 1" class="form-control" v-model="company.certificateType" placeholder="请选择证件类型">
						<option v-for="ct in certificateCompanyTypes" value="{{ct.id}}">{{ct.text}}</option>
					</select>
				</div>

				<!--个人账户-->
				<div class="form-group" v-if="financeType == 2">
					<label class="form-title"><span class="require">*</span>证件姓名</label>
					<input type="text" class="form-control" v-validate:person-certificate-name="{required: true}" placeholder="请输入证件姓名" v-model="person.certificateName"/>

					<div v-if="$validation.personCertificateName.touched" class="errors">
						<div v-if="$validation.personCertificateName.required">证件姓名不能为空！</div>
					</div>
				</div>
				
				<!--公司账户-->
				<div class="form-group" v-if="financeType == 1">
					<label class="form-title"><span class="require">*</span>证件用户名称</label>
					<input type="text" class="form-control" v-validate:company-certificate-name="{required: true}" placeholder="请输入证件姓名" v-model="company.certificateName"/>

					<div v-if="$validation.companyCertificateName.touched" class="errors">
						<div v-if="$validation.companyCertificateName.required">证件姓名不能为空！</div>
					</div>
				</div>
				
				<!--个人账户-->
				<div class="form-group" v-if="financeType == 2">
					<label class="form-title"><span class="require">*</span>证件号码</label>
					<input type="text" class="form-control" v-validate:person-certificate-num="{required: true}" placeholder="请填写证件号码" v-model="person.certificateNum"/>

					<div v-if="$validation.personCertificateNum.touched" class="errors">
						<div v-if="$validation.personCertificateNum.required">证件号码不能为空！</div>
					</div>
				</div>
				
				<!--公司账户-->
				<div class="form-group" v-if="financeType == 1">
					<label class="form-title"><span class="require">*</span>证件号码</label>
					<input type="text" class="form-control" v-validate:company-certificate-num="{required: true}" placeholder="请填写证件号码" v-model="company.certificateNum"/>

					<div v-if="$validation.companyCertificateNum.touched" class="errors">
						<div v-if="$validation.companyCertificateNum.required">证件号码不能为空！</div>
					</div>
				</div>

				<div class="form-group">
					
					<label class="form-title form-title-top"><span class="require">*</span>证件上传</label>
					
					<div class="file-control" v-if="financeType == 2">
					
						<file accepts="jpg|pgn|gif|jpeg"
							upload="/v1/dev/finances/materials"
							:upload-params="{financeType:'2',certificateType:person.certificateType}"
						  	download="/v1/dev/finances/materials/{materialId}"
						  	:download-params="{financeType:'2',certificateType:person.certificateType}"
						  	:material-id.sync="person.materialId" 
						  	:material-name.sync="person.materialName"></file>
		
					  	<div class="file-tips">上传图片需为GIF、PNG、JPG格式，文件大小最高为1M</div>
					
					</div>
					
					<div class="file-control" v-if="financeType == 1">
		
						<file accepts="jpg|pgn|gif|jpeg"
							upload="/v1/dev/finances/materials"
							:upload-params="{financeType:'1',certificateType:company.certificateType}"
						  	download="/v1/dev/finances/materials/{materialId}"
						  	:download-params="{financeType:'1',certificateType:company.certificateType}"
						  	:material-id.sync="company.materialId" 
						  	:material-name.sync="company.materialName"></file>
						  	
					  	<div class="file-tips">上传图片需为GIF、PNG、JPG格式，文件大小最高为1M</div>
					
					</div>
					
				</div>
				
				<div class="dividing"></div>
				
				<div class="form-group">
				
					<label class="form-title"></label>
				
					<label class="label-text">
						<input type="checkbox" value="1" v-model="readNotice" v-validate:read-notice="{required: true}"/>
						我已查看并同意
					</label>
				
					<a href="">财务须知</a>
		
					<div v-if="$validation.readNotice.touched" class="errors errors-notice">
						<div v-if="$validation.readNotice.required">请阅读财务须知并勾选！</div>
					</div>
					
				</div>
				
				<div class="operation-bar">
					<a href="javascript:void(0);" @click="updateFinance" :class="{btn:true,'btn-save':true,'btn-primary':true,'btn-save':true,disabled:$validation.invalid}">保存修改</a>
					<a href="javascript:void(0);" @click="onCancelClick" class="btn btn-default btn-cancel">取消</a>
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
				certificatePersonTypes:[{id:-1,text:"加载中,请稍后..."}],//个人证件类型
				certificateCompanyTypes:[{id:-1,text:"加载中,请稍后..."}],//企业证件类型
				bankTypes:[{id:-1,text:"加载中,请稍后..."}],//所有证件类型
				financeType: '1',
				person:{
					contactor:'',//联系人
					contactMobile:'',//联系手机
					accountName: '',//开户人
					bankType:"-1",//开户类型
					bankName:'',//开户支行名称
					bankAccount:'',//开户账号
					certificateType:'-1',//个人证件类型
					certificateName:'',//证明名字
					certificateNum:'',//证件号码
					materialId:-1,//营业执照附件ID
					materialName:''//营业执照附件名称
				},
				company:{
					contactor:'',//联系人
					contactMobile:'',//联系手机
					company:'',//公司
					accountName: '',//开户人
					bankType:"-1",//开户类型
					bankName:'',//开户支行名称
					bankAccount:'',//开户账号
					certificateType:"-1",//公司证照类型
					certificateName:'',//证明名字
					certificateNum:'',//证件号码
					materialId:-1,//营业执照附件ID
					materialName:''//营业执照附件名称	
				},
				readNotice:"0"	
			};

		},
		ready:function(){
			
			this.mask();
		
			//加载数据字典 个人证照类型
			this.$http.get("/v1/dict/types/certificates/person").then(function(res){
				
				this.unmask();

				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				if(!result.length)
					return;
				
				this.certificatePersonTypes=result;
				
				if(!this.person.certificateType || this.person.certificateType=="-1")
					this.person.certificateType=result[0].id;
			
			},function(){this.unmask();});
			
			////////////////////////////////////////////////////
			
			//加载数据字典 公司证照类型
			this.$http.get("/v1/dict/types/certificates/company").then(function(res){
				
				this.unmask();

				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				if(!result.length)
					return;
				
				this.certificateCompanyTypes=result;
				
				if(!this.company.certificateType || this.company.certificateType=="-1")
					this.company.certificateType=result[0].id;
			
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
				
				if(!this.person.bankType || this.person.bankType=="-1")
					this.person.bankType=result[0].id;
					
				if(!this.company.bankType || this.company.bankType=="-1")
					this.company.bankType=result[0].id;
					
			},function(){this.unmask();});
			
			////////////////////////////////////////////////////
			
			this.mask();
		
			//加载数据字典 应用类型
			this.$http.get("/v1/dev/finances/user").then(function(res){
				
				this.unmask();

				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
		
				this.financeType=result.financeType;
		
				//个人账户
				if(result.financeType==2)
					this.person = result;
				else//企业账户
					this.company = result;
				
			},function(){this.unmask();});
			
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
					path:'/dev/index'
				});
				
			},
			updateFinance:function(){

				//企业账户
				var data=this.company;
				
				//个人账户
				if(this.financeType==2)
					data=this.person;
		
				if(!data.materialId || data.materialId==-1)
					return $.confirm({
							title: "提示",
							content: '请先上传证件文件！',
							confirmButton: '确定',
	    					cancelButton: false
						});
							
				data.financeType=this.financeType;
				
				this.mask();
				
				//保存信息
				this.$http.put("/v1/dev/finances/user",data).then(function(res){

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
						title: '提示',
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
	
	.dev-finance-info{
		padding:15px 28px 0 28px;
		background-color: white;
		height:100%;
	}
	
	.dev-finance-info .crumbs-title{
		margin-bottom: 20px;
		margin-top: 0;
	}
	
	/*表单*/
	.dev-finance-info .form-title{
		width: 120px;
		text-align: right;
		padding-right: 15px;
		margin-top: 5px;
		font-weight: normal;
	}
	
	.dev-finance-info .form-title-top{
		vertical-align:top;
	}
	
	.dev-finance-info .label-text{
		font-weight: normal;
	}
	
	.dev-finance-info .label-text input{   
		 vertical-align: top;
	}
	
	.dev-finance-info .radio-inline{
		line-height: 34px;
	}
	
	.dev-finance-info .radio-inline input{
		margin-top: 10px;
	}
	
	.dev-finance-info .form-control{
		width: 30%;
		display: inline-block;
	}
	
	.dev-finance-info .file-control{
		display:inline-block;
		margin-top: 5px;
	}
	
	.dev-finance-info .file-form{
		margin-bottom:15px;
	}
	
	.dev-finance-info .file-tips{
		color:red;
	}
	
	.dev-finance-info .dividing{
		border-top: 1px solid #ccc;
		width: 70%;
		margin-bottom: 20px;
	}

	.dev-finance-info .operation-bar{
		margin:40px 0 40px 125px; 
	}

	.dev-finance-info .require{
		color: red;
		padding-right: 5px;
	}
	
	.dev-finance-info .btn-cancel{
		margin-left: 15px;
	}

	.dev-finance-info .errors{
		color: red;
		display:inline-block;
		margin-left:10px;
	}

	
</style>