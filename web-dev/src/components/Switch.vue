<template>
	<div @click="change" :class="{'switch-box':true,'switch-off':value===offValue}">
		<span v-if="value==onValue" class="switch-text">{{onText}}</span>
		<span v-else class="switch-text">{{offText}}</span>
		<div class="switch-indicator"></div>
	</div>
</template>

<script>
	
	import ApiUtil from './../util/api';
	
	module.exports = {
	    name: 'Switch',
	    replace : true,
		props : {
			value:{
				type:String,
				default:'ALLOWED'
			},
			onText:{
				type:String,
				default:"打开"
			},
			onValue:{//
				type:String,
				default:'ALLOWED'
			}, 
			offText:{
				type:String,
				default:"关闭"
			},
			offValue:{//
				type:String,
				default:"DISALLOWED"
			}, 
			"onUrl":{//
				type:String,
				default:""
			}, 
			"onParams":{//参数
				type:Object,
				default:{}
			}, 
			"offUrl":{//
				type:String,
				default:""
			},
			"offParams":{//参数
				type:Object,
				default:{}
			},
			"onBefore":{//
				type:Function,
				default:function(evt){}
			},
			"onSuccess":{//
				type:Function,
				default:function(evt){}
			},
			"onFailure":{//
				type:Function,
				default:function(evt){}
			},
			"offBefore":{//
				type:Function,
				default:function(evt){}
			},
			"offSuccess":{//
				type:Function,
				default:function(evt){}
			},
			"offFailure":{//
				type:Function,
				default:function(evt){}
			}   
		},
		data : function() {
			return {
			};
		},
		ready:function(){

		},
		methods : {
			change : function(event) {

				var method=this.value===this.onValue ? "switchOn":"switchOff";
				
				this[method]();
					
			},
			switchOn:function(){
			
				var opts={
					url:this.onUrl,
					params:this.onParams,
					before:this.onBefore,
					success:function(){
						
						this.value=this.offValue;
				
						this.onSuccess.call(this,arguments);
						
					},
					faillure:this.onFaillure
				};
				
				this.sendRequest(opts);
				
			},
			switchOff:function(){
				
				var opts={
					url:this.offUrl,
					params:this.offParams,
					before:this.offBefore,
					success:function(){
						
						this.value=this.onValue
			
						this.offSuccess.call(this,arguments);
						
					},
					faillure:this.offFaillure
				};
				
				this.sendRequest(opts);
		
			},
			sendRequest:function(opts){
				
				var url=opts.url;
				
				var params=opts.params || {};
				
				url=this.replaceUrlKeys(url,params);
				
				if(opts.before && opts.before.call(this)===false)
					return;
					
				this.$http.put(url,params).then(function(res){
        
	        		var data=res.data;
	        		
	        		if(data.ret!=1)
	        			return opts.failure && opts.failure.call(this,data);
	        		
	        		opts.success && opts.success.call(this,data);
	        
	        	},function(){});
        	
			},
			extractUrlKeys:function(url){
	
				var keys= url.match(/[\:|\{]\w+/g) || [];
				for(var i=0,l=keys.length;i<l;i++)
          			keys[i]=keys[i].replace(/^[\:|\{]/,'');
				
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
	
	.switch-box{
		background-color: #FFAC00;
	    border-radius: 12px;
	    color: white;
	    display: inline-block;
	    height: 24px;
    	line-height: 24px;
	    position: relative;
	    text-align: center;
	    padding: 0 27px;
		cursor:pointer;
	    user-select:none;
	    -ms-user-select:none;
	}

	.switch-indicator{
		position:absolute;
		border-radius: 10px;
	    height: 20px;
	    position: absolute;
	    top: 2px;
	    right: 2px;
	    width: 22px;
	    background-color:white;
	}
		
	.switch-off{
		background-color:#DADCDD;
		color:#71777A;
	}
		
	.switch-off .switch-indicator{
	    left: 2px;
	}
	
</style>