<template>
	<div class="adv-campaign-index">
	
		<div class="crumbs clearfix">
	
			<h4 class="pull-left crumbs-title">广告管理</h4>
	
			<a v-link="{path:'/adv/campaign'}" class="pull-left btn btn-primary btn-common">新增计划</a>
	
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
					<th class="text-center  col-2">ID</th>
					<th class="text-center  col-7">创建时间</th>
					<th class="text-center  col-3">计划ID</th>
					<th class="text-center  col-4">计划名称</th>
					<th class="text-center  col-5">计划预算</th>
					<th class="text-center  col-6">每日预算</th>
					<th class="text-center  col-7">投放时间</th>
					<th class="text-center  col-8">审核状态</th>
					<th class="text-center  col-9">投放状态</th>
					<th class="text-center  col-10">操作</th>
				</tr>
			</thead>
		</table>
		
		<div class="adv-campaign-cnt">
			<table v-if="list.length > 0" v-for="(index,result) in list" track-by="id" class="table table-bordered table-record">
				<tbody>
					<tr class="row-data row-{{index%2==0 ? 'old' : 'even'}}" >
						<td class="text-center col-2">{{index+1}}</td>
						<td class="col-7">{{result.createdAt | datetime}}</td>
						<td class="text-center col-3">{{result.id}}</td>
						<td class="text-center col-4"><a class="more-creatives" href="javascript:void(0);" @click="clickCreatives(index,result.id)">{{result.name}}</a></td>
						<td class="text-right col-5">￥{{result.budgetAmountTotal}}</td>
						<td class="text-right col-6">￥{{result.budgetAmountDaily}}</td>
						<td class="col-7">{{result.dateStart | date 'YYYY.MM.DD'}}-{{result.dateEnd | date 'YYYY.MM.DD'}}</td>
						<td class="text-center col-8">
		
							<!-- <switch v-if="result.verificationStatus==='APPROVED'" :value.sync="result.availabilityStatus" 
								on-url="/v1/adv/campaigns/{campaignId}/availabilities/{availabilityStatus}"
								:on-params="{campaignId:result.id,availabilityStatus:'DISALLOWED'}"
								off-url="/v1/adv/campaigns/{campaignId}/availabilities/{availabilityStatus}"
								:off-params="{campaignId:result.id,availabilityStatus:'ALLOWED'}"></switch>
								v-if="result.verificationStatus!=='APPROVED'" -->
								
							<span>{{result.verificationStatus | dict verificationStatus}}</span>
						
						</td>
						<td class="text-center col-9">
							<!-- <switch v-if="result.verificationStatus==='APPROVED'" :value.sync="result.availabilityStatus" 
								on-url="/v1/adv/campaigns/{campaignId}/availabilities/{availabilityStatus}"
								:on-params="{campaignId:result.id,availabilityStatus:'DISALLOWED'}"
								off-url="/v1/adv/campaigns/{campaignId}/availabilities/{availabilityStatus}"
								:off-params="{campaignId:result.id,availabilityStatus:'ALLOWED'}"></switch>
								
							<span v-if="result.verificationStatus!=='APPROVED'">- -</span> -->
							<span v-if="result.availabilityStatus=='ALLOWED'">投放中</span>
							<span v-else>未投放</span>
	
						</td>
						<td class="text-center col-10">
	
							<div class="btn-group btn-group-sm">
								<button type="button" class="btn btn-default operation-btn table-button">请选择</button>
								<button type="button" data-toggle="dropdown" class="btn btn-default dropdown-toggle">
									<span class="caret"></span>
								</button>
								<ul role="menu" class="dropdown-menu table-button-list">
									<li><a href="javascript:void(0);" @click="updateCampaign(result.id)">修改</a></li>
									<li v-if="result.verificationStatus!=='APPROVED'">
										<a href="javascript:void(0);" @click="deleteCampaign(result.name,result.id)">删除</a>
									</li>
									<li><a href="javascript:void(0);" @click="addCampaign(result.id)">新增创意</a></li>
									<li><a href="javascript:void(0);" @click="putOnCampaign($index,result.id,'ALLOWED')">投放</a></li>
									<li><a href="javascript:void(0);" @click="putOnCampaign($index,result.id,'DISALLOWED')">停止投放</a></li>
								</ul>
							</div>
						</td>
					</tr>
					<tr  v-if="result.creatives.length > 0 && result.show" class="row-creatives">
						<td class="text-center">ID</td>
						<td class="text-center">创建时间</td>
						<td class="text-center">创意ID</td>
						<td class="text-center">创意名称</td>
						<td class="text-center">广告类型</td>
						<td class="text-center">广告形式</td>
						<td class="text-center">创意预览</td>
						<td class="text-center">审核状态</td>
						<td class="text-center">投放状态</td>
						<td class="text-center">操作</td>
					</tr>
					<tr v-if="result.creatives.length > 0 && result.show" v-for="(idx,ct) in result.creatives" track-by="id" class="row-data row-detail-data">
						<td class="text-center">{{index+1}}-{{idx+1}}</td>
						<td class="text-center">{{ct.createTime | datetime}}</td>
						<td class="text-center">{{ct.id}}</td>
						<td class="text-center">{{ct.codeName}}</td>
						<td class="text-center">{{ct.adTypeOnProduct | dict adslotTypes}}</td>
						<td class="text-center">{{ct.adTypeOnInterface | dict adInterfaceTypes}}</td>
						<td class="text-center">
							<a class="preview" href="javascript:void(0);">预览</a>
						</td>
						<td class="text-center">{{ct.verificationStatus | dict verificationStatus}}</td>
						<td class="text-center">
							
							<switch v-if="ct.verificationStatus==='APPROVED'" :value.sync="ct.availabilityStatus" 
								on-url="/v1/adv/campaigns/{campaignId}/creatives/{creativeId}/availabilities/{availabilityStatus}"
								:on-params="{campaignId:result.id,creativeId:ct.id,availabilityStatus:'DISALLOWED'}"
								off-url="/v1/adv/campaigns/{campaignId}/creatives/{creativeId}/availabilities/{availabilityStatus}"
								:off-params="{campaignId:result.id,creativeId:ct.id,availabilityStatus:'ALLOWED'}"></switch>
								
							<span v-if="ct.verificationStatus!=='APPROVED'">- -</span>
	
						</td>
						<td v-if="ct.verificationStatus!=='APPROVED'" class="text-center"><a href="javascript:void(0);" @click="deleteCreative(ct.codeName,idx,ct.id,index,result.id)">删除</a></td>
						<td   class="text-center" v-else><a href="javascript:void(0);" class="disabled">删除</a></td>
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
			total:-1,
			list:[],
			verificationStatus:[],
			adslotTypes:[],
			adInterfaceTypes:[]
		  };
		},
		ready : function() {
		
			this.mask();
				
			//加载数据字典 广告位置
			this.$http.get("/v1/dict/campaign/verifications").then(function(res){
			
				this.unmask();
			
				var data=res.data;
				
				if(data.ret!=1) {
					return;
				}
				
				this.verificationStatus=data.result;
		
			},function(){this.unmask();});
			
			///////////////////////////////////////////////////////////////
			
			this.mask();
				
			//交互形式
			this.$http.get("/v1/dict/types/adinterfaces").then(function(res){
			
				this.unmask();
			
				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				this.adInterfaceTypes=data.result;
		
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
		
			}, function(){this.unmask();});
			
			///////////////////////////////////////////////////////////////
			
			this.load(1);
			
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
				
				var resource = this.$resource('/v1/adv/campaigns/{pageNum}/{pageSize}');
				
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
						list[i].creatives=[];
					}
					
					this.list=list;
					
				},function(){this.unmask();});
			
			},
			doSearch:function(){
			
				this.load(1);
				
			},
			clickCreatives:function(index,campaignId){
				
				if(this.list[index].creatives.length==0){
					
					this.mask();
					
					//加载已有数据
					this.$http.get("/v1/adv/campaigns/{campaignId}/creatives",{
						campaignId:campaignId
					}).then(function(res){
					
						this.unmask();
						
						var data=res.data;
						
						if(data.ret!=1)
							return;
						
						var result=data.result;
						
						this.list[index].show=!this.list[index].show;
						
						this.list[index].creatives=result;
						
					},function(){this.unmask();});
					
				}else
					this.list[index].show=!this.list[index].show;
				
			},
			// 复制
			copyCampaign:function(campaignId){
	
				this.mask();
				
				this.$http.post("/v1/adv/campaigns/"+campaignId+"/clone",{
						campaignId:campaignId
					}).then(function(res){
	
						var data = res.data;
						
						if(data.ret != 1)
							return $.confirm({
								title: "提示",
								content: '创意复制失败:'+data.message,
								confirmButton: '确定',
	        					cancelButton: false
							});
							
						//跳转到下一步	
						this.$route.router.go({
							path:'/adv/campaign?campaignId=' + data.result.id 
						});
	
					},function(){this.unmask();});
			
			},
			addCampaign:function(campaignId){
				this.$route.router.go({
					path:'/adv/campaign/creative/add?campaignId=' + campaignId
				});
			},
			deleteCreative:function(creativeName,creativeIndex,creativeId,campaignIndex,campaignId){
				
				var self = this;
				
				var doDeleteAction=function(creativeIndex,creativeId,campaignIndex,campaignId){
					
					var resource = self.$resource('/v1/adv/campaigns/{campaignId}/creatives/{creativeId}');
					
					resource.delete({
						campaignId:campaignId,
						creativeId:creativeId
					}).then(function (response) {
							
						this.unmask();
						
						// success callback
						var data = response.data;
						
						if(data.ret != 1)
							return $.confirm({
								title: '提示',
								content: '删除失败：'+data.message,
								confirmButton: '确定',
								cancelButton: false
							});
						
						self.list[campaignIndex].creatives.splice(creativeIndex,1);
						
						$.confirm({
							title: '提示',
							content: '删除成功',
							confirmButton: '确定',
							cancelButton: false
						});
					
					}, function (response) {
					
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
					content: '您确定要删除吗？此操作不可逆，请谨慎！',
					confirmButton:'确定',
					cancelButton: '取消',
					confirm: function(type){
				
						doDeleteAction.call(self,creativeIndex,creativeId,campaignIndex,campaignId);
						
					}
				});
				
			},
			// 修改
			updateCampaign:function(campaignId){
	
				this.$route.router.go({
					path:'/adv/campaign?campaignId=' + campaignId 
				});
				
			},
			// 投放
			putOnCampaign:function(index,campaignId,state){

				this.mask();

				this.$http.put('/v1/adv/campaigns/'+campaignId+'/availabilities/'+state).then(function(res){
        			
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
			// 删除
			deleteCampaign:function(campaignName,campaignId){
	
				var self = this;
				
				var doDeleteAction=function(campaignId){
					
					var resource = self.$resource('/v1/adv/campaigns/{campaignId}');
					
					resource.delete({campaignId:campaignId}).then(function (response) {
							
						this.unmask();
						
						// success callback
						var data = response.data;
						
						if(data.ret != 1)
							return $.confirm({
								title: '提示',
								content: '删除失败：'+data.message,
								confirmButton: '确定',
								cancelButton: false
							});
		
						$.confirm({
							title: '提示',
							content: '删除成功',
							confirmButton: '确定',
							backgroundDismiss:false,
							cancelButton: false,
							confirm: function(type){self.load(1);}
						});
					
					}, function (response) {
					
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
					content: '您确定要删除吗？此操作不可逆！',
					confirmButton:'确定',
					cancelButton: '取消',
					confirm: function(type){
				
						doDeleteAction.call(self,campaignId);
						
					}
				});
			}
		}
	};
</script>

<style lang="less">
	
	.adv-campaign-index{
		padding:15px 28px 30px;
		background: white;
	}
	
	.adv-campaign-index .crumbs-title{
		margin:8px 0 0;
	}
	
	.adv-campaign-index .search-empty{
		text-align:center;
		padding:100px 0;
		border:1px solid #ddd;
		border-top:none 0;
	}

	.adv-campaign-index .form-search{
		width: 350px;
	}

	.adv-campaign-index .form-search .btn{
		color: white;
		display: table-cell;
		vertical-align: middle;
	    white-space: nowrap;
	    width: 1%;
	    padding-left: 17px;
    	padding-right: 17px;
	}

	.adv-campaign-index .crumbs .btn-common{
		margin-left:10px;
		margin-top: 2px;
	}

	.adv-campaign-index .more-creatives{
		text-decoration:underline;
	}
	
	.adv-campaign-index .col-1{
		width:30px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adv-campaign-index .col-2{
		width:50px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adv-campaign-index .col-3{
		width:70px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adv-campaign-index .col-4{
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adv-campaign-index .col-5{
		width:80px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adv-campaign-index .col-6{
		width:80px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adv-campaign-index .col-7{
		width:150px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adv-campaign-index .col-8{
		width:70px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adv-campaign-index .col-9{
		width:100px;
		word-break:break-all;
		word-wrap: break-word;
	}
	
	.adv-campaign-index .col-10{
		width:130px;
		word-break:break-all;
		word-wrap: break-word;
	}

	/*表单相关*/
	.adv-campaign-cnt .table-record{
		border-bottom-width:0;
	}
	
	.adv-campaign-cnt .table-record:last-child{
		border-bottom-width:1px;
	}
	
	.adv-campaign-cnt .table-header{
		border-bottom:0;
	}
	
	.adv-campaign-cnt .table-header > thead > tr > th{
		border-bottom:0;
	}

	.adv-campaign-index .table-header{
		border-bottom:0;
	}
	
	.adv-campaign-index .table-header > thead > tr > th{
		border-bottom:0;
	}
	
	.adv-campaign-index .table-record > thead > tr > td, .adv-campaign-index .table-record > tbody > tr > td, .adv-campaign-index .table-record > tfoot > tr > td{
		border-bottom:none 0;
	}
	
	.adv-campaign-index .table-bordered > thead > tr.row-creatives, .adv-campaign-index .table-bordered > tbody > tr.row-creatives, .adv-campaign-index .table-bordered > tfoot > tr.row-creatives{
		background: #E4ECFC;
	}
	
	.adv-campaign-index .table-bordered > thead > tr.row-creatives > td, .adv-campaign-index .table-bordered > tbody > tr.row-creatives > td, .adv-campaign-index .table-bordered > tfoot > tr.row-creatives > td{
		padding:8px;
	}
	
	.adv-campaign-index .table-bordered > thead > tr.row-creatives > td, .adv-campaign-index .table-bordered > tbody > tr.row-creatives > td, .adv-campaign-index .table-bordered > tfoot > tr.row-creatives{
	
	}
	
	.adv-campaign-index .table-bordered > thead > tr.row-creatives-record, .adv-campaign-index .table-bordered > tbody > tr.row-creatives-record, .adv-campaign-index .table-bordered > tfoot > tr.row-creatives-record{

	}
	
	.adv-campaign-index .table-bordered > thead > tr.row-creatives-record > td:not(:last-child), .adv-campaign-index .table-bordered > tbody > tr.row-creatives-record > td:not(:last-child), .adv-campaign-index .table-bordered > tfoot > tr.row-creatives-record > td:not(:last-child){

	}
		
	.adv-campaign-index .row-even{
		background-color:#F5F8FC;
	}
		
	.adv-campaign-index .table-record > tbody > tr.row-data:hover{
		background-color:#f5f5f5;	
	}

	.adv-campaign-index .disabled{
		cursor: not-allowed;
		color: #ccc;
	}
	
	.adv-campaign-index .operation-btn{
		width: 74px;
	}

	.adv-campaign-index .preview{
		font-weight: normal;
		line-height: 25px;
	}

	.adv-campaign-index .dropdown-menu{
		min-width: 100px;
	}
	
</style>
