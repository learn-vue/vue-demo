<template>
	<div class="adv-target-create">
		
		<a v-link="{path:'/adv/campaign/index'}"  class="btn btn-primary btn-common">返回</a>
		
		<ul class="adv-target-create-steps">
			<li class="step step-one">创建广告计划
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
			<li class="step step-two">自定义投放定向
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
			<li class="step step-three">创建广告创意
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
			<li class="step step-four">完成
			</li>
		</ul>
		
		<validator name="validation" >
		
			<form class="adv-target-create-form">
	
				<div class="form-group">
					<label class="form-title form-title-top">操作系统：</label>
					<label class="checkbox-inline">
						<input type="checkbox" v-model="os" value="iOS" v-validate:os="{required:true}">iOS
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" v-model="os" value="Android" v-validate:os>Android
					</label>
					
					<div v-if="$validation.os.touched" class="errors">
						<div v-if="$validation.os.required">请选择操作系统</div>
					</div>
				</div>
	
				<div class="form-group">
					<label class="form-title form-title-top" for="">投放时间段：</label>
					<label class="radio-inline">
						<input type="radio" name="isAllHour" v-model="isAllHour" value="0" v-validate:hour="{requiredHour:true}" />不限
					</label>
					<label class="radio-inline">
						<input type="radio" name="isAllHour" v-model="isAllHour" value="1" v-validate:hour />指定时间段
					</label>
					
					<div v-if="this.isAllHour=='1' || $validation.hour.touched" class="errors">
						<div v-if="$validation.hour.requiredHour">请选择投放时间段</div>
					</div>
					
				</div>
	
				<div v-if="isAllHour=='1'" class="form-group hour-list">
					<label class="form-title"></label>
					<ul class="list-options list-unstyled">
						<li v-for="(idx,rrr) in hour"  track-by="text" :class="{'active':rrr.selected}" @click="clickHour(idx)">{{rrr.text}}</li>
					</ul>
				</div>
	
				<div class="form-group">
					<label class="form-title form-title-top">投放地域：</label>
					<label class="radio-inline">
						<input type="radio" name="isAllRegion" v-model="isAllRegion" value="0"  v-validate:region="{requiredRegion:true}" />不限
					</label>
					<label class="radio-inline">
						<input type="radio" name="isAllRegion" v-model="isAllRegion" value="1"  v-validate:region />选择省份
					</label>
					
					<div v-if="this.isAllRegion=='1' || $validation.region.touched" class="errors">
						<div v-if="$validation.region.requiredRegion">请选择投放地域</div>
					</div>
					
				</div>
	
				<div v-if="isAllRegion=='1'" class="form-group province-list">
					<label class="form-title"></label>
					<ul class="list-options list-unstyled">
						<li v-for="(idx,rrr) in region"  track-by="id" :class="{'active':rrr.selected}" @click="clickRegion(idx)">{{rrr.text}}</li>
					</ul>
				</div>
	
				<div class="form-group">
					<label class="form-title">应用类型：</label>
					<select class="form-control" v-model="mediaType">
						<option value="-1">不限</option>
						<option v-for="result in mediaTypes" track-by="id" value="{{result.id}}">{{result.text}}</option>
					</select>
				</div>
	
				<div class="form-group">
					<label class="form-title form-title-top">投放网络：</label>
					<label class="checkbox-inline">
						<input type="checkbox" v-model="network" value="WIFI" v-validate:network="{required:true}">WIFI
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" v-model="network" value="2G" v-validate:network>2G
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" v-model="network" value="3G" v-validate:network>3G
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" v-model="network" value="4G" v-validate:network>4G
					</label>
					
					<div v-if="$validation.network.touched" class="errors">
						<div v-if="$validation.network.required">请选择投放网络</div>
					</div>
				</div>
	
				<div class="operation-bar">
					<a href="javascript:void(0);" @click="back" class="btn btn-default btn-cancel">上一步</a>
					<a href="javascript:void(0);" @click="createTarget" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:$validation.invalid}">保存并继续</a>
				</div>
				
			</form>
		
		</validator>
		
	</div>
</template>	

