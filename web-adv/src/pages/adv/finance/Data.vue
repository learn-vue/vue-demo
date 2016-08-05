<template>
	<div class="adv-finance-data">

		<div class="crumbs">
			<h4 class="crumbs-title">广告主财务概览</h4>
		</div>
		
		<div class="stat-bar clearfix">
			
			<div class="pull-left col-1-2 sub-block-first">
				<div class="sub-block">
					<h5>广告主总消费</h5>
					<div class="spliter"></div>
					<p>{{consume | currency '￥'}}</p>
				</div>
			</div>
			
			<div class="pull-left col-1-2 sub-block-last">
				<div class="sub-block">
					<h5>广告主余额</h5>
					<div class="spliter"></div>
					<p>{{balance  | currency '￥'}}</p>
				</div>
			</div>
		
		</div>
		
		<div class="search-bar clearfix">
			
			<h4 class="search-title pull-left">广告主信息记录</h4>
			
			<input id="date_range" type="text" v-model="dateRange" class="pull-left form-control date-range" readonly placeholder="请选择日期">
	
		</div>
			
		<table class="table table-bordered table-striped table-hover">
			<thead>
				<tr>
					<th class="text-center">日期</th>
					<th class="text-center">充值</th>
					<th class="text-center">消费</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="list.length > 0" v-for="(index, result) in list" class="row-data row-{{index%2==0 ? 'old' : 'even'}}">
					<td>{{result.date | date}}</td>
					<td class="text-right">{{result.depositAmount  | currency '￥'}}</td>
					<td class="text-right">{{result.withdrawLAmount  | currency '￥'}}</td>
				</tr>
			</tbody>
		</table>
		
		<div class="pager-box">
		
			<pager :page-size.sync="pageSize" :page-no.sync="pageNum" :total-records.sync="total"></pager>
			
			<a v-if="list.length > 0" href={{exportURL}} target="_blank" class="btn btn-primary btn-common btn-export">导出CSV</a>
		</div>
		
		<div v-if="list.length == 0" class="search-empty">抱歉，暂无数据！</div>
											
	</div>
</template>	

<script>
	
	import ApiUtil from './../../../util/api';
	
	import Pager from '../../../components/Pager.vue';

	module.exports = {
		components:{
			'pager':Pager
		},
		data:function(){

			return {
				///////////////////////表格相关
				balance:'0',
				consume: '0',
				pageNum:1,
				pageSize:10,
				total:-1,
				list:[],
				startDate:(new Date()).getTime()-7*24*60*60*1000,
				endDate:(new Date()).getTime()
			};

		},
		computed:{
		
			dateRange:function(){
			
				return moment(this.startDate).format("YYYY-MM-DD")+" / "+moment(this.endDate).format("YYYY-MM-DD");
			},
			
			exportURL:function(){
				
				var url=ApiUtil.url('/v1/adv/finances/settles/export');
				
				var params=[];
				
				if(this.startDate)
					params.push("startDate=",this.startDate);
					
				if(this.endDate)
					params.push("endDate=",this.endDate);
	
				if(params.length)
					url+="?"+params.join("&");
					
				return url;
			}
		},
		ready:function(){

			var self=this;
			
			$("#date_range").daterangepicker({
				locale:{
					applyLabel: '确定',
            		cancelLabel: '取消'
            	},
            	startDate:new Date(this.startDate),
            	endDate:new Date(this.endDate)
			}).on("apply.daterangepicker",function(e,ui){
				
				self.startDate=ui.startDate.toDate().getTime();
				
				self.endDate=ui.endDate.toDate().getTime();
		
				self.pageTo(1);
				
			});

			//获取总收益信息
			this.mask();
			
			this.$http.get("/v1/adv/stats/finances/balance").then(function(res){
				
				this.unmask();
				
				var data=res.data;
				
				if(data.ret == 1){
					
					this.balance = data.result.balance;
					
					this.consume = data.result.consume;
				}

			},function(){this.unmask();});

			this.pageTo(1);
		},
		route:{
			activate: function (transition) {
		     
		      transition.next();
		      
		    },
		    deactivate: function (transition) {
		     
		    	$("#date_range").data('daterangepicker').remove();;
				
				this.unmask();
		    	 
		    	transition.next();
		    }
		},
		events:{
			//注册翻页事件
			page:function(evt,pageNum){
			
				this.pageTo(pageNum);
			
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
			pageTo:function(pageNum){
	 
				//获取收入结算记录表
				this.mask();

				var params = {
					pageSize : this.pageSize,
					pageNum : this.pageNum,
					startDate:this.startDate,
					endDate:this.endDate
				};
				
				var resource = this.$resource('/v1/adv/finances/settles/{pageNum}/{pageSize}');

				resource.get(params).then(function(res){
					
					this.unmask();
					
					var data=res.data;
					
					if(data.ret!=1)
						return;
					
					var result = data.result;
					
					//处理结果
					this.pageNum=result.pageNum;
					
					this.pageSize=result.pageSize;
					
					this.total=result.total;
					
					this.list=result.list;

				},function(){this.unmask();});
			}
		}
    };

</script>

<style>

	
	.adv-finance-data{
		padding:15px 28px 0 28px;
		background-color: white;
		height:100%;
	}
	
	.adv-finance-data .crumbs-title{
		margin-bottom: 20px;
		margin-top: 0;
	}

	.adv-finance-data .date-range{
		width: 226px;
		margin-left:20px;
		margin-top:2px;
	}
	
	.adv-finance-data .col-1-2{
		width:50%;
		padding:0 8px;
	}
	
	.adv-finance-data .sub-block-first{
		padding-left:0;
	}
	
	.adv-finance-data .sub-block-last{
		padding-right:0;
	}
	
	.adv-finance-data .sub-block{
		border:1px solid #EAEDF1;
		text-align:center;
		background-color:#f5f6fa;
	}
	
	.adv-finance-data .stat-bar{
		margin: 30px 0;
	}
		
	.adv-finance-data .stat-bar h4{
		margin: 0;
		padding: 20px 0;
		display: inline-block;
	}
		
	.adv-finance-data .sub-block p{
		font-size: 18px;
		padding-top:10px;
	}
	
	.adv-finance-data .spliter{
		margin:0 5%;
		border-top:1px solid #eaedf1;
	}
	
	.adv-finance-data .search-bar{
		margin-bottom:20px;
	}
	
	.adv-finance-data .search-title{
		font-size:14px;
	}
	
	.adv-finance-data .pager-box{
		position:relative;
	}
	
	.adv-finance-data .search-empty{
		text-align:center;
		padding:100px 0;
		border:1px solid #ddd;
		border-top:none 0;
	}
	
	.adv-finance-data .pagination-summary{
		margin-right:30px;
		float:right !important;
	}
	
	.adv-finance-data .btn-export{
		position:absolute;
		top: 0;
	}
</style>