<template>
	<div class="msg-index">
	
		<div class="crumbs">
			<span class="crumbs-title">通知</span>
		</div>
					
		<div class="btn-group read-state" role="group">
		  <button type="button" :class="{btn:true,'btn-default':true,'btn-primary':readState==0}" @click="stateAll">全部消息</button>
		  <button type="button" :class="{btn:true,'btn-default':true,'btn-primary':readState==1}" @click="stateUnRead">未读消息</button>
		</div>

		<table class="table table-striped">
			<tbody>
				<tr v-if="results.length > 0" v-for="(index,result) in results" track-by="id" class="row-data row-{{index%2==0 ? 'old' : 'even'}}">
					<td class="">
						<a @click="toMsgDetail(result.id,$event)" href="javascript:void(0);">
							{{result.content}}
						</a>
					</td>
					<td class="msg-date">{{result.date}}</td>
				</tr>
			</tbody>
		</table>
				
		<pager :page-size.sync="pageSize" :page-no.sync="pageNo" :total-records.sync="totalRecords"></pager>
	
		<div v-if="results.length == 0" class="search-empty">抱歉，暂无数据！</div>

	</div>

</template>

<script>

import Pager from '../../../components/Pager.vue';

module.exports = {
	props: {
	},
	components:{
		'pager':Pager
	},
	data : function() {
	  return {
	  	readState:0,//0全部，1未读
		pageNo:1,
		pageSize:10,
		totalRecords:-1,
		results:[]
	  };
	},
	created : function() {

	},
	events:{
		//注册翻页事件
		page:function(){
		
			this.load();
		
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
		toMsgDetail(id,event){
			
			this.$route.router.go({path:'/adv/message/detail?messageId='+id});
			
		},
		stateAll:function(){
		
			if(this.readState==0)
				return;
			
			this.pageNo=1;
			
			this.readState=0;
			
			this.load();
			
		},
		stateUnRead:function(){
			
			if(this.readState==1)
				return;
				
			this.pageNo=1;
				
			this.readState=1;
			
			this.load();
			
		},
		//加载
		load:function(params){
 
			this.mask();
		
			params=params || {};
			
			params.pageSize=this.pageSize;
			params.pageNo=this.pageNo;
			params.readState=this.readState;
			
			var resource = this.$resource('/v1/ads/messages/{pageNo}/{pageSize}');
			
			resource.get(params).then(function(res){
			
				this.unmask();
				
				var data=res.data;
				
				//Error
				if(data.ret!=1){
					
					return;
				}
		
				var result=data.result;
				
				//处理结果
				this.pageNo=result.pageNo;
				
				this.pageSize=result.pageSize;
				
				this.totalRecords=result.totalRecords;
				
				this.results=result.results;
				
			},function(){
			
				this.unmask();
				
			});
		
		}
	},
	ready : function() {
	
		this.load();
		
	},
	route:{
		activate: function (transition) {
	     
	      transition.next();
	      
	    },
	    deactivate: function (transition) {
	 
			this.unmask();
	    	 
	    	transition.next();
	    }
	}

};
</script>

<style lang="less">
	
	.msg-index{
		padding:0 20px;
	}
	
	.msg-index .read-state{
		margin-bottom:10px;
	}
	
	.msg-index .search-empty{
		text-align:center;
		padding:100px 0;
	}

	.msg-index .crumbs{
		line-height: 50px;
	}

	.msg-index .crumbs-title{
		border-left: #0098ce solid 4px;
		padding-left: 15px;
		font-size: 16px;
		margin-right: 20px;
	}

	.msg-index table{
		background: #fff;
	}
	
	.msg-index table td{
		border:none 0!important;
	}
	
	.msg-index .msg-date{
		width:30px;
	}

</style>
