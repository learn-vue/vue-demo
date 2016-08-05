<template>
	<div class="adm-recharge-list">
		
		<div class="crumbs">
			
			<h4 class="pull-left crumbs-title">充值列表</h4>
			
			<a v-link="{path:'/adm/finance/recharge/create'}" class="btn btn-primary btn-common btn-recharge">新增充值</a>
			
			<div class="pull-right form-group form-search">
				<div class="input-group">
				  	<input type="text" v-model="keyword" class="form-control" placeholder="请输入关键字" @keyup.enter="doSearch">
				  	<a class="btn btn-primary" @click="doSearch">搜索</a>
				</div>
		  	</div>
		  	
		</div>
					
		<table class="table table-bordered table-striped table-hover">
			<thead>
				<tr>
					<th class="text-center">ID</th>
					<th class="text-center">广告主名称</th>
					<th class="text-right">充值金额（￥）</th>
					<th class="text-center">充值凭证</th>
					<th class="text-center">操作时间</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="results.length > 0" v-for="(index,result) in results" track-by="id" class="row-data row-{{index%2==0 ? 'old' : 'even'}}">
					<td class="text-center">{{result.id}}</td>
					<td class="text-center">{{result.advName}}</td>
					<td class="text-right">{{result.amount | amount}}</td>
					<td class="text-center">
						<a href="javascript:void(0);" @click="updateApp(result.id)">预览</a>&nbsp;&nbsp;
						<a href="javascript:void(0);" @click="deleteApp(result.appName,result.id)">下载</a>
					</td>
					<td class="text-center">{{result.operationTime | datetime}}</td>
				</tr>
			</tbody>
		</table>
				
		<pager :page-size.sync="pageSize" :page-no.sync="pageNum" :total-records.sync="totalRecords"></pager>
	
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
	  	keyword:"",
		pageNum:1,
		pageSize:10,
		totalRecords:-1,
		results:[]
	  };
	},
	events:{
		//注册翻页事件
		page:function(evt,pageNum){
		
			this.load(pageNum);
		
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
		load:function(pageNum){
 
			this.mask();
		
			var params={
				keyword:this.keyword,
				pageSize:this.pageSize,
				pageNum:pageNum || this.pageNum
			};
			
			var resource = this.$resource('/v1/adm/adv/recharges/{pageNum}/{pageSize}');
			
			resource.get(params).then(function(res){
			
				this.unmask();
				
				var data=res.data;
				
				//Error
				if(data.ret!=1){
					
					return;
				}
		
				var result=data.result;
				
				//处理结果
				this.pageNum=result.pageNum;
				
				this.pageSize=result.pageSize;
				
				this.totalRecords=result.totalRecords;
				
				this.results=result.results;
				
			},function(){
			
				this.unmask();
				
			});
		
		},
		doSearch:function(){
		
			this.load(1);
			
		}
	}
};
</script>

<style lang="less">
	
	.adm-recharge-list{
		padding:15px 28px 30px;
		background: white;
	}

	.adm-recharge-list .search-empty{
		text-align:center;
		padding:100px 0;
		border:1px solid #ddd;
		border-top:none 0;
	}

	.adm-recharge-list .form-search{
		width: 350px;
	}
	
	.adm-recharge-list .btn-recharge{
		margin-top:3px;
		margin-left:10px;
	}

	.adm-recharge-list .form-search .btn{
		color: white;
		display: table-cell;
		vertical-align: middle;
	    white-space: nowrap;
	    width: 1%;
	    padding-left: 17px;
    	padding-right: 17px;
	}

</style>
