<template>
	<div class="dev-config-source">
		
		<div class="crumbs">
			<h4 class="crumbs-title">配置广告源</h4>
		</div>
		
		<validator name="validation" >

			<form novalidate class="config-form">
			
				<div class="form-group">
					<label class="form-title">开发者名称：</label>
					<input type="text" class="form-control" v-model="devName" readonly placeholder="请填写开发者名称">
				</div>

				<div class="form-group">
					<label class="form-title">应用名称：</label>
					<input type="text" class="form-control" v-model="appName" readonly placeholder="请填写应用名称">
				</div>

				<div class="form-group">
					<label class="form-title"></label>
					<div class="dividing-line"></div>
				</div>

				<div class="ad-box" v-if="ads.length > 0" v-for="(index,source) in ads">

					<div v-if="source.channelCode === 'SYSTEM'" class="form-group">
						<label class="form-title"></label>
						<div class="adv-source">
							<span class="source-title">广告来源</span>
							<span class="source-title">应用ID</span>
							<span class="source-title">广告位ID</span>
							<span class="source-title">流量比重</span>

						</div>
					</div>

					<div v-if="source.channelCode === 'SYSTEM'" class="form-group">
						<label class="form-title">广告源：</label>
						<div class="adv-source">
							<input type="text" class="form-control" value="系统" readonly placeholder="请填写广告来源 ">
							<input type="text" class="form-control" v-model="source.channelAppId" readonly placeholder="请填写应用ID">
							<input type="text" class="form-control" v-model="source.channelSlotId" readonly placeholder="请填写广告位ID">
							<input type="text" class="form-control" v-model="source.channelWeight" readonly placeholder="请填写流量比重">

						</div>
					</div>
					<div v-else class="form-group">
						<label class="form-title"></label>
						<div class="adv-source">
							<select class="form-control" v-model="source.channelCode">
								<option v-for="sourceType in sourceTypes"  value="{{sourceType.channelCode}}">{{sourceType.channelName}}</option>
							</select>
							<input type="text" @blur="doBlurValidate('channelAppId',$index)" class="form-control" v-model="source.channelAppId" placeholder="请填写应用ID">
							<input type="text" @blur="doBlurValidate('channelSlotId',$index)" class="form-control" v-model="source.channelSlotId" placeholder="请填写广告位ID">
							<input type="text" @blur="doBlurValidate('channelWeight',$index)" class="form-control" v-model="source.channelWeight" placeholder="请填写流量比重">
							<a class="delete-source" @click="deleteSource($index,$event)">删除</a>
						</div>
					</div>
					<div v-if="source.adName !== 'SYSTEM'" id="errors_channelAppId_{{$index}}" class="errors errors-channelAppId">应用ID不能为空</div>
					<div v-if="source.adName !== 'SYSTEM'" id="errors_channelSlotId_{{$index}}" class="errors errors-channelSlotId">广告位ID不能为空</div>
					<div v-if="source.adName !== 'SYSTEM'" id="errors_channelWeight_{{$index}}" class="errors errors-channelWeight">流量比重不能为空</div>
				</div>
				
				<div class="form-group">
					<button type="button" @click="addSource" class="btn btn-default btn-more">+创建更多广告源</button>
				</div>

				<div class="btn-operation">
					<a href="javascript:void(0);" @click="submit" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:!allowNext}">保存</a>
					<a  v-link="{path:'/adm/dev/app'}" class="btn btn-default btn-cancel">取消</a>
				</div>
			</form>
		</validator>
	</div>

</template>

<script>

