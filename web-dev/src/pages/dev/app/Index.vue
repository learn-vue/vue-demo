<template>
	<div class="dev-app-index">
		
		<div class="crumbs">
			
			<h4 class="pull-left crumbs-title">应用管理</h4>
			
			<a v-link="{path:'/dev/app/create'}" class="btn btn-primary btn-common">新增应用</a>
			
			<div class="pull-right form-group form-search">
				<div class="input-group">
				  	<input type="text" v-model="keyword" class="form-control" placeholder="请输入关键字" @keyup.enter="doSearch">
				  	<a class="btn btn-primary" @click="doSearch">搜索</a>
				</div>
		  	</div>

		</div>
		
		<div class="dev-app-cnt">
			<table v-if="list.length > 0" class="table table-bordered table-header">
				<thead>
					<tr>
						<th class="text-center col-2">ID</th>
						<th class="text-center col-7">创建时间</th>
						<th class="text-center col-3">应用ID</th>
						<th class="text-center col-4">应用名称</th>
						<th class="text-center col-5">应用包名</th>
						<th class="text-center col-6">审核状态</th>
						<th class="text-center col-6">投放状态</th>
						<th class="text-center col-8">操作</th>
					</tr>
				</thead>
			</table>
			
			<table v-if="list.length > 0" v-for="(index,result) in list" track-by="id" class="table table-bordered table-record">
				<tbody>
					<tr class="row-data row-{{index%2==0 ? 'old' : 'even'}}" >
						<td class="text-center col-2">{{index+1}}</td>
						<td class="text-center col-7">{{result.createdAt | datetime}}</td>
						<td class="text-center col-3">{{result.id}}</td>
						<td class="text-center col-4">
							<a class="more-adslots" href="javascript:void(0);" @click="clickAdslots(index,result.id)">{{result.name}}</a>
						</td>
						<td class="text-center col-5">{{result.packageName}}</td>
						<td class="text-center col-6">
							<span>{{result.verificationStatus | dict verificationStatus}}</span>
						</td>
						<td class="text-center col-6">
							<span v-if="result.availabilityStatus=='ALLOWED'">投放中</span>
							<span v-else>未投放</span>
						</td>
						<td class="text-center col-8">
							
							<div class="btn-group btn-group-sm">
								<button type="button" class="btn btn-default operation-btn table-button">请选择</button>
								<button type="button" data-toggle="dropdown" class="btn btn-default dropdown-toggle">
									<span class="caret"></span>
								</button>
								<ul role="menu" class="dropdown-menu table-button-list">
									<li><a href="javascript:void(0);" @click="updateApp(result.id)">修改</a></li>
									<li v-if="result.verificationStatus!=='APPROVED'">
										<a href="javascript:void(0);" @click="deleteApp(result.id,result.name)">删除</a>
									</li>
									<li><a href="javascript:void(0);" @click="addAdslots(result.id)">新增广告位</a></li>
									<li><a href="javascript:void(0);" @click="putOnApp($index,result.id,'ALLOWED')">投放</a></li>
									<li><a href="javascript:void(0);" @click="putOnApp($index,result.id,'DISALLOWED')">停止投放</a></li>
								</ul>
							</div>
						
						</td>
					</tr>
					
					<tr v-if="result.adslots.length > 0 && result.show" class="row-adslots">
						<td class="text-center col-2">ID</td>
						<td class="text-center col-7">创建时间</td>
						<td class="text-center col-3">广告位ID</td>
						<td class="text-center col-4">广告位名称</td>
						<td class="text-center col-5">广告类型</td>
						<td class="text-center col-6"></td>
						<td class="text-center col-6"></td>
						<td class="text-center col-8"></td>
					</tr>
					
					<tr v-if="result.adslots.length > 0 && result.show" v-for="(itemNo,adslot) in result.adslots" class="row-data row-adslots-record">
						<td class="text-center col-2">{{index+1}}-{{itemNo+1}}</td>
						<td class="text-center col-7">{{result.createdAt | datetime}}</td>
						<td class="text-center col-3">{{adslot.id}}</td>
						<td class="text-center col-4">{{adslot.name}}</td>
						<td class="text-center col-5">{{adslot.type | dict adslotTypes}}</td>
						<td class="text-center col-6"></td>
						<td class="text-center col-6"></td>
						<td class="text-center col-8"></td>
					</tr>
					
				</tbody>
			</table>
		
		</div>
		
		<pager :page-size.sync="pageSize" :page-no.sync="pageNum" :total-records.sync="total"></pager>
	
		<div v-if="list.length == 0" class="search-empty">抱歉，暂无数据！</div>

	</div>

