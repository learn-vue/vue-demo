<template>
	<form id="{{'form_' + timestamp}}" class="file-form" action="{{upload}}" method="POST" enctype="multipart/form-data">
		
		<a href="javascript:void(0);" hidefocus="hidefocus" class="file-upload">
			<label for="{{'file_'+timestamp}}">{{text}}<i class="fa fa-upload file-icon"></i></label>
		</a>
		
		<input id="{{'file_'+timestamp}}" type="file" name="material" style="display:none;" @change="change" />
		
		<a v-if="materialId" @click="downloadStart" class="file-name" href="{{downloadURL}}" target="_href" hidefocus="hidefocus">{{materialName}}</a>
		
	</form>
</template>

<script>
	
	import ApiUtil from './../util/api';
	
	require('jquery-form');

	module.exports = {
	    name: 'File',
	    replace : true,
		props : {
			text:{//接受上传的文件后缀
				type:String,
				default:'本地上传'
			}, 
			materialId:{//接受上传的文件后缀
				type:Number,
				default:-1
			}, 
			materialName:{//接受上传的文件后缀
				type:String,
				default:""
			}, 
			"accepts":{//接受上传的文件后缀
				type:String,
				default:""
			}, 
			"upload":{//上传URL
				type:String,
				default:""
			}, 
			"uploadParams":{//上传参数
				type:Object,
				default:function(){return {};}
			}, 
			"download":{//下载URL
				type:String,
				default:""
			},
			"downloadParams":{//下载参数
				type:Object,
				default:function(){return {};}
			},
			"beforeUpload":{//开始上传
				type:Function,
				default:function(evt){}
			},
			"uploadSuccess":{//开始成功
				type:Function,
				default:function(evt){}
			},
			"uploadFailure":{//开始失败
				type:Function,
				default:function(evt){}
			}  
		},
		data : function() {
			return {
				timestamp:+new Date()
			};
		},
		computed:{
			downloadURL:function(){
				
				var url=this.download;
				
				var params=this.downloadParams || {};
	
				params.materialId=this.materialId;
				
				url=this.replaceUrlKeys(url,params);

				var index=url.indexOf("?");
				
				if(index==-1)
					url+="?";
				
				var query=url.substr(index);
				
				if(query.indexOf("=")!=-1)
					url+="&";
				
				url+="ts="+(+new Date());
					
				for(var key in params)
					url+="&"+[key]+"="+params[key];
					
				return url;
			}
		},
		ready:function(){

			this.upload=ApiUtil.url(this.upload);
			
			this.download=ApiUtil.url(this.download);
			
		},
		methods : {
			change : function(event) {

				var self=this;
				
				var onSuccess=function(res){
					
					var data=res.result;
					
					this.materialId=data.materialId;
					
					this.materialName=data.materialName;
				};
				
				var onFailure=function(result){
					
					this.materialId=undefined;
					
					this.materialName=undefined;
					
				};
				
				var beforeUpload=function(){
					
				};
	
				var $form=$('#form_'+this.timestamp);
				
				var url=this.upload;
				
				var params=this.uploadParams || {};
	
				url=this.replaceUrlKeys(url,params);
				
				$form.ajaxSubmit({
					url:url,
					data:params,
					beforeSubmit:function(){
				
						var result=beforeUpload.call(self);
				
						if(result==false)
							return false;

					},
					success:function(result){
						
						if(result.ret!=1)
							return onFailure.call(self,result);
							
						onSuccess.call(self,result);
						
					},
					type:'POST',
					dataType:'json',
					clearForm:true,
					resetForm:true
				});
				
			},
			downloadStart:function(){//开始下载
		
			},
			downloadEnd:function(){//结束下载
		
			},
			uploadStart:function(){
			
			},
			uploadSuccess:function(){
			
			},
			uploadFailure:function(){
			
			},
			extractUrlKeys:function(url){
	
				//url:http://localhost:8888/api/v1/:userId/list
				
				var keys= url.match(/\/[\:|\{]\w+/g) || [];
				for(var i=0,l=keys.length;i<l;i++)
          			keys[i]=keys[i].replace(/^\/[\:|\{]/,'');
				
				return keys;
			},
			replaceUrlKeys:function(url,params){
				
				var keys=this.extractUrlKeys(url);
				
				for(var i=0,l=keys.length;i<l;i++){
					url=url.replace(new RegExp(":"+keys[i]),params[keys[i]]);
          			url=url.replace(new RegExp("{"+keys[i]+"}"),params[keys[i]]);
				}
				
				return url;
			}
		}
	};
</script>

<style lang="less">
	.file-form label{
		font-weight: normal;
    	margin-bottom: 0;
    	cursor:pointer;
	}
	
	.file-form .file-name{
		margin-left:20px;
		text-decoration:underline;
	}
	
	.file-form .fa{
		margin-left:5px;
	}
</style>