module.exports = {
	props: {
	},
	components:{
	},
	data : function() {
		
		return {
			allowNext:false,
			devId: 		this.$route.query.devId,
			devName: 	this.$route.query.devName,
			id: 		this.$route.query.id,
			appName: 	this.$route.query.appName,
			adslotId: 	this.$route.query.adslotId,
			sourceType:'',//广告源类型
			ads:[{
				channelCode:'',
				channelAppId:'',
				channelSlotId:'',
				channelWeight:'',
			}],
			sourceTypes:[{
				channelCode:"-1",
				channelName:"加载中，请稍后"
			}],
			channelMap:{

			}
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
	computed:{
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
		//错误校验信息元素是否存在
		getErrorElement:function(name,index){

			var ele=document.getElementById("errors_"+name+"_"+index);

			return ele;
		},
		//文本框失去焦点时候校验
		doBlurValidate:function(name,index){
			
			var value=this.ads[index][name];

			var showError=!value;
			
			var ele=this.getErrorElement(name,index);
			
			ele ? ele.style.display=showError ? "block" : "none" : false;

			if(showError)
				this.allowNext=false;
			else
				this.calAllowNext();
		},
		//校验每一条广告源
		doValidateAd:function(index){
		
			var Ad=this.ads[index];
			
			var ele=this.getErrorElement("channelAppId",index);
			
			if(ele && !Ad.channelAppId)
					return false;
		
			ele=this.getErrorElement("channelSlotId",index);
			
			if(ele && !Ad.channelSlotId)
				return false;

			ele=this.getErrorElement("channelWeight",index);
			
			if(ele && !Ad.channelWeight)
				return false;

			return true;
		},
		//校验所有的广告源
		doValidateAds:function(){
			
			var cs=this.ads;
			for(var i=0,l=cs.length;i<l;i++){

				if(this.doValidateAd(i)===false){
					return false;
				}
			}
			return true;
		},
		calAllowNext:function(){
	
			var self=this;
			setTimeout(function(){self.allowNext=self.doValidateAds();},0);

		},
		submit:function(){
			this.mask();

			for(var i = 0;i<this.ads.length;i++){

				this.ads[i].channelName = this.channelMap[this.ads[i].channelCode];
				
				if(this.ads[i].channelCode == 'SYSTEM'){
					this.ads[i].channelName = '系统';
				}
			}

			this.$http.post("/v1/adm/apps/"+this.id+ "/" + this.adslotId+ "/sources",{ads:JSON.stringify(this.ads)}).then(function(res){

				this.unmask();
				
				var data = res.data;

				if(data.ret == 1){
					$.confirm({
						title: '提示',
						content: "配置成功",
						confirmButton: '确认',
						cancelButton:false
					});
				}else{
					$.confirm({
						title: '提示',
						content: "配置失败："+data.message,
						confirmButton: '确认',
						cancelButton:false
					});
				}
			},function(){

				this.unmask();
			});
		},
		addSource:function(){

			this.ads.push({
				channelCode:this.sourceTypes[0].channelCode,
				channelAppId:'',
				channelSlotId:'',
				channelWeight:'',
				_timestamp:+(new Date())
			});

			this.calAllowNext();
		},
		deleteSource:function(index,$event){
				
			// 删除一个广告位
			this.ads.splice(index, 1);

			this.calAllowNext();
		}
	},
	ready : function() {
		this.mask();

		//加载数据字典 广告源类型
		this.$http.get("/v1/dict/types/adSource").then(function(res){
			
			this.unmask();
			
			var data=res.data;
			
			if(data.ret!=1)
				return;
			
			var result=data.result;
			
			if(!result.length)
				return;
				
			this.sourceTypes=result;

			// delete this.sourceTypes;

			for(var i = 0;i<result.length;i++){

				this.channelMap[result[i].channelCode] = result[i].channelName;

				if(result[i].channelName == '系统'){
				
					this.sourceTypes.splice(i,1);
				}
			}

			
			if(this.ads[0].type=="-1")
				this.ads[0].type=this.sourceTypes[0].id;
			
		},function(){this.unmask();});

		this.mask();
		
		var params={
			appId:this.id,
			devId:this.devId,
			adslotId:this.adslotId
		};
		
		var resource = this.$resource('/v1/adm/apps/{appId}/{adslotId}/sources');
		
		resource.get(params).then(function(res){
		
			this.unmask();
			
			var data=res.data;
			
			//Error
			if(data.ret!=1){
				
				return;
			}
	
			this.ads=data.result.ads;

			this.allowNext=true;

		},function(){
		
			this.unmask();
			
		});
	}
};
</script>

<style lang="less">
	
	.dev-config-source{
		padding:15px 28px 30px;
		background: white;
	}

	.dev-config-source .config-form{
		padding:20px 0 20px 20px;
	}

	.dev-config-source .form-title{
		width: 100px;
		text-align: right;
		padding-right: 15px;
		vertical-align: top;
		margin-top: 5px;
	}
	
	.dev-config-source .submit{
		margin-left: 10px;
	}

	.dev-config-source .form-control{
		width: 288px;
		display: inline-block;
	}
	
	.dev-config-source .no-margin{
		margin: 0;
	}

	.dev-config-source .form-title  .form-control{
		width: 100%;
		display: inline-block;
	}

	.dev-config-source .btn-operation{
		margin: 0 20px 0 105px; 
	}

	.dev-config-source .btn-cancel{
		margin-left: 20px;
	}

	.dev-config-source .dividing-line{
		display: inline-block;
		width: 70%;
		border-top: 1px dashed gray;
	}

	.dev-config-source .source-title{
		width: 138px;
		display: inline-block;
		margin-right: 10px;
		padding-left: 10px;
	}

	.dev-config-source .adv-source{
		width: 70%;
		display: inline-block;
	}

	.dev-config-source .adv-source .form-control{
		margin-right: 10px;
   		width: 138px;
	}

	.dev-config-source .delete-source{
		cursor: pointer;
	}

	.dev-config-source .btn-more{
		margin: 20px 0 60px 105px;
	}

	.dev-config-source .errors{
		color: red;
		margin:-10px 0 10px 105px;
		display: none;
	}

	.dev-config-source .ad-box{
		position: relative;
		margin-bottom: 30px;
	}

	.dev-config-source .errors-channelAppId{
		position: absolute;
		left: 153px;
	}

	.dev-config-source .errors-channelSlotId{
		position: absolute;
		left: 305px;
	}

	.dev-config-source .errors-channelWeight{
		position: absolute;
		left: 455px;
	}

</style>