</template>

<script>

	import Pager from '../../../components/Pager.vue';
	
	import Switch from '../../../components/Switch.vue';
		
	module.exports = {
		components:{
			'pager':Pager,
			'switch':Switch
		},
		data : function() {
		  return {
		  	keyword:"",
			pageNum:1,
			pageSize:10,
			total:-1,
			list:[],
			verificationStatus:[],
			adslotTypes:[]
		  };
		},	
		ready : function() {
		
			this.mask();
				
			//加载数据字典 广告位置
			this.$http.get("/v1/dict/apps/verifications").then(function(res){
			
				this.unmask();
			
				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				this.verificationStatus=data.result;
		
			},function(){this.unmask();});
			
			///////////////////////////////////////////////////////////////
			
			this.mask();
				
			//加载数据字典 广告位置
			this.$http.get("/v1/dict/types/adslots").then(function(res){
			
				this.unmask();
			
				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				this.adslotTypes=data.result;
		
			},function(){this.unmask();});
			
			///////////////////////////////////////////////////////////////
				
			this.load(1);
			
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
		methods:{
			//遮罩
			mask:function(){
				
				$(document.body).mask();
		
			},
			//遮罩
			unmask:function(){
				
				$(document.body).unmask();
			
			},
			doSearch:function(){
			
				this.load(1);
				
			},
			//加载
			load:function(pageNum){
	
				this.mask();
			
				var params={
					keyword:this.keyword,
					pageSize:this.pageSize,
					pageNum:pageNum || this.pageNum
				};
				
				var resource = this.$resource('/v1/dev/apps/{pageNum}/{pageSize}');
				
				resource.get(params).then(function(res){
				
					this.unmask();
					
					var data=res.data;
					
					//Error
					if(data.ret!=1)
						return $.confirm({
								title: "提示",
								content: '查询失败:'+data.message,
								confirmButton: '确定',
	        					cancelButton: false
							});
		
					var result=data.result;
					
					//处理结果
					this.pageNum=result.pageNum;
					
					this.pageSize=result.pageSize;
					
					this.total=result.total;
					
					var list=result.list;
					for(var i=0,l=list.length;i<l;i++){
						list[i].show=false;
						list[i].adslots=[];
					}
										
					this.list=list;
					
				},function(){this.unmask();});
			
			},
			clickAdslots:function(index,appId){
				
				if(this.list[index].adslots.length==0){
					
					this.mask();
					
					//加载已有数据
					this.$http.get("/v1/dev/apps/{appId}/adslots",{
						appId:appId
					}).then(function(res){
					
						this.unmask();
						
						var data=res.data;
						
						if(data.ret!=1)
							return;
						
						var result=data.result;
						
						this.list[index].show=!this.list[index].show;
						
						this.list[index].adslots=result;
						
					},function(){this.unmask();});
					
				}else
					this.list[index].show=!this.list[index].show;
				
			},
			// 修改
			updateApp:function(appId){
	
				this.$route.router.go({
					path:'/dev/app/update?appId=' + appId 
				});
				
			},
			// 投放
			putOnApp:function(index,appId,state){
				this.mask();
				this.$http.put('/v1/dev/apps/'+appId+'/availabilities/'+state).then(function(res){
        			this.unmask();
	        		var data=res.data;
	        		
	        		if(data.ret!=1){
	        			$.confirm({
							title: '提示',
							content: '操作失败：'+data.message||'',
							confirmButton: '确定',
							cancelButton: false
						});
	        		}else{
	        			this.list[index].availabilityStatus = state;
	        		}
	        
	        	},function(){
	        		this.unmask();
	        	});
			},
			deleteApp:function(appId,appName){
	
				var self = this;
				
				var doDeleteAction=function(appId,appName){
			
					this.mask();
					
					var resource = this.$resource('/v1/apps/{appId}');
					
					resource.delete({appId:appId}).then(function (res) {
					
						this.unmask();
						
						var data = res.data;
						
						if(data.ret != 1)
							return $.confirm({
								title: '提示',
								content: "应用["+appName+']删除失败：'+data.message,
								confirmButton: '确定',
								cancelButton: false
							});
							
						var sf=this;
						
						$.confirm({
							title: '提示',
							content: "应用["+appName+']删除成功',
							confirmButton: '确定',
							cancelButton: false,
							confirm:function(){sf.load(1);}
						});
						
					}, function (res) {
					
						this.unmask();
					
						$.confirm({
							title: '提示',
							content: '系统异常，请稍后重试，或联系管理员！',
							confirmButton: '确定',
							cancelButton: false
						});
						
					});
					
				};
					
				$.confirm({
					title: '提示',
					confirmButton: '确定',
					cancelButton: '取消',
					content: '您确定要删除吗？不可逆，请谨慎！',
					confirm: function(){doDeleteAction.call(self,appId,appName);}
				});
			},
			addAdslots:function(appId){

				this.$route.router.go({
					path:'/dev/app/update/adslot?appId=' + appId 
				});
			}
		}
	};
</script>

<style lang="less">
	
	.dev-app-index{
		padding:15px 28px 30px;
		background: white;
	}

	.dev-app-index .crumbs-title{
		margin:8px 0 0;
	}

	.dev-app-index .search-empty{
		text-align:center;
		padding:100px 0;
		border:1px solid #ddd;
		border-top:none 0;
	}

	.dev-app-index .form-search{
		width: 350px;
	}

	.dev-app-index .form-search .btn{
		color: white;
		display: table-cell;
		vertical-align: middle;
	    white-space: nowrap;
	    width: 1%;
	    padding-left: 17px;
    	padding-right: 17px;
	}

	.dev-app-index .crumbs .btn-common{
		margin-left:10px;
		margin-top: 2px;
	}
	
	.dev-app-index .more-adslots{
		text-decoration:underline;
	}
	
	.dev-app-index .col-1{
		width:30px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.dev-app-index .col-2{
		width:40px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.dev-app-index .col-3{
		width:70px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.dev-app-index .col-4{
		width:15%;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.dev-app-index .col-5{
		width:20%;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.dev-app-index .col-6{
		width:100px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.dev-app-index .col-7{
		width:115px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.dev-app-index .col-8{
		width:130px;
		word-break:break-all;
		word-wrap: break-word;
	}

	.dev-app-cnt .table-record{
		border-bottom-width:0;
	}
	
	.dev-app-cnt .table-record:last-child{
		border-bottom-width:1px;
	}
	
	.dev-app-index .table-header{
		border-bottom:0;
	}
	
	.dev-app-index .table-header > thead > tr > th{
		border-bottom:0;
	}
	
	.dev-app-index .table-record > thead > tr > td, .dev-app-index .table-record > tbody > tr > td, .dev-app-index .table-record > tfoot > tr > td{
		border-bottom:none 0;
	}
	
	.dev-app-index .table-bordered > thead > tr.row-adslots, .dev-app-index .table-bordered > tbody > tr.row-adslots, .dev-app-index .table-bordered > tfoot > tr.row-adslots{
		background: #E4ECFC;
	}
	
	.dev-app-index .table-bordered > thead > tr.row-adslots > td, .dev-app-index .table-bordered > tbody > tr.row-adslots > td, .dev-app-index .table-bordered > tfoot > tr.row-adslots > td{
		padding:8px;
	}
	
	.dev-app-index .table-bordered > thead > tr.row-adslots > td, .dev-app-index .table-bordered > tbody > tr.row-adslots > td, .dev-app-index .table-bordered > tfoot > tr.row-adslots{
	
	}
	
	.dev-app-index .table-bordered > thead > tr.row-adslots-record, .dev-app-index .table-bordered > tbody > tr.row-adslots-record, .dev-app-index .table-bordered > tfoot > tr.row-adslots-record{

	}
	
	.dev-app-index .table-bordered > thead > tr.row-adslots-record > td:not(:last-child), .dev-app-index .table-bordered > tbody > tr.row-adslots-record > td:not(:last-child), .dev-app-index .table-bordered > tfoot > tr.row-adslots-record > td:not(:last-child){

	}
		
	.dev-app-index .row-even{
		background-color:#F5F8FC;
	}
		
	.dev-app-index .table-record > tbody > tr.row-data:hover{
		background-color:#f5f5f5;	
	}

	.dev-app-index .disabled{
		cursor: not-allowed;
		color: #ccc;
	}

	.dev-app-index .operation-btn{
		width: 86px;
	}

	.dev-app-index .dropdown-menu{
		min-width: 100px;
	}
</style>
