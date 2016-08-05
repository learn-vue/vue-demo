<template>
	<div id="g_top" class='g-top'>
		<div class='g-container clearfix'>
			 <h1 class="pull-left top-logo">
			 	<a class="logo">ADroi 广告平台</a>
			 </h1>
		</div>
	
	</div>
	<div class="signup-box">
		<div class="adm-signup-steptwo">
		
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
				
					<validator name="validation" >

						<form novalidate>
						
							<div class="form-group">
								<label><span class="require">*</span>真实姓名</label>
								<input type="text" v-validate:real-name="{ required: true}"  v-model="realName" class="form-control" autocomplete="off" placeholder="请填写真实姓名"/>

								<div v-if="$validation.realName.touched" class="errors">
									<div v-if="$validation.realName.required">真实姓名不能为空</div>
								</div>
							</div>

							<div class="form-group">
								<label><span class="require">*</span>手机号</label>
								<input type="text" v-validate:phone="{ required: true,phone:true}"  v-model="phone" class="form-control" placeholder="请填写手机号"/>

								<div v-if="$validation.phone.touched" class="errors">
									<div v-if="$validation.phone.required">手机号不能为空</div>
									<div v-if="!$validation.phone.required && $validation.phone.phone">手机号码格式不正确！</div>
								</div>
							</div>

							<div class="form-group">
								<label><span class="require">*</span>邮箱</label>
								<input type="text" v-validate:email="{ required: true,email:true}"  v-model="email" class="form-control" placeholder="请填写邮箱"/>

								<div v-if="$validation.email.touched" class="errors">
									<div v-if="$validation.email.required">邮箱不能为空</div>
									<div v-if="!$validation.email.required && $validation.email.email">邮箱格式不正确！</div>
								</div>
							</div>

							<div class="form-group">
								<label>QQ号</label>
								<input type="text" v-validate:qq="{qq:true}"  v-model="qq" class="form-control" placeholder="请填写QQ号"/>

								<div v-if="$validation.qq.qq" class="errors">
									<div>QQ号格式不正确！</div>
								</div>
							</div>

							<div class="form-group">
								<label><span class="require">*</span>国家</label>
								<select @change="loadProvinces()" v-model="country" class="form-control" placeholder="请选择国家">
									<option trace-id="id" v-for="country in countries" value="{{country.id}}">{{country.text}}</option>
								</select>
							</div>

							<div class="form-group">
								<label><span class="require">*</span>省/区</label>
								<select @change="loadCities()" v-model="province" class="form-control" placeholder="请选择省/市">
									<option trace-id="id" v-for="province in provinces" value="{{province.id}}">{{province.text}}</option>
								</select>
							</div>

							<div class="form-group">
								<label><span class="require">*</span>城市</label>
								<select v-model="city" class="form-control" placeholder="请选择城市">
									<option trace-id="id" v-for="city in cities" value="{{city.id}}">{{city.text}}</option>
								</select>
							</div>

							<div class="form-group">
								<label>区/县</label>
								<input type="text" v-model="county" class="form-control" placeholder="请填写区/县"/>
							</div>

							<div class="form-group">
								<label><span class="require">*</span>街道</label>
								<input type="text" v-validate:street="{ required: true}"  v-model="street" class="form-control" placeholder="请填写街道"/>

								<div v-if="$validation.street.touched" class="errors">
									<div v-if="$validation.street.required">街道不能为空</div>
								</div>
							</div>
							
							<div class="clearfix button-group">
								<a type="button" href="javascript:history.go(-1)" :class="{'btn-cancel':true,btn:true,'btn-default':true}">上一步</a>
								<a type="submit" id="signup-btn" :class="{'signup-btn':true,btn:true,'btn-save':true,'btn-primary':true,disabled:$validation.email.invalid || $validation.phone.invalid || $validation.realName.invalid || $validation.street.invalid || $validation.qq.qq}" @click="saveUserInfo">下一步</a>
							</div> 
							
						</form>
						
					</validator>
					
				</div>
				
			</div>

			<div class="copyright">上海卓悠网络科技有限公司 沪ICP备14018373号-5</div>
			
		</div>
	</div>
</template>

