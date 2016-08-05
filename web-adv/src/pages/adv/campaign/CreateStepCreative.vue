<template>
	<div class="adv-creative-create">
		
		<a v-link="{path:'/adv/campaign/index'}"  class="btn btn-primary btn-common">返回</a>
		
		<ul class="adv-creative-create-steps">
		
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
		
		<form v-for="(index,creative) in creatives" track-by="_timestamp" class="adv-creative-create-form">
		
			<input type="hidden" v-model="creative.id" />
			
			<div class="form-group">
				<label class="form-title">创意名称</label>
				<input type="text" @blur="doBlurValidate('codeName',$index)" class="form-control" placeholder="请填写创意名称" v-model="creative.codeName"/>
				
				<a @click="deleteCreative(index)" class="delete-creative" href="javascript:void(0);">删除此创意</a>
				<div id="errors_codeName_{{$index}}" class="errors">创意名称不能为空</div>
			</div>
		
			<div class="form-group">
				<label class="form-title">广告类型</label>
				<select class="form-control" @change="adTypeOnProductChange($index)" v-model="creative.adTypeOnProduct">
					<option v-for="adslotType in adslotTypes" value="{{adslotType.id}}">{{adslotType.text}}</option>
				</select>
			</div>
				
			<div class="form-group">
				
				<label class="form-title form-title-top">广告形式</label>
				
				<label v-if="creative.adTypeOnProduct!='NATIVE'" class="radio-inline">
				  <input type="radio" @change="adTypeOnInterfaceChange($index)" value="IMAGE" v-model="creative.adTypeOnInterface"> 图片
				</label>
		
				<label v-if="creative.adTypeOnProduct=='BANNER'" class="radio-inline">
				  <input type="radio" @change="adTypeOnInterfaceChange($index)" value="IMAGE_TEXT" v-model="creative.adTypeOnInterface"> 图文
				</label>
				
				<label v-if="creative.adTypeOnProduct=='BANNER'" class="radio-inline">
				  <input type="radio" @change="adTypeOnInterfaceChange($index)" value="TEXT" v-model="creative.adTypeOnInterface"> 文字
				</label>
				
				<label v-if="creative.adTypeOnProduct=='NATIVE'" class="radio-inline">
				  <input type="radio" value="-1" checked v-model="creative.adTypeOnInterface"> 全部
				</label>
				
			</div>
			<!--Banner-->
			<div v-if="creative.adTypeOnProduct=='BANNER'">
			
				<!--Banner图片-->
				<div v-if="creative.adTypeOnInterface=='IMAGE'" class="form-group">
					<label class="form-title">&nbsp;</label>
					<div class="file-control">
						<file accepts="jpg|png"
							upload="/v1/adv/campaigns/{campaignId}/materials" :upload-params="{campaignId:this.campaignId,type:'BANNER_IMAGE'}"
						  	download="/v1/adv/campaigns/{campaignId}/materials/{materialId}" :download-params="{campaignId:this.campaignId,type:'BANNER_IMAGE'}"
						  	:material-id.sync="creative.materialBannerImageId" 
						  	:material-name.sync="creative.materialBannerImageName">
						</file>
						<p class="tips">请选择大小为800*120，jpg、png格式文件</p>
					</div>
				</div>
				
				<!--Banner图文-->
				<div v-if="creative.adTypeOnInterface!='IMAGE'" class="form-group">
					<label class="form-title">广告语</label>
					<input type="text" @blur="doBlurValidate('headline',$index)" class="form-control" placeholder="请填写广告语" v-model="creative.headline"/>
					<div id="errors_headline_{{$index}}" class="errors">广告语不能为空</div>
				</div>
				
				<div v-if="creative.adTypeOnInterface!='IMAGE'" class="form-group">
					<label class="form-title describe">描述</label>
					<textarea @blur="doBlurValidate('body',$index)" class="form-control" placeholder="请填写描述" v-model="creative.body"></textarea>
					<div id="errors_body_{{$index}}" class="errors">描述不能为空</div>
				</div>
				
				<!--Banner图文-->
				<div v-if="creative.adTypeOnInterface=='IMAGE_TEXT'" class="form-group">
					<label class="form-title">图标</label>
					<div class="file-control">
						<file accepts="jpg|png"
							upload="/v1/adv/campaigns/{campaignId}/materials" :upload-params="{campaignId:this.campaignId,type:'ICON_IMAGE'}"
						  	download="/v1/adv/campaigns/{campaignId}/materials/{materialId}" :download-params="{campaignId:this.campaignId,type:'ICON_IMAGE'}"
						  	:material-id.sync="creative.materialLogoId" 
						  	:material-name.sync="creative.materialLogoName">
						</file>
						<p class="tips">请选择大小为96*96，jpg、png格式文件</p>
					</div>
				</div>
				
			</div>
			
			<!--开屏-->
			<div v-if="creative.adTypeOnProduct=='SPLASH'">
			
				<!--图片-->
				<div class="form-group">
					<label class="form-title">&nbsp;</label>
					<div class="file-control">
						<file accepts="jpg|png"
							upload="/v1/adv/campaigns/{campaignId}/materials" :upload-params="{campaignId:this.campaignId,type:'SPLASH_IMAGE'}"
						  	download="/v1/adv/campaigns/{campaignId}/materials/{materialId}" :download-params="{campaignId:this.campaignId,type:'SPLASH_IMAGE'}"
						  	:material-id.sync="creative.materialSplashImageId" 
						  	:material-name.sync="creative.materialSplashImageName">
						</file>
						<p class="tips">请选择大小为720*1280，jpg、png格式文件</p>
					</div>
				</div>
	
			</div>
			
			<!--插屏-->
			<div v-if="creative.adTypeOnProduct=='INTERSTITIAL'">
				<!--图片-->
				<div class="form-group">
					<label class="form-title">&nbsp;</label>
					<div class="file-control">
						<file accepts="jpg|png"
							upload="/v1/adv/campaigns/{campaignId}/materials" :upload-params="{campaignId:this.campaignId,type:'INTERSTITIAL_IMAGE'}"
						  	download="/v1/adv/campaigns/{campaignId}/materials/:materialId"  :download-params="{campaignId:this.campaignId,type:'INTERSTITIAL_IMAGE'}"
						  	:material-id.sync="creative.materialInterstitialImageId" 
						  	:material-name.sync="creative.materialInterstitialImageName">
						</file>
						<p class="tips">请选择大小为640*500，jpg、png格式文件</p>
					</div>
				</div>
	
			</div>
			
			<!--全部-->
			<div v-if="creative.adTypeOnProduct=='NATIVE'">
				<div class="form-group">
					<label class="form-title">广告语</label>
					<input type="text" @blur="doBlurValidate('headline',$index)" class="form-control" placeholder="请填写广告语" v-model="creative.headline"/>
					<div id="errors_headline_{{$index}}" class="errors">广告语不能为空</div>
				</div>
				
				<div class="form-group">
					<label class="form-title describe">描述</label>
					<textarea class="form-control" @blur="doBlurValidate('body',$index)" placeholder="请填写描述" v-model="creative.body"></textarea>
					<div id="errors_body_{{$index}}" class="errors">描述不能为空</div>
				</div>
				
				<!--图片-->
				<div class="form-group">
					<label class="form-title">图标</label>
					<div class="file-control">
						<file accepts="jpg|png"
							upload="/v1/adv/campaigns/{campaignId}/materials" :upload-params="{campaignId:this.campaignId,type:'ICON_IMAGE'}"
						  	download="/v1/adv/campaigns/{campaignId}/materials/:materialId" :download-params="{campaignId:this.campaignId,type:'ICON_IMAGE'}"
						  	:material-id.sync="creative.materialLogoId" 
						  	:material-name.sync="creative.materialLogoName">
						</file>
						<p class="tips">请选择大小为96*96，jpg、png格式文件</p>
					</div>
				</div>
				
				<!--图片-->
				<div class="form-group">
					<label class="form-title">横幅</label>
					<div class="file-control">
						<file accepts="jpg|png"
							upload="/v1/adv/campaigns/{campaignId}/materials" :upload-params="{campaignId:this.campaignId,type:'BANNER_IMAGE'}"
						  	download="/v1/adv/campaigns/{campaignId}/materials/{materialId}" :download-params="{campaignId:this.campaignId,type:'BANNER_IMAGE'}"
						  	:material-id.sync="creative.materialBannerImageId" 
						  	:material-name.sync="creative.materialBannerImageName">
						</file>
						<p class="tips">请选择大小为800*120，jpg、png格式文件</p>
					</div>
				</div>
	
				<!--图片-->
				<div class="form-group">
					<label class="form-title">插屏</label>
					<div class="file-control">
						<file accepts="jpg|png"
							upload="/v1/adv/campaigns/{campaignId}/materials" :upload-params="{campaignId:this.campaignId,type:'INTERSTITIAL_IMAGE'}"
						  	download="/v1/adv/campaigns/{campaignId}/materials/{materialId}" :download-params="{campaignId:this.campaignId,type:'INTERSTITIAL_IMAGE'}"
						  	:material-id.sync="creative.materialInterstitialImageId" 
						  	:material-name.sync="creative.materialInterstitialImageName">
						</file>
						<p class="tips">请选择大小为640*500，jpg、png格式文件</p>
					</div>
				</div>
				
				<!--图片-->
				<div class="form-group">
					<label class="form-title">开屏</label>
					<div class="file-control">
						<file accepts="jpg|png"
							upload="/v1/adv/campaigns/{campaignId}/materials" :upload-params="{campaignId:this.campaignId,type:'SPLASH_IMAGE'}"
						  	download="/v1/adv/campaigns/{campaignId}/materials/{materialId}"  :download-params="{campaignId:this.campaignId,type:'SPLASH_IMAGE'}"
						  	:material-id.sync="creative.materialSplashImageId" 
						  	:material-name.sync="creative.materialSplashImageName">
						</file>
						<p class="tips">请选择大小为720*1280，jpg、png格式文件</p>
					</div>
				</div>
			</div>

			<div class="form-group">
				<label class="form-title">交互类型</label>
				<select class="form-control" v-model="creative.adTypeOnInteraction">
					<option value="NONE" v-if="creative.adTypeOnProduct == 'SPLASH'">无动作</option>
					<option v-for="adTypeOnInteraction in adTypeOnInteractions" value="{{adTypeOnInteraction.id}}">{{adTypeOnInteraction.text}}</option>
				</select>
			</div>
			
			<div class="form-group"  v-if="creative.adTypeOnProduct == 'SPLASH'&&creative.adTypeOnInteraction == 'NONE'">
				<label class="form-title">跳转链接</label>
				<input type="text" readonly class="form-control" placeholder="" />
			</div>
			
			<!-- “无动作”交互类型只有开屏广告才有，其他广告的交互类型都是打开网页和点击下载 -->
			<div class="form-group" v-else>
				<label class="form-title">跳转链接</label>
				<input type="text" @blur="doBlurValidate('href',$index)" class="form-control" placeholder="请填写跳转链接" v-model="creative.href"/>
				<div id="errors_href_{{$index}}" class="errors">请输入正确的链接</div>
			</div>
		</form>
	
		<div class="more-creative-bar">
			<button type="button" @click="addCreative" class="btn btn-default btn-more">+创建更多广告创意</button>
		</div>
		
		<div class="operation-bar">
			<a href="javascript:void(0);" @click="back" class="btn btn-default btn-cancel">上一步</a>
			<a href="javascript:void(0);" @click="createCreative" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:!allowNext}">仅保存</a>
			<a href="javascript:void(0);" @click="submitCampaignAndCreatives" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:!allowNext}">提交审核</a>
		</div>
		
	</div>	
