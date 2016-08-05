<template>
	<div class="adm-dev-app">
		
		<div class="crumbs">
			
			<h4 class="pull-left crumbs-title">应用管理</h4>
			
			<div class="pull-right form-group form-search">
				<div class="input-group">
				  	<input type="text" v-model="keyword" class="form-control" placeholder="请输入关键字" @keyup.enter="doSearch">
				  	<a class="btn btn-primary" @click="doSearch">搜索</a>
				</div>
		  	</div>
		  	
		</div>
					
		<table class="table table-bordered table-header">
			<thead>
				<tr>
					<th class="text-center col-1">ID</th>
					<th class="text-center col-2">提交时间</th>
					<th class="text-center col-4">开发者名称</th>
					<th class="text-center col-3">应用ID</th>
					<th class="text-center col-5">应用名称</th>
					<th class="text-center col-6">分成比例</th>
					<th class="text-center col-7">应用预览</th>
					<th class="text-center col-8">审核状态</th>
					<th class="text-center col-8">投放状态</th>
					<th class="text-center col-10">审核</th>
					<th class="text-center col-11">操作</th>
				</tr>
			</thead>
		</table>
		
		<div class="adm-app-cnt">
			<table v-if="list.length > 0" v-for="(index,result) in list" track-by="id" class="table table-bordered table-record">
				<tbody>
					<tr class="row-data row-{{index%2==0 ? 'old' : 'even'}}">
						<td class="text-center col-1">{{index+1}}</td>
						<td class="text-center col-2">{{result.createdAt | datetime}}</td>
						<td class="text-center col-4">{{result.devName}}</td>
						<td class="text-center col-3">{{result.id}}</td>
						<td class="text-center col-5">
							<a class="more-creatives" href="javascript:void(0);" @click="clickApp(index,result.id)">{{result.appName}}</a>
						</td>
						<td class="text-center col-6">{{result.divide}} %</td>
						<td class="text-center col-7">
							<a href="javascript:void(0);" @click="deleteApp(result.appName,result.id)">下载</a>
						</td>
						<td class="text-center col-8">{{result.verificationStatus | dict verificationStatus}}</td>
						<td class="text-center col-8" v-if="result.availabilityStatus == 'ALLOWED'">投放中</td>
						<td class="text-center col-8" v-if="result.availabilityStatus == 'DISALLOWED'">停止投放</td>
						<td class="text-center col-10">
							<a v-if="result.verificationStatus == 'PENGDING'||result.verificationStatus == 'DENIED'" href="javascript:void(0);" @click="approveApp(index,result.id,'APPROVED')">通过</a>
							<span class="notallow" v-else>通过</span>
							&nbsp;&nbsp;
							<a v-if="result.verificationStatus == 'PENGDING'||result.verificationStatus == 'APPROVED'" href="javascript:void(0);" @click="approveApp(index,result.id,'DENIED')">拒绝</a>
							<span class="notallow" v-else>拒绝</span>
						</td>
						<td class="text-center col-11">
							<a class="op-config" href="javascript:void(0);" @click="goConfig(result.devId,result.devName,result.id,result.appName,result.divide)">配置分成比例</a>
							<switch v-if="result.verificationStatus === 'APPROVED'" :value.sync="result.availabilityStatus" 
								on-url="/v1/adm/apps/{appId}/availabilities"
								:on-params="{appId:result.id,availabilityStatus:'DISALLOWED'}"
								off-url="/v1/adm/apps/{appId}/availabilities"
								:off-params="{appId:result.id,availabilityStatus:'ALLOWED'}"></switch>
								
							<!-- <a v-if="result.verificationStatus === 'APPROVED' && result.availabilityStatus== 'DISALLOWED'" href="javascript:void(0);" @click="openApp(index,result.id,'ALLOWED')">开启</a>
							<span class="notallow" v-else>开启</span>
							<a v-if="result.verificationStatus == 'APPROVED' && result.availabilityStatus== 'ALLOWED'" href="javascript:void(0);" @click="openApp(index,result.id,'DISALLOWED')">关闭</a> -->
							<span class="w78" v-else>- -</span>
						</td>
					</tr>
	
					<tr  v-if="result.adslots.length > 0 && result.show"  class="row-adslots">
						<td class="text-center ">ID</td>
						<td class="text-center ">提交时间</td>
						<td class="text-center ">广告类型</td>
						<td class="text-center ">广告位ID</td>
						<td class="text-center ">广告位名称</td>
						<td class="text-center " colspan=2>操作</td>
						<td class="text-center " colspan=4></td>
					</tr>
					<tr v-if="result.adslots.length > 0 && result.show"  v-for="(itemNo,adslot) in result.adslots" track-by="id" class="row-data row-detail-data">
						<td class="text-center ">{{index+1}}-{{itemNo+1}}</td>
						<td class="">{{result.createdAt | datetime}}</td>
						<td class="text-center ">{{adslot.type | dict adslotTypes}}</td>
						<td class="text-center ">{{adslot.id}}</td>
						<td class="">{{adslot.name}}</td>
						<td class="text-center " colspan=2>
							<a class="op-config" href="javascript:void(0);" @click="goConfigAdv(result.devId,result.devName,result.id,result.appName,adslot.id)">配置广告源</a>
						</td>
						<td class="" colspan=4></td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<pager :page-size.sync="pageSize" :page-no.sync="pageNum" :total-records.sync="totalRecords"></pager>
	
		<div v-if="list.length == 0" class="search-empty">抱歉，暂无数据！</div>

	</div>