<script>

	module.exports = {
		data:function(){
			return {
				wait:{id:"",text:"加载中,请稍后..."},
				empty:{id:"",text:"请先选择上级..."},
				countries:[],
				provinces:[],
				cities:[],
				realName:'',
				phone:'',
				email:'',
				qq:'',
				country:'',//国家
				province:'',//省市
				city:'',//城市
				county:'',//区县
				street:'',//街道
				userId:this.$route.query.userId
			};
		},
		ready:function(){
	
        	this.countries=[this.wait];
   
   			this.loadCountries();
   			     	
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
			loadCountries:function(){
			
	        	//加载国家数据
	        	this.$http.get('/v1/dict/regions/countries').then(function(res){
	      
	        		var data=res.data;
	        		
	        		if(data.ret!=1)
	        			return;
	        		
	        		var results=data.result;
	   		
	   				if(!results.length)
	   					return;
	   				
	   				this.countries=results;
	   
	   				if(this.country=='')
	   					this.country=results[0].id;		
	   							
	   				this.provinces=[this.empty];
	   				this.province="";
	   				
	   				this.cities=[this.empty];
	   				this.city="";
	   				
	   				this.loadProvinces(this.country);
	   
	        	},function(){});
        
			},
			loadProvinces:function(){
				
				this.provinces=[this.wait];
				this.province='';
				
				//加载省市数据
	        	this.$http.get('/v1/dict/regions/provinces',{countryId:this.country}).then(function(res){
	      
	        		var data=res.data;
	        		
	        		if(data.ret!=1)
	        			return;
	        		
	        		var results=data.result;
	   		
	   				if(!results.length)
	   					return;
	   				
	   				this.provinces=results;
	
	   				if(this.province=='')
	   					this.province=results[0].id;		
	   					
	   				this.cities=[this.empty];
	   				this.city="";
	   				
	   				this.loadCities(this.province);
	   				
	        	},function(){});
	        	
			},
			loadCities:function(provinceId){
				
				this.cities=[this.wait];
				this.city='';
				
				//加载城市数据
	        	this.$http.get('/v1/dict/regions/cities',{provinceId:this.province}).then(function(res){
	      
	        		var data=res.data;
	        		
	        		if(data.ret!=1)
	        			return;
	        		
	        		var results=data.result;
	   		
	   				if(!results.length)
	   					return;
	   				
	   				this.cities=results;
	
	   				if(this.city=='')
	   					this.city=results[0].id;		
	   		
	        	},function(){});
	        	
			},
			saveUserInfo:function(){
		
				this.mask();
		
				var params = {
					realName:this.realName,
					phone:this.phone,
					email:this.email,
					qq:this.qq,
					country:this.country,
					province:this.province,
					city:this.city,
					county:this.county,
					street:this.street,
					userId:this.userId,
					accountType:'adm'
				}

				this.$http.post('/v1/adm/signup/userInfo',params).then(function(res){
			
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
						path:'/adm/signup/success?userId=' + data.result.userId 
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
	.adm-signup-steptwo{
		margin: 30px auto;
		width:680px;
	}

	.signup-box{
		width: 100%;
		overflow: auto;
		top: 50px;
		bottom: 0;
		position: absolute;
	}
	
	.adm-signup-steptwo .require{
		color:red;
	}
	
	.adm-signup-steptwo .signup-logo{
		text-align: center;
		color: #0098ce;
		margin-bottom: 20px;
	}

	.adm-signup-steptwo .signup-step-box{
		text-align: center;
		height: 35px;
	}

	.adm-signup-steptwo .signup-step{
		display: inline-block;
	}

	.adm-signup-steptwo .signup-step.active{
		text-decoration: none;
	}

	.adm-signup-steptwo .signup-step.active{
		color: #0098ce;
	}

	.adm-signup-steptwo .step-line{
		margin: 0 20px;
	}

	.adm-signup-steptwo .signup-content{
		border: 1px solid #c2c3c7;
		margin-bottom: 50px;
	}
	
	.adm-signup-steptwo .signup-tab{
		width: 100%;
		text-align: center;
		display: inline-block; 
		height: 40px;
		line-height: 40px;
		background: #f0f0f0;
		color: #333;
		text-decoration: none;
	}

	.adm-signup-steptwo .signup-tab.active{
		background: #0098ce;
		color: #fff;
	}

	.adm-signup-steptwo .signup-steping{
		color: #0098ce;
		background: #fff;
		padding: 10px 20px;
	}
	
	.adm-signup-steptwo .signup-body{
		background: #fff;
		padding: 30px 60px;
	}

	.adm-signup-steptwo .signup-btn{
	    margin: 20px 0;
	    width: 150px;
	    margin-left: 25px;
	}

	.adm-signup-steptwo .btn-cancel{
		margin: 20px 0;
	    width: 150px;
	}
	
	.adm-signup-steptwo .errors{
		color: red;
		display:block;
		margin-left:100px;
	}
	
	.adm-signup-steptwo .font16{
		font-size: 16px;
	}
	
	.adm-signup-steptwo .form-control{
		width: 330px;
		display: inline-block;
	}

	.adm-signup-steptwo .form-group label{
		width: 100px;
		text-align: right;
		padding-right: 15px;
		font-weight: normal;
	}

	.adm-signup-steptwo .button-group{
		margin-left: 105px;
    	width: 330px;
	}
	/*进度条部分*/
	.adm-signup-steptwo .signup-title{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-bottom: 0;
	}

	.adm-signup-steptwo .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.adm-signup-steptwo .step-one{
		width: 33.333333333%;
		background: #0098ce;
		color: #fff;
	}
	
	.adm-signup-steptwo .step-two{
		width: 33.333333333%;
		background: #0098ce;
		color: #fff;
	}

	.adm-signup-steptwo .step-three{
		width: 33.333333333%;
		background: #d7dadf;
		color: #fff;
	}

	.adm-signup-steptwo .step-one .triangle-right,.adm-signup-steptwo .step-two .triangle-right{
		border-color: transparent transparent transparent #0098ce;
	}

	.adm-signup-steptwo .step-three .triangle-right{
		border-color: transparent transparent transparent #d7dadf;
	}

	.adm-signup-steptwo .signup-title .triangle-right {
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -41px;
		width: 0;
		z-index: 1;
	}

	.adm-signup-steptwo .signup-title .triangle-right-bg {
		border-color: transparent transparent transparent #fff;
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -43px;
		top: 0px;
		width: 0;
		z-index: 1;
	}
</style>
