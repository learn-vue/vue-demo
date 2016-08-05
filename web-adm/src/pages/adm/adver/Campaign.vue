<template>
	<div class="adm-adv-campaign">
		
		<div class="crumbs">
		
			<h4 class="pull-left crumbs-title">广告管理</h4>
			
			<div class="pull-right form-group form-search">
				<div class="input-group">
				  	<input type="text" v-model="keyword" class="form-control" placeholder="请输入关键字（计划ID、计划名称）" @keyup.enter="doSearch">
				  	<a class="btn btn-primary" @click="doSearch">搜索</a>
				</div>
		  	</div>
		
		</div>

		<table class="table table-bordered table-header">
			<thead>
				<tr>
					<th class="text-center col-1">ID</th>
					<th class="text-center col-8">提交时间</th>
					<th class="text-center col-3">广告主名称</th>
					<th class="text-center col-2">计划ID</th>
					<th class="text-center col-4">计划名称</th>
					<th class="text-center col-5">预算</th>
					<th class="text-center col-6">每日预算</th>
					<th class="text-center col-7">审核状态</th>
					<th class="text-center col-7">投放状态</th>
					<th class="text-center col-9">审核</th>
					<th class="text-center col-9">操作</th>
				</tr>
			</thead>
		</table>
		
		<div class="adm-campaign-cnt">
			<table v-if="list.length > 0" v-for="(index,result) in list" track-by="id" class="table table-bordered table-record">
				<tbody>
					<tr class="row-data row-{{index%2==0 ? 'old' : 'even'}}" >
						<td class="text-center col-1">{{index+1}}</td>
						<td class="text-center col-8">{{result.createdAt | datetime}}</td>
						<td class="text-center col-3">{{result.advName}}</td>
						<td class="text-center col-2">{{result.id}}</td><!-- 计划id -->
						<td class="text-center col-4">
							<a class="more-creatives" href="javascript:void(0);" @click="getCreative(index,result.advId,result.id)">{{result.name}}</a>
						</td>
						<td class="text-right col-5">￥{{result.budgetAmountTotal | amount}}</td>
						<td class="text-right col-6">￥{{result.budgetAmountDaily | amount}}</td>
						<td class="text-center col-7">{{result.verificationStatus | dict verifications}}</td>
						<td class="text-center col-7" v-if="result.availabilityStatus == 'ALLOWED'">投放中</td>
						<td class="text-center col-7" v-if="result.availabilityStatus == 'DISALLOWED'">停止投放</td>
						<td class="text-center col-9">
							<a v-if="result.verificationStatus == 'PENGDING'||result.verificationStatus == 'DENIED'" href="javascript:void(0);" @click="approveCampagin(index,result.id,'APPROVED',result.advId)">通过</a>
							<span class="not-allow" v-else>通过</span>
							&nbsp;&nbsp;
							<a v-if="result.verificationStatus == 'PENGDING'||result.verificationStatus == 'APPROVED'" href="javascript:void(0);" @click="approveCampagin(index,result.id,'DENIED',result.advId)">拒绝</a>
							<span class="not-allow" v-else>拒绝</span>
						</td>
						<td class="text-center col-9">
							<switch v-if="result.verificationStatus === 'APPROVED'" :value.sync="result.availabilityStatus" 
							on-url="/v1/adm/campaigns/{campaignId}/availabilities"
							:on-params="{advId:result.advId,campaignId:result.id,availabilityStatus:'DISALLOWED'}"
							off-url="/v1/adm/campaigns/{campaignId}/availabilities"
							:off-params="{advId:result.advId,campaignId:result.id,availabilityStatus:'ALLOWED'}"></switch>
							<span class="" v-else>- -</span>
	
						</td>
					</tr>
	
					<tr  v-if="result.creatives.length > 0 && result.show"  class="row-creatives">
						<td class="text-center">ID</td>
						<td class="text-center">提交时间</td>
						<td class="text-center">广告类型</td>
						<td class="text-center">创意ID</td>
						<td class="text-center">创意名称</td>
						<td class="text-center">预览</td>
						<td class="text-center">配置</td>
						<td class="text-center">审核状态</td>
						<td class="text-center">投放状态</td>
						<td class="text-center">审核</td>
						<td class="text-center">操作</td>
					</tr>
					
					<tr v-if="result.creatives.length > 0 && result.show"  v-for="(itemNo,creative) in result.creatives" track-by="id" class="row-data row-detail-data">
						<td class="text-center">{{index+1}}-{{itemNo+1}}</td>
						<td class="">{{creative.createdTime | datetime}}</td>
						<td class="text-center">{{creative.adTypeOnProduct | dict adslotTypes}}</td>
						<td class="text-center">{{creative.id}}</td>
						<td class="text-center">{{creative.codeName}}</td>
						<td class="text-center">
							<a href="javascript:void(0)">预览</a>
						</td>
						<td class="text-center">
							<a href="javascript:void(0);" class="op-config" @click="goConfig(result.advId,result.advName,result.id,result.name,creative.id,creative.codeName,creative.adTypeOnProduct)">定向配置</a>
						</td>
						<td class="text-center">{{creative.verificationStatus | dict verifications}}</td>

						<td class="text-center" v-if="creative.availabilityStatus == 'ALLOWED'">投放中</td>
						<td class="text-center" v-if="creative.availabilityStatus == 'DISALLOWED'">停止投放</td>
						
						<td class="text-center">
							<a v-if="creative.verificationStatus == 'PENGDING'||creative.verificationStatus == 'DENIED'" @click="approveCreative(index,itemNo,result.advId,result.id,creative.id,'APPROVED')">通过</a>
							<span class="not-allow" v-else>通过</span>
							&nbsp;&nbsp;
							<a v-if="creative.verificationStatus == 'PENGDING'||creative.verificationStatus == 'APPROVED'" @click="approveCreative(index,itemNo,result.advId,result.id,creative.id,'DENIED')">拒绝</a>
							<span class="not-allow" v-else>拒绝</span>
						</td>
						<td class="text-center">
	
							<switch v-if="creative.verificationStatus === 'APPROVED'" :value.sync="creative.availabilityStatus" 
							on-url="/v1/adm/campaigns/{campaignId}/creatives/{creativeId}/availabilities"
							:on-params="{advId:result.advId,campaignId:result.id,creativeId:creative.id,availabilityStatus:'DISALLOWED'}"
							off-url="/v1/adm/campaigns/{campaignId}/creatives/{creativeId}/availabilities"
							:off-params="{advId:result.advId,campaignId:result.id,creativeId:creative.id,availabilityStatus:'ALLOWED'}"></switch>
							<span class="" v-else>- -</span>
	
	
							<!-- <a v-if="creative.verificationStatus == 'APPROVED' &&creative.availabilityStatus == 'DISALLOWED'" @click="openCreative(index,itemNo,result.advId,result.id,creative.id,'ALLOWED')">开启</a>
							<td class="not-allow" v-else>开启</td>
							<a v-if="creative.verificationStatus == 'APPROVED' &&creative.availabilityStatus == 'ALLOWED'" @click="openCreative(index,itemNo,result.advId,result.id,creative.id,'DISALLOWED')">关闭</a>
							<td class="not-allow" v-else>关闭</td> -->
						</td>
						
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
		adslotTypes:[],
		verifications:[]
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
			
			var resource = this.$resource('/v1/adm/campaigns/{pageNum}/{pageSize}');
			
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

				var list=result.results;

				for(var i=0,l=list.length;i<l;i++){
					list[i].show=false;
					list[i].creatives=[];
					console.info(list[i].availabilityStatus);
				}
				
				this.list=result.results;
				
			},function(){
			
				this.unmask();
				
			});
		
		},
		doSearch:function(){
		
			this.load(1);
			
		},
		getCreative:function(index,advId,campaignId){
			
			if(this.list[index].creatives.length==0){
				//加载已有数据
				this.$http.get('/v1/adm/campaigns/'+campaignId+'/creatives',{
					advId:advId
				}).then(function(res){
				
					var data=res.data;
					
					if(data.ret!=1)
						return;
					
					var result=data.result;
					
					this.list[index].show=!this.list[index].show;
					
					this.list[index].creatives=result;
				},function(){});
			}else{
				this.list[index].show=!this.list[index].show;
			}
		},
		// 审核计划
		approveCampagin:function(index,campaignId,verificationStatus,advId){

			this.mask();

			var params={
				campaignId:campaignId,
				verificationStatus:verificationStatus,
				advId:advId
			};

			this.$http.put("/v1/adm/campaigns/"+campaignId+"/verifications",params).then(function(res){

				var data = res.data;

				if(data.ret!=1){
					
					this.unmask();
					
					return;
				}
				
				this.list[index]['verificationStatus'] = verificationStatus;

				this.unmask();

			},function(){this.unmask();});

		},
		// // 开启投放计划
		// openCampagin:function(index,campaignId,availabilityStatus,advId){

		// 	this.mask();

		// 	var params={
		// 		campaignId:campaignId,
		// 		availabilityStatus:availabilityStatus,
		// 		advId:advId
		// 	};

		// 	this.$http.put("/v1/adm/campaigns/"+campaignId+"/availabilities",params).then(function(res){

		// 		var data = res.data;

		// 		if(data.ret!=1){
					
		// 			this.unmask();
					
		// 			return;
		// 		}
				
		// 		this.list[index]['availabilityStatus'] = availabilityStatus;

		// 		this.unmask();

		// 	},function(){this.unmask();});

		// },
		// 审核创意
		approveCreative:function(index,itemNo,advId,campaignId,creativeId,verificationStatus){

			this.mask();

			var params={
				campaignId:campaignId,
				verificationStatus:verificationStatus,
				advId:advId,
				creativeId:creativeId
			};

			this.$http.put("/v1/adm/campaigns/"+campaignId+"/creatives/"+creativeId+"/verifications",params).then(function(res){

				var data = res.data;

				if(data.ret!=1){
					
					this.unmask();
					
					return;
				}
				this
				.list[index]['creatives'][itemNo]['verificationStatus'] = verificationStatus;

				this.unmask();

			},function(){this.unmask();});

		},
		// // 开启投放创意
		// openCreative:function(index,itemNo,advId,campaignId,creativeId,availabilityStatus){

		// 	this.mask();

		// 	var params={
		// 		campaignId:campaignId,
		// 		availabilityStatus:availabilityStatus,
		// 		advId:advId,
		// 		creativeId:creativeId
		// 	};

		// 	this.$http.put("/v1/adm/campaigns/"+campaignId+"/creatives/"+creativeId+"/availabilities",params).then(function(res){

		// 		var data = res.data;

		// 		if(data.ret!=1){
					
		// 			this.unmask();
					
		// 			return;
		// 		}
				
		// 		this.list[index]['creatives'][itemNo]['availabilityStatus'] = availabilityStatus;

		// 		this.unmask();

		// 	},function(){this.unmask();});

		// },
		goConfig:function(advId,advName,campaignId,campaignName,creativeId,creativeName,adTypeOnProduct){

			this.$route.router.go({
				path:'/adm/adv/config?advId=' + advId +'&advName=' + advName +'&campaignName=' + campaignName +'&campaignId=' + campaignId +'&creativeName=' + creativeName +'&creativeId=' + creativeId +'&adTypeOnProduct=' + adTypeOnProduct 
			});
		}
	},
	ready : function() {
	
		this.load();

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

		//加载数据字典 审核状态类型
		this.$http.get("/v1/dict/apps/verifications").then(function(res){
		
			this.unmask();
		
			var data=res.data;
			
			if(data.ret!=1)
				return;
			
			this.verifications=data.result;
	
		},function(){this.unmask();});
		
	}
};
</script>

