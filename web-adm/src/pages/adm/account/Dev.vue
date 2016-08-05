<template>
	<div class="adm-dev-index">
		
		<div class="crumbs">
			
			<span class="crumbs-title">开发者管理</span>
		
			<div class="pull-right">
				<div class="form-group">
					<div class="input-group search-btn">
					  	<input type="text" v-model="keyword" class="form-control" placeholder="请输入关键字" @keyup.enter="doSearch">
					  	<div class="input-group-addon" @click="doSearch">搜索</div>
					</div>
			  	</div>
			</div>
		</div>
					
		<table class="table table-bordered table-striped table-hover">
			<thead>
				<tr>
					<th class="text-center">
						<input type="checkbox" />
					</th>
					<th class="text-center">ID</th>
					<th class="text-center">账号类型</th>
					<th class="text-center">账号</th>
					<th class="text-center">公司名称</th>
					<th class="text-center">联系人</th>
					<th class="text-center">联系方式</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="results.length > 0" v-for="(index,result) in results" track-by="id" class="row-data row-{{index%2==0 ? 'old' : 'even'}}">
					<td class="text-center">
						<input type="checkbox" />
					</td>
					<td>{{result.id}}</td>
					<td>{{result.type}}</td>
					<td>{{result.account}}</td>
					<td>{{result.companyName}}</td>
					<td>{{result.contractor}}</td>
					<td>{{result.phone}}</td>
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
		  	keyword:"",
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
			page:function(evt,pageNo){
			
				this.load(pageNo);
			
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
			load:function(pageNo){
	 
				this.mask();
			
				var params={
					type:'dev',
					keyword:this.keyword,
					pageSize:this.pageSize,
					pageNo:pageNo || this.pageNo
				};
				
				var resource = this.$resource('/v1/adm/accounts/{pageNo}/{pageSize}');
				
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
	
	.adm-dev-index{
		padding:0 20px;
		background:white;
	}

	.adm-dev-index .addAppBtn{
		border-radius: 0;
		border: none;
		background: #0098ce;
		color: #fff;
	}
	
	.adm-dev-index .search-empty{
		text-align:center;
		padding:100px 0;
	}

	.adm-dev-index .search-btn{
		margin-top: 10px;
	}

	.search-btn .input-group-addon{
		background: #428bca;
		color: #fff;
	}

	.adm-dev-index .crumbs{
		line-height: 50px;
	}

	.adm-dev-index .crumbs-title{
		border-left: #0098ce solid 4px;
		padding-left: 15px;
		font-size: 16px;
		margin-right: 20px;
	}

	.adm-dev-index table{
		background: #fff;
	}
	
	.adm-dev-index .table th{
		background-color:#D7DADF;
	}

</style>
