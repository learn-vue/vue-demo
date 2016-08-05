<template>
	<div class="adm-dev-finance">
		
		<div class="crumbs">
			
			<h4 class="pull-left crumbs-title">开发者财务信息</h4>
			
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
					<th class="text-center">开发者名称</th>
					<th class="text-center">账户类型</th>
					<th class="text-center">开户行名称</th>
					<th class="text-center">银行账号</th>
					<th class="text-center">证件</th>
					<th class="text-center">提交时间</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="results.length > 0" v-for="(index,result) in results" track-by="id" class="row-data row-{{index%2==0 ? 'old' : 'even'}}">
					<td class="text-center">{{result.id}}</td>
					<td class="text-center">{{result.devName}}</td>
					<td class="text-center">{{result.accountType}}</td>
					<td class="text-center">{{result.bankName}}</td>
					<td class="text-center">{{result.accountNo}}</td>
					<td class="text-center">
						<a href="javascript:void(0);" @click="updateApp(result.id)">预览</a>&nbsp;&nbsp;
						<a href="javascript:void(0);" @click="deleteApp(result.appName,result.id)">下载</a>
					</td>
					<td class="text-center">{{result.submitTime | datetime}}</td>
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
	route:{
		activate: function (transition) {
		 
		  transition.next();
		  
		},
		deactivate: function (transition) {
		 
		 	this.unmask();
		 	
			transition.next();
		}
	},
	events:{
		//注册翻页事件
		page:function(evt,pageNum){
		
			this.load(pageNum);
		
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
		load:function(pageNum){
 
			this.mask();
		
			var params={
				keyword:this.keyword,
				pageSize:this.pageSize,
				pageNum:pageNum || this.pageNum
			};
			
			var resource = this.$resource('/v1/adm/dev/finance/{pageNum}/{pageSize}');
			
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
	},
	ready : function() {
	
		this.load();
		
	}

};
</script>

<style lang="less">
	
	.adm-dev-finance{
		padding:15px 28px 30px;
		background: white;
	}

	.adm-dev-finance .search-empty{
		text-align:center;
		padding:100px 0;
		border:1px solid #ddd;
		border-top:none 0;
	}

	.adm-dev-finance .form-search{
		width: 350px;
	}

	.adm-dev-finance .form-search .btn{
		color: white;
		display: table-cell;
		vertical-align: middle;
	    white-space: nowrap;
	    width: 1%;
	    padding-left: 17px;
    	padding-right: 17px;
	}

</style>
