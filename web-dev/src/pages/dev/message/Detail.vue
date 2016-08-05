<template>
	<div class="msg-detail">
	
		<div class="crumbs">
			<span class="crumbs-title">通知</span>
		</div>
		
		<h4 class="msg-title">{{title}}</h4>
		<p class="msg-content">{{content}}</p>
		<p class="text-right msg-date">{{msgDate}}</p>
		
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
	  	title:'',
	  	content:'',
	  	msgDate:''
	  };
	},
	created : function() {

	},
	events:{
		
	},		
	ready : function() {
	
		this.load();
		
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
		//加载
		load:function(){
 
			this.mask();
		
			var resource = this.$resource('/v1/dev/messages/{messageId}');
			
			resource.get({
				messageId:this.$route.query.messageId
			}).then(function(res){
			
				this.unmask();
				
				var data=res.data;
				
				//Error
				if(data.ret!=1){
					
					return;
				}
		
				var result=data.result;
				
				//处理结果
				this.msgDate=result.date;
				this.title=result.title;
				this.content=result.content;
		
			},function(){
			
				this.unmask();
				
			});
		
		}
	},
	beforeDestory:function(){
	
		this.unmask();
	
	}

};
</script>

<style lang="less">

	.msg-detail{
		padding:0 20px;
		min-height:500px;
		background-color:white;
	}
	
	.msg-detail .msg-title{
		font-weight:bold;
		margin-bottom:20px;
	}
	
	.msg-detail .msg-content{
		margin-bottom:50px;
	}
	
	.msg-detail .crumbs{
		line-height: 50px;
	}

	.msg-detail .crumbs-title{
		border-left: #0098ce solid 4px;
		padding-left: 15px;
		font-size: 16px;
		margin-right: 20px;
	}

</style>