</template>	

<script>
	
	import File from '../../../components/File.vue';
	
	module.exports = {
		components: {
	   		'file':File
		},
		data:function(){
			return {
				allowNext:false,
				campaignId:this.$route.query.campaignId,
				adslotTypes:[{id:'-1',text:'请选择'}],
				creatives:[
					{	
						_timestamp:-1,
						adTypeOnProduct:'-1',
						codeName:'',
						adTypeOnInterface:'IMAGE',
						adTypeOnInteraction:"-1",//交互类型
						href:'',//跳转链接
						materialLogoId:-1,								//图标素材附件ID
						materialLogoName:'',							//图标素材附件名称
						materialAppIconId:-1,							//应用图标素材附件ID
						materialAppIconName:'',							//应用图标素材附件名称
						materialBannerImageId:-1,						//横幅图片素材附件ID
						materialBannerImageName:'',						//横幅图片素材附件名称
						materialSplashImageId:-1,						//开屏图片素材附件ID
						materialSplashImageName:'',						//开屏图片素材附件名称
						materialInterstitialImageId:-1,					//插屏图片素材附件ID
						materialInterstitialImageName:'',				//插屏图片素材附件名称
						body:'',//创意详情
						headline:''//创意标题
					}
				],
				adTypeOnInteractions:[
					{id:'-1',text:'请选择交互类型'}
				]
			};

		},
		ready:function(){
			
			//加载数据字典 广告位置
			this.$http.get("/v1/dict/types/adslots").then(
			function(res){
			
				this.unmask();
			
				var data=res.data;
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				this.adslotTypes=result;
	
				if(this.creatives[0].adTypeOnProduct=='-1') {
					this.creatives[0].adTypeOnProduct=result[0].id;
				}
			},
			function(){this.unmask();}
			);

			//加载数据字典 交互类型
			this.$http.get("/v1/dict/types/adinteractions").then(function(res){
			
				this.unmask();
			
				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				this.adTypeOnInteractions=result;
	
				if(this.creatives[0].adTypeOnInteraction=='-1')
					this.creatives[0].adTypeOnInteraction=result[0].id;
	
			},function(){this.unmask();});
			
			////////////////////////////////////////////////////////////
			
			//加载已有的创意信息
			if(!this.campaignId)
				return;
			
			this.mask();
			
			this.$http.get("/v1/adv/campaigns/{campaignId}/creatives",{
				campaignId:this.campaignId
			}).then(function(res){
			
				this.unmask();
			
				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var timestamp=+new Date();
				
				var result=data.result;

				if(result.length == 0){
					this.allowNext=false;
				}else{
					for(var i=0,l=result.length;i<l;i++){
						result[i]._timestamp=timestamp+i;
					}					
					this.creatives=result;
	
					this.allowNext=true;
				}
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
			//错误校验信息元素是否存在
			getErrorElement:function(name,index){
				
				var ele=document.getElementById("errors_"+name+"_"+index);
			
				return ele;
			},
			//为了触发校验
			adTypeOnProductChange:function(index){
		
				var creative=this.creatives[index];
				
				//插屏
				if(creative.adTypeOnProduct=='INTERSTITIAL')
					creative.adTypeOnInterface='IMAGE';
					
				//开屏
				if(creative.adTypeOnProduct=='SPLASH')
					creative.adTypeOnInterface='IMAGE';
					
				//原生
				if(creative.adTypeOnProduct=='NATIVE')
					creative.adTypeOnInterface='-1';
					
				this.calAllowNext();
				
			},
			adTypeOnInterfaceChange:function(index){
// console.log(1);
				this.calAllowNext();
				
			},
			//文本框失去焦点时候校验
			doBlurValidate:function(name,index){

				var value = this.creatives[index][name];

				var showError = '';

				if(name == 'href'){
					showError = !/^(https:\/\/|http:\/\/)/.test(value);
				}else{
					showError=!value;
				}
console.log(showError);			
				var ele=this.getErrorElement(name,index);
				
				ele ? ele.style.display=showError ? "block" : "none" : false;

				if(showError)
					this.allowNext=false;
				else
					this.calAllowNext();
			},
			//校验每一条创意
			doValidateCreative:function(index){
// console.log('doValidateCreative');				
				
				var creative=this.creatives[index];
				
				var ele=this.getErrorElement("codeName",index);
				
				if(ele && !creative.codeName)
						return false;

				if(this.creatives[index].adTypeOnInterface != 'IMAGE'){

					ele=this.getErrorElement("headline",index);
					if(ele && !creative.headline)
						return false;

					ele=this.getErrorElement("body",index);
					
					if(ele && !creative.body)
						return false;
				}

				ele=this.getErrorElement("href",index);

				if(ele && !/^(https:\/\/|http:\/\/)/.test(creative.href))
					return false;
					
				return true;
			},
			//校验所有的创意
			doValidateCreatives:function(){

				var cs=this.creatives;
				
				for(var i=0,l=cs.length;i<l;i++)
					if(this.doValidateCreative(i)===false)
						return false;
						
				return true;
			},
			calAllowNext:function(){
		
				var self=this;
				setTimeout(function(){

					self.allowNext=self.doValidateCreatives();

					console.log(self.allowNext);
				},0);

			},
			addCreative:function(){
			
				this.creatives.push({
					_timestamp:+new Date(),
					adTypeOnProduct:this.adslotTypes[0].id,
					codeName:'',
					adTypeOnInterface:'IMAGE',
					adTypeOnInteraction:this.adTypeOnInteractions[0].id,
					body:'',//广告描述
					headline:'',//广告语
					materialLogoId:-1,//图标素材附件ID
					materialLogoName:'',//图标素材附件名称
					materialAppIconId:-1,//应用图标素材附件ID
					materialAppIconName:'',//应用图标素材附件名称
					materialBannerImageId:-1,//横幅图片素材附件ID
					materialBannerImageName:'',//横幅图片素材附件名称
					materialSplashImageId:-1,//开屏图片素材附件ID
					materialSplashImageName:'',//开屏图片素材附件名称
					materialInterstitialImageId:-1,//插屏图片素材附件ID
					materialInterstitialImageName:''//插屏图片素材附件名称
				});
				
				this.allowNext=false;
				
			},
			deleteCreative:function(index){
			
				if(this.creatives.length==1)
					return $.confirm({
						title: "提示",
						content: '最少要保留一条创意数据!',
						confirmButton: '确定',
       					cancelButton: false
					});
		
				var creative=this.creatives[index];
				
				var id=creative.id,self=this;
				
				//本地删除，数据库没有对应记录
				if(!creative.id)
					return $.confirm({
						title: "提示",
						content: '您确定要删除此条创意么？',
						confirmButton: '确定',
						cancelButton: '取消',
						onAction:function(type){
						
							if(type!='confirm')
									return;
									
							self.creatives.splice(index, 1);
							
							if(self.allowNext===false)
								self.calAllowNext();
						}
					});
			
				////////////////////////////////////////数据库删除
			
				var doDeleteAction=function(id,index){
					
					//后台删除创意，但是前台一定要提示不可逆操作
					this.$http.delete("/v1/adv/campaigns/"+this.campaignId+"/creatives/"+id).then(function(res){
	
						var data = res.data;
						
						if(data.ret != 1)
							return $.confirm({
								title: "提示",
								content: '创意删除失败:'+data.message,
								confirmButton: '确定',
	        					cancelButton: false
							});
					
						this.creatives.splice(index, 1);
						
						if(this.allowNext===false)
							this.calAllowNext();
								
					},function(){});
					
				}
				
				//删除确认
				$.confirm({
					title: "提示",
					content: '此创意删除后不可恢复，您确定要删除么？',
					confirmButton: '确定',
					cancelButton: '取消',
					onAction:function(type){
						
						if(type!='confirm')
							return;
							
						doDeleteAction.call(self,id,index);
					}
				});
				
			},
			hasUploadFiles:function(){
			
				var errorText="";
				
				var creatives=this.creatives;
				
				for(var i=0,l=creatives.length;i<l;i++){
					
					var creative=creatives[i];
					console.log(creative);
					//横幅
					if(creative.adTypeOnProduct=='BANNER'){
						
						//图片
						if(creative.adTypeOnInterface=='IMAGE' && (!creative.materialBannerImageId || creative.materialBannerImageId==-1)){
							
							errorText="第"+(i+1)+"条创意横幅需要上传附件";
							
							break;
						}
						
						//图标
						if(creative.adTypeOnInterface=='IMAGE_TEXT' && (!creative.materialLogoId || creative.materialLogoId==-1)){
							
							errorText="第"+(i+1)+"条创意横幅需要上传附件";
							
							break;
						}
					}
					
					//开屏
					if(creative.adTypeOnProduct=='SPLASH'){
						
						//图片
						if(!creative.materialSplashImageId || creative.materialSplashImageId==-1){
							
							errorText="第"+(i+1)+"条创意开屏需要上传附件";
							
							break;
						}
					}
					
					//插屏
					if(creative.adTypeOnProduct=='INTERSTITIAL'){
						
						//图片
						if(!creative.materialInterstitialImageId || creative.materialInterstitialImageId==-1){
							
							errorText="第"+(i+1)+"条创意插屏需要上传附件";
							
							break;
						}
					}
					
					//原生
					if(creative.adTypeOnProduct=='NATIVE'){
						
						//图标
						if(!creative.materialLogoId || creative.materialLogoId==-1){
							
							errorText="第"+(i+1)+"条创意需要上传图标附件";
							
							break;
						}
						
						//横幅
						if(!creative.materialBannerImageId || creative.materialBannerImageId==-1){
							
							errorText="第"+(i+1)+"条创意需要上传横幅附件";
							
							break;
						}
						
						//插屏
						if(!creative.materialInterstitialImageId || creative.materialInterstitialImageId==-1){
							
							errorText="第"+(i+1)+"条创意需要上传插屏附件";
							
							break;
						}
						
						//开屏
						if(!creative.materialSplashImageId || creative.materialSplashImageId==-1){
							
							errorText="第"+(i+1)+"条创意需要上传开屏附件";
							
							break;
						}
			
					}
					
				}
				
				errorText && $.confirm({
					title:"提示",
					content:errorText,
					confirmButton: '确定',
	        		cancelButton: false
				});
				
				return errorText ? false : true;
			},
			createCreative:function(){

				//是否上传了所有附件
				if(!this.hasUploadFiles())
					return false;
					
				this.mask();
			
				this.$http.post("/v1/adv/campaigns/"+this.campaignId+"/creatives",{
					campaignId:this.campaignId,
					creatives:JSON.stringify(this.creatives)
				}).then(function(res){

					var data = res.data;
					
					if(data.ret != 1){
					
						this.unmask();
						
						return $.confirm({
							title: "提示",
							content: '创意创建失败:'+data.message,
							confirmButton: '确定',
        					cancelButton: false
						});
					}
					
					//跳转到下一步
					this.$route.router.go({
						path:'/adv/campaign/succ?campaignId=' + this.campaignId
					});

				},function(){this.unmask();});
				
			},
			submitCampaignAndCreatives:function(){

				if(!this.hasUploadFiles()) {//是否上传了所有附件
					return false;
				}
					
				this.mask();
			
				this.$http.post("/v1/adv/campaigns/"+this.campaignId+"/creatives",{
					campaignId:this.campaignId,
					creatives:JSON.stringify(this.creatives)
				}).then(function(res){
					var data = res.data;
					
					if(data.ret != 1){
						this.unmask();
						
						return $.confirm({
							title: "提示",
							content: '创意创建失败:'+data.message,
							confirmButton: '确定',
        					cancelButton: false
						});
					}
					
					this.$http.post("/v1/adv/campaigns/"+this.campaignId+"/save",{
						campaignId:this.campaignId,
					}).then(function(res){
						var data = res.data;
						
						if(data.ret != 1){
							this.unmask();
							
							return $.confirm({
								title: "提示",
								content: '创意提交失败:'+data.message||'',
								confirmButton: '确定',
	        					cancelButton: false
							});
						}
						
						this.$route.router.go({ //跳转回首页
							path:'/adv/campaign/index'
						});

						this.unmask();
					},function(){this.unmask();});
				},function(){this.unmask();});
			},
			back:function(){
				this.$route.router.go({ //回到上一步
					path:'/adv/campaign/target?campaignId=' + this.campaignId
				});
				
			}
		}
	}
	
</script>

<style>
	.adv-creative-create{
		padding:15px 28px 0;
		background-color: white;
	}

	/*进度条部分*/
	.adv-creative-create-steps{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-bottom: 0;
		margin-top:20px;
	}

	.adv-creative-create .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.adv-creative-create .step-one{
		width: 25%;
		background: #09c;
		color: #fff;
	}
	
	.adv-creative-create .step-two{
		width: 25%;
		background: #09c;
		color: #fff;
	}
	
	.adv-creative-create .step-three{
		width: 25%;
		background: #09c;
		color: #fff;
	}

	.adv-creative-create .step-four{
		width: 25%;
		background: #cccfd3;
	}

	.adv-creative-create .step-one .triangle-right,.adv-creative-create .step-two .triangle-right,.adv-creative-create .step-three .triangle-right{
		border-color: transparent transparent transparent #09c;
	}

	.adv-creative-create-steps .triangle-right {
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -42px;
		width: 0;
		z-index: 1;
	}

	.adv-creative-create-steps .triangle-right-bg {
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

	.adv-creative-create-form{
		position:relative;
		background: #fff;
		padding: 30px 0 0px 0;
		border-bottom: 1px dashed #999;
	}

	.adv-creative-create-form .delete-creative{
		margin-left:30px;
	}

	.adv-creative-create h4{
		font-weight: bold;
		margin: 20px;
	}

	.adv-creative-create .next-step{
		margin: 0 20px 0 155px; 
	}

	.adv-creative-create .form-title{
		width: 150px;
		text-align: right;
		padding-right: 15px;
		font-weight: normal;
	}

	.adv-creative-create .form-title-top{
		vertical-align: top;
	}
	
	.adv-creative-create .form-control{
		width: 30%;
		display: inline-block;
	}
	
	.adv-creative-create .more-creative-bar{
		padding:50px 0 40px 155px;
		background: #fff;
	}
	
	.adv-creative-create .operation-bar{
		padding: 20px 0 40px 155px;
		background: #fff;
	}
	
	.adv-creative-create .btn-save{
		margin-left:20px;
	}

	.adv-creative-create .file-control{
		display:inline-block;
	}

	.adv-creative-create .file-control .tips{
		color:red;
		margin:10px 0;
	}
	
	.adv-creative-create textarea{
		resize:none;
	}
	
	.adv-creative-create .errors{
		display:none;
		margin-left:155px;
		color:red;
		margin-top:5px;
	}

	.adv-creative-create .describe{
		vertical-align: top;
	}
</style>