<script>

	module.exports = {
		data:function(){

			return {
				isUpdate:false,
				campaignId:this.$route.query.campaignId,
				os:['iOS','Android'],
				hour:[],
				region:[],
				mediaType:"-1",
				mediaTypes:[{id:"-1",text:"加载中，请稍后"}],
				network:["WIFI","2G","3G","4G"],
				isAllHour:'0',
				isAllRegion:'0',
				endDate: this.$route.query.endDate,//投放日期
				startDate:this.$route.query.startDate//投放日期
			};

		},
		validators: {
		
			requiredHour: function (val) {

		     	if(val[0]=="0")
					return true;
					
				var hour=this.vm.$data.hour;
				
				if(!hour)
					return true;
					
				for(var i=0,l=hour.length;i<l;i++)
					if(hour[i].selected)
						return true;
						
		     	return false;
		     	
		    },
		    requiredRegion: function (val) {

				if(val[0]=="0")
					return true;
		
				var region=this.vm.$data.region;
				
				if(!region)
					return true;
							
				for(var i=0,l=region.length;i<l;i++)
					if(region[i].selected)
						return true;
						
		     	return false;
		    
		    },
		    
		},
		ready:function(){
			
			var hour=[];
			for(var i=1;i<=24;i++)
				hour[i-1]={id:i,text:this.rpad(i)+"点",selected:false};
			this.hour=hour;
					
			////////////////////////////////////////////////////////////////
			
			this.mask();
			
			//投放应用类型
			this.$http.get("/v1/dict/apps/industry/category1").then(function(res){
				
				this.unmask();
				
				var data=res.data;
				
				if(data.ret!=1)
					return;
					
				this.mediaTypes=data.result;
				
				// if(this.mediaType=="-1")
				// 	this.mediaType=this.mediaTypes[0].id;
			
			},function(){this.unmask();});
			
			////////////////////////////////////////////////////////////////
			
			this.mask();
			
			//地理信息
			this.$http.get('/v1/dict/regions/provinces',{countryId:'000000'}).then(function(res){
				
				this.unmask();
				
				var data=res.data;
				
				if(data.ret!=1)
					return;
					
				var provinces=data.result;
				for(var i=0,l=provinces.length;i<l;i++)
					provinces[i].selected=false;
			
				this.region=provinces;

				////////////////////////////////////////////////////////////////
				////////////////////////////////////////////////////////////////
				////////////////////////////////////////////////////////////////
				////////////////////////////////////////////////////////////////
		
				//加载数据
				this.$http.get("/v1/adv/campaigns/{campaignId}/targets",{
					campaignId:this.campaignId
				}).then(function(res){
					
					this.unmask();
					
					var data=res.data;
					
					if(data.ret!=1)
						return;
					
					var result=data.result;
					
					if(!result || !result.length)
						return;
						
					result=result[0];
					
					this.network=result.network.split(",");
					
					this.mediaType=result.mediaType;
					
					this.os=result.os.split(",");
					
					var region=result.region;
					
					if(region!="-1"){
					
						this.isAllRegion='1';
						
						region=region.split(",");
						
						for(var i=0,l=this.region.length;i<l;i++)
							for(var m=0,n=region.length;m<n;m++)
								if(this.region[i].id==region[m]){
								
									this.region[i].selected=true;
								
									break;
								}
					
					}
						
					var hour=result.hour;
					
					if(hour!="-1"){
					
						this.isAllHour='1';
						
						hour=hour.split(",");
						
						for(var i=0,l=hour.length;i<l;i++)
							this.hour[(+hour[i])-1].selected=true;
							
					}
					
				},function(){this.unmask();});
			
				////////////////////////////////////////////////////////////////
				////////////////////////////////////////////////////////////////
				////////////////////////////////////////////////////////////////
				////////////////////////////////////////////////////////////////
				
			},function(){this.unmask();});
	
		},
		route:{
			activate: function (transition) {
			 
			  transition.next();
			  
			},
			deactivate: function (transition) {
			 
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
			rpad:function(v){
			
				return v < 10 ? "0"+v : v;
			},
			createTarget:function(){

				var params={
					campaignId:this.campaignId,
					os:this.os.join(","),
					network:this.network.join(","),
					mediaType:this.mediaType,
					startDate:this.startDate,
					endDate:this.endDate
				};
				
				params.hour="-1";
				
				if(this.isAllHour!='0'){
				
					params.hour=[];
					
					for(var i=0,l=this.hour.length;i<l;i++)
						if(this.hour[i].selected)
							params.hour.push(this.hour[i].id);
					
					params.hour=params.hour.join(",");
					
				}
			
				params.region="-1";
				
				if(this.isAllRegion!='0'){
					
					params.region=[];
					
					for(var i=0,l=this.region.length;i<l;i++)
						if(this.region[i].selected)
							params.region.push(this.region[i].id);
							
					params.region=params.region.join(",");
							
				}
		
				this.mask();
				
				this.$http.post("/v1/adv/campaigns/"+this.campaignId+"/targets",params).then(function(res){

					var data = res.data;

					if(data.ret!=1){
						
						this.unmask();
						
						return $.confirm({
							title: "提示",
							content: '创建失败:'+data.message,
							confirmButton: '确定',
        					cancelButton: false
						});
						
					}
					
					this.$route.router.go({
						path:'/adv/campaign/creative?campaignId=' + this.campaignId
					});
					
				},function(){this.unmask();});
					
			},

			clickHour:function(index){

				this.hour[index].selected=!this.hour[index].selected;
	
				this.$validate("hour");
				
			},
			
			clickRegion:function(index){

				this.region[index].selected=!this.region[index].selected;
			
				this.$validate("region");
			
			},
			back:function(){

				//回到上一步
				this.$route.router.go({
					path:'/adv/campaign?campaignId=' + this.campaignId
				});
				
			}
		}
	};

</script>

<style>
	.adv-target-create{
		padding:15px 28px 0;
		background-color: white;
	}

	/*进度条部分*/
	.adv-target-create .adv-target-create-steps{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-bottom: 0;
		margin-top:20px;
	}

	.adv-target-create .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.adv-target-create .step-one{
		width: 25%;
		background: #09c;
		color: #fff;
	}
	
	.adv-target-create .step-two{
		width: 25%;
		background: #09c;
		color: #fff;
	}

	.adv-target-create .step-three{
		width: 25%;
		background: #cccfd3;
	}

	.adv-target-create .step-four{
		width: 25%;
		background: #cccfd3;
	}

	.adv-target-create .step-one .triangle-right,.adv-target-create .step-two .triangle-right{
		border-color: transparent transparent transparent #09c;
	}

	.adv-target-create .step-three .triangle-right{
		border-color: transparent transparent transparent #cccfd3;
	}

	.adv-target-create-steps .triangle-right {
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -42px;
		width: 0;
		z-index: 1;
	}

	.adv-target-create-steps .triangle-right-bg {
		border-color: transparent transparent transparent #fff;
		border-style: solid;
		border-width: 22px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -46px;
		top: -1px;
		width: 0;
		z-index: 1;
	}

	.adv-target-create-form{
		padding: 20px 0;
		background-color: #fff;
	}

	.adv-target-create .form-title{
		width: 150px;
		text-align: right;
		padding-right: 15px;
		font-weight: normal;
	}

	.adv-target-create .form-title-top{
		vertical-align: top;
	}
	
	.adv-target-create .form-control{
		width: 30%;
		display: inline-block;
	}

	.adv-target-create .delete-target{
		margin-left: 15px;
		cursor: pointer;
	}

	.adv-target-create .list-options{
		display: inline-block;
		width: 500px;
		margin-bottom:0;
	}

	.adv-target-create .btn-save{
		margin-left: 20px;
	}

	.adv-target-create .list-options li{
		float: left;
		padding:3px 8px;
		margin: 0 12px 10px 0;
		text-align: center;
		cursor: pointer;
		border: 1px solid #ccc;
	}
	
	.adv-target-create .list-options li.active{
		background-color: #0098ce;
	    border-color: #0098ce;
	    color: white;
	}

	.adv-target-create .list-options li:hover{
		background-color: #0098ce;
	    border-color: #0098ce;
	    color: white;
	}
	
	.adv-target-create .operation-bar{
		margin:40px 20px 20px 155px;
	}
	
	.adv-target-create .errors{
		display:inline-block;
		color:red;
		margin-left:10px;
	}
</style>