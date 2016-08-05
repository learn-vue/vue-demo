<template>
	<div class="log-index">
	
		<div class="crumbs">
			<span class="crumbs-title">操作记录</span>
		</div>
					
		<table class="table table-bordered table-striped table-hover">
			<thead>
				<tr>
					<th class="text-center">ID</th>
					<th class="text-center">开发者账号</th>
					<th class="text-center">模块</th>
					<th class="text-center">时间</th>
					<th class="text-center">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="results.length > 0" v-for="(index,result) in results" track-by="id" class="row-data row-{{index%2==0 ? 'old' : 'even'}}">
					<td  class="text-center">{{result.id}}</td>
					<td  class="text-center">{{result.account}}</td>
					<td  class="text-center">{{result.module}}</td>
					<td  class="text-center">{{result.date}}</td>
					<td  class="text-center">{{result.operation}}</td>
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
		//加载
		load:function(params){
 
			this.mask();
		
			params=params || {};
			
			params.pageSize=this.pageSize;
			params.pageNo=this.pageNo;
			
			var resource = this.$resource('/v1/dev/logs/{pageNo}/{pageSize}');
			
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
	beforeDestory:function(){
	
		this.unmask();
	
	}

};
</script>

<style lang="less">

	.log-index{
		padding:15px 28px 0;
	}
	
	.log-index .search-empty{
		text-align:center;
		padding:100px 0;
	}

	.log-index .crumbs{
		line-height: 50px;
	}

	.log-index .crumbs-title{
		border-left: #0098ce solid 4px;
		padding-left: 15px;
		font-size: 16px;
		margin-right: 20px;
	}

	.log-index table{
		background: #fff;
	}
	
	.log-index .table th{
		background-color:#D7DADF;
	}

</style>