</template>

<script>

import Pager from '../../../components/Pager.vue';

import Switch from '../../../components/Switch.vue';

module.exports = {
	props: {
	},
	components:{
		'pager':Pager,
		'switch':Switch
	},
	data : function() {
	  return {
	  	keyword:"",
		pageNum:1,
		pageSize:10,
		totalRecords:-1,
		list:[],
		verificationStatus:[],
		adslotTypes:[]
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
			
			//加载数据字典 广告位置
			this.$http.get("/v1/dict/apps/verificationstatus").then(function(res){
			
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
 
			this.mask();
		
			var params={
				keyword:this.keyword,
				pageSize:this.pageSize,
				pageNum:pageNum || this.pageNum
			};
			
			var resource = this.$resource('/v1/adm/apps/{pageNum}/{pageSize}');
			
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
				
 				var list=result.list;
				for(var i=0,l=list.length;i<l;i++){
					list[i].show=false;
					list[i].adslots=[];
				}
									
				this.list=list;
				
			},function(){
			
				this.unmask();
				
			});
		
		},
		clickApp:function(index,appId){
			
			if(this.list[index].adslots.length==0){
				
				this.mask();
				
				//加载已有数据
				this.$http.get("/v1/adm/dev/apps/{appId}/adslots",{
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
		doSearch:function(){
		
			this.load(1);
			
		},
		approveApp:function(index,id,verificationStats){
			this.mask();
			
			var params={
				appId:id,
				verificationStats:verificationStats
			};
			
			var resource = this.$resource('/v1/adm/apps/{appId}/verifications');
			
			resource.get(params).then(function(res){
			
				this.unmask();
				
				var data=res.data;

				if(data.ret == 1){
					this.list[index].verificationStatus = verificationStats;
				}
				
			},function(){this.unmask();});
		},
		// 开启APP投放
		// openApp:function(index,appId,availabilityStatus){

		// 	this.mask();

		// 	var params={
		// 		appId:appId,
		// 		availabilityStatus:availabilityStatus
		// 	};

		// 	this.$http.put("/v1/adm/apps/"+appId+"/availabilities",params).then(function(res){

		// 		var data = res.data;

		// 		if(data.ret!=1){
					
		// 			this.unmask();
					
		// 			return;
		// 		}
				
		// 		this.list[index]['availabilityStatus'] = availabilityStatus;

		// 		this.unmask();

		// 	},function(){this.unmask();});

		// },
		goConfig:function(devId,devName,id,appName,divide){

			this.$route.router.go({
				path:'/adm/dev/config/divide?devId=' + devId +'&devName=' + devName +'&id=' + id +'&appName=' + appName +'&divide=' + divide
			});
		},
		goConfigAdv:function(devId,devName,id,appName,adslotId){

			this.$route.router.go({
				path:'/adm/dev/config/adv/source?devId=' + devId +'&devName=' + devName +'&id=' + id +'&appName=' + appName +'&adslotId=' + adslotId
			});
		}
	},
	ready : function() {
	
		this.load();
		
	}
};
</script>

<style lang="less">
	
	.adm-dev-app{
		padding:15px 28px 30px;
		background: white;
	}
	
	.adm-dev-app .crumbs-title{
		margin:8px 0 0;
	}
	
	.adm-dev-app .search-empty{
		text-align:center;
		padding:100px 0;
		border:1px solid #ddd;
		border-top:none 0;
	}

	.adm-dev-app .form-search{
		width: 350px;
	}

	.adm-dev-app .form-search .btn{
		color: white;
		display: table-cell;
		vertical-align: middle;
	    white-space: nowrap;
	    width: 1%;
	    padding-left: 17px;
    	padding-right: 17px;
	}
	
	.adm-dev-app .notallow{
		cursor: not-allowed;
		color: #ccc;
	}

	.adm-dev-app .col-1{
		width:50px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-dev-app .col-2{
		width: 85px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-dev-app .col-3{
		width:70px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-dev-app .col-4{
		width:115px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-dev-app .col-5{
		min-width: 78px;
		width: 8%;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-dev-app .col-6{
		width: 65px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-dev-app .col-7{
		width:76px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-dev-app .col-8{
		width:75px;
		word-break:break-all;
		word-wrap: break-word;
	}

	.adm-dev-app .col-10{
		width:91px;
		word-break:break-all;
		word-wrap: break-word;
	}

	.adm-dev-app .col-11{
		min-width:210px;
		word-break:break-all;
		word-wrap: break-word;
	}

	.adm-dev-app .op-config{
		cursor:pointer;
	}

	.adm-dev-app .w78{
		min-width: 78px;
		display: inline-block;
	}


	/*表单相关*/
	.adm-app-cnt .table-record{
		border-bottom-width:0;
	}
	
	.adm-app-cnt .table-record:last-child{
		border-bottom-width:1px;
	}
	
	.adm-app-cnt .table-header{
		border-bottom:0;
	}
	
	.adm-app-cnt .table-header > thead > tr > th{
		border-bottom:0;
	}

	.adm-dev-app .table-header{
		border-bottom:0;
	}
	
	.adm-dev-app .table-header > thead > tr > th{
		border-bottom:0;
	}
	
	.adm-dev-app .table-record > thead > tr > td, .adm-dev-app .table-record > tbody > tr > td, .adm-dev-app .table-record > tfoot > tr > td{
		border-bottom:none 0;
	}
	
	.adm-dev-app .table-bordered > thead > tr.row-adslots, .adm-dev-app .table-bordered > tbody > tr.row-adslots, .adm-dev-app .table-bordered > tfoot > tr.row-adslots{
		background: #E4ECFC;
	}
	
	.adm-dev-app .table-bordered > thead > tr.row-adslots > td, .adm-dev-app .table-bordered > tbody > tr.row-adslots > td, .adm-dev-app .table-bordered > tfoot > tr.row-adslots > td{
		padding:8px;
	}
	
	.adm-dev-app .table-bordered > thead > tr.row-adslots > td, .adm-dev-app .table-bordered > tbody > tr.row-adslots > td, .adm-dev-app .table-bordered > tfoot > tr.row-adslots{
	
	}
	
	.adm-dev-app .table-bordered > thead > tr.row-adslots-record, .adm-dev-app .table-bordered > tbody > tr.row-adslots-record, .adm-dev-app .table-bordered > tfoot > tr.row-adslots-record{

	}
	
	.adm-dev-app .table-bordered > thead > tr.row-adslots-record > td:not(:last-child), .adm-dev-app .table-bordered > tbody > tr.row-adslots-record > td:not(:last-child), .adm-dev-app .table-bordered > tfoot > tr.row-adslots-record > td:not(:last-child){

	}
	
	.adm-dev-app .row-even{
		background-color:#F5F8FC;
	}
	
	.adm-dev-app .table-record > tbody > tr.row-data:hover{
		background-color:#f5f5f5;	
	}

</style>