<style lang="less">
	
	.adm-adv-campaign{
		padding:15px 28px 30px;
		background: white;
	}

	.adm-adv-campaign .crumbs-title{
		margin:8px 0 0;
	}

	.adm-adv-campaign .search-empty{
		text-align:center;
		padding:100px 0;
		border:1px solid #ddd;
		border-top:none 0;
	}

	.adm-adv-campaign .form-search{
		width: 350px;
	}

	.adm-adv-campaign .form-search .btn{
		color: white;
		display: table-cell;
		vertical-align: middle;
	    white-space: nowrap;
	    width: 1%;
	    padding-left: 17px;
    	padding-right: 17px;
	}

	.adm-adv-campaign .col-1{
		width:45px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-adv-campaign .col-2{
		width:60px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-adv-campaign .col-3{
		width:90px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-adv-campaign .col-4{
		width:10%;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-adv-campaign .col-5{
		width:10%;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-adv-campaign .col-6{
		width:10%;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-adv-campaign .col-7{
		width:60px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adm-adv-campaign .col-8{
		width:71px;
		word-break:break-all;
		word-wrap: break-word;
	}

	.adm-adv-campaign .col-9{
		width: 85px;
		word-break:break-all;
		word-wrap: break-word;
	}

	.adm-adv-campaign .op-config{
		cursor:pointer;
	}

	/*表单相关*/
	.adm-campaign-cnt .table-record{
		border-bottom-width:0;
	}
	
	.adm-campaign-cnt .table-record:last-child{
		border-bottom-width:1px;
	}
	
	.adm-campaign-cnt .table-header{
		border-bottom:0;
	}
	
	.adm-campaign-cnt .table-header > thead > tr > th{
		border-bottom:0;
	}

	.adm-adv-campaign .table-header{
		border-bottom:0;
	}
	
	.adm-adv-campaign .table-header > thead > tr > th{
		border-bottom:0;
	}
	
	.adm-adv-campaign .table-record > thead > tr > td, .adm-adv-campaign .table-record > tbody > tr > td, .adm-adv-campaign .table-record > tfoot > tr > td{
		border-bottom:none 0;
	}
	
	.adm-adv-campaign .table-bordered > thead > tr.row-creatives, .adm-adv-campaign .table-bordered > tbody > tr.row-creatives, .adm-adv-campaign .table-bordered > tfoot > tr.row-creatives{
		background: #E4ECFC;
	}
	
	.adm-adv-campaign .table-bordered > thead > tr.row-creatives > td, .adm-adv-campaign .table-bordered > tbody > tr.row-creatives > td, .adm-adv-campaign .table-bordered > tfoot > tr.row-creatives > td{
		padding:8px;
	}
	
	.adm-adv-campaign .table-bordered > thead > tr.row-creatives > td, .adm-adv-campaign .table-bordered > tbody > tr.row-creatives > td, .adm-adv-campaign .table-bordered > tfoot > tr.row-creatives{
	
	}
	
	.adm-adv-campaign .table-bordered > thead > tr.row-creatives-record, .adm-adv-campaign .table-bordered > tbody > tr.row-creatives-record, .adm-adv-campaign .table-bordered > tfoot > tr.row-creatives-record{

	}
	
	.adm-adv-campaign .table-bordered > thead > tr.row-creatives-record > td:not(:last-child), .adm-adv-campaign .table-bordered > tbody > tr.row-creatives-record > td:not(:last-child), .adm-adv-campaign .table-bordered > tfoot > tr.row-creatives-record > td:not(:last-child){

	}
	
	.adm-adv-campaign .row-even{
		background-color:#F5F8FC;
	}
	
	.adm-adv-campaign .table-record > tbody > tr.row-data:hover{
		background-color:#f5f5f5;	
	}
	
	.adm-adv-campaign .not-allow {
		color: #ccc;
		cursor: not-allowed;
	}
</style>
