<template>
	<div class="adv-data-index">
		
		<div class="clearfix">
		
			<div class="crumbs pull-left">			
				<h4 class="crumbs-title">数据管理</h4>
			</div>
			
			<div class="search-bar pull-right">
			
				<div class="form-group pull-right">
					<input id="date_range" type="text" v-model="dateRange" class="form-control" read-only="readOnly" placeholder="请选择日期">
	    		</div>
				
				<!-- 广告下拉 -->
				<div class="form-group pull-right">
					<select class="form-control" v-model="creativeId" @change="load">
						<option v-for="creative in creatives" value="{{creative.id}}">{{creative.text}}</option>
					</select>
				</div>
				
				<!-- 应用下拉 -->
				<div class="form-group pull-right">
					<select class="form-control" v-model="campaignId" @change="loadAdslots">
						<option v-for="campaign in campaigns" value="{{campaign.id}}">{{campaign.text}}</option>
					</select>
				</div>
				
			</div>
		
		</div>
		
		<div class="chart-bar">
		
			<div v-show="creativeId!='-1'" id="chart" class="chart-cnt"></div>
		
			<div v-show="creativeId=='-1'" class="chart-empty">抱歉，暂无数据！</div>
			
		</div>
		
		<table class="table table-bordered table-striped table-hover">
			<thead>
			  <tr>
				<th class="text-center">日期</th>
				<th class="text-center">展现数</th>
				<th class="text-center">点击数</th>
				<th class="text-center">点击消费</th>
				<th class="text-center">点击率</th>
				<th class="text-center">千次展现消费</th>
			  </tr>
			</thead>
			<tbody>
			  <tr v-if="list.length > 0" v-for="(index,result) in list" class="row-data row-{{index%2==0 ? 'old' : 'even'}}">
				<td>{{result.date | date}}</td>
				<td class="text-right">{{result.numOfAdImpressions | amount 0}}</td>
				<td class="text-right">{{result.numOfAdClicks | amount 0}}</td>
				<td class="text-right">￥{{result.chargeOfClicks | amount}}</td>
				<td class="text-right">{{result.ctr | amount}} ‰</td>
				<td class="text-right">{{result.cpm | currency '￥'}}</td>
			  </tr>
			</tbody>
		</table>
				
		<div class="pager-box">
		
			<pager :page-size.sync="pageSize" :page-no.sync="pageNum" :total-records.sync="total"></pager>
		
			<a v-if="list.length > 0"  href={{exportURL}} target="_blank" class="btn btn-primary btn-common btn-export" @click="doExport">导出Excel</a>
		
		</div>
	
		<div v-if="list.length == 0" class="search-empty">抱歉，暂无数据！</div>
	  
	</div>

</template>

<script>
	
	import ApiUtil from './../../../util/api';
	
	import echarts from 'echarts';
	
  	import Pager from '../../../components/Pager.vue';
  	
	module.exports = {
		props: {
		},
		components:{
			'pager':Pager
		},
		data : function() {
		  return {
		  	anyCampaign:{id:"-1",text:"请选择推广计划"},
		  	anyCreative:{id:"-1",text:"请选择创意"},
		  	empty:{id:"-1",text:"暂无数据"},
		  	wait:{id:"-1",text:"加载中,请稍后..."},
		  	campaigns:[],
		  	creatives:[],
		  	campaignId:"-1",
		  	creativeId:"-1",
		  	///////////////////////表格相关
			pageNum:1,
			pageSize:10,
			total:-1,
			list:[],
			///////////////////////日期控件
            endDate: (new Date()).getTime(),
            startDate: (new Date()).getTime()-7*24*60*60*1000
		  };
		},
		computed:{
		
			dateRange:function(){
				
				var startDate=new Date(this.startDate);
				
				var endDate=new Date(this.endDate);
				
				return moment(startDate).format("YYYY-MM-DD")+" / "+moment(endDate).format("YYYY-MM-DD");
			},
			
			exportURL:function(){
				
				var url=ApiUtil.url('/v1/adv/stats/creativeOfDay/'+this.campaignId+'/'+this.creativeId+'/export');
				
				var params=[];
				
				if(this.startDate)
					params.push("startDate=" + this.startDate); // 尝试修改数据拼接
					
				if(this.endDate)
					params.push("endDate=" + this.endDate);
	
				if(params.length)
					url+="?"+params.join("&");
					
				return url;
			}
		},
		ready : function() {
	
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
		
				self.load();
				
			});
			
			this.loadApps();
			
			this.loadAdslots();
			
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
			//补0函数
			rpad:function(v){
			
				return v < 10 ? "0"+v : v;
			},
			//格式化日期
			formatDate:function(date){
				
				return date.getFullYear()+"-"+this.rpad(date.getMonth()+1)+"-"+this.rpad(date.getDate());
			},
			//加载所有的应用下拉数据
			loadApps:function(){
						
				this.campaigns=[this.wait];
		
				this.mask();
				
				this.$http.get('/v1/adv/names/campaigns').then(function(res){
					
					this.unmask();
					
					var data=res.data;
					
					if(data.ret!=1)
						return;
					
					var result=[this.anyCampaign].concat(data.result);
		
					this.campaigns=result;
					
				},function(){this.unmask();});
				
			},
			//加载所有的应用广告下拉数据
			loadAdslots:function(){
				
				if(this.campaignId=="-1"){
	 				
					this.creatives=[this.empty];
	 				
	 				this.creativeId="-1";
				
	 				this.list=[];
	 				
	 				this.pageNum=1;
	 				
	 				this.total=0;
	 			
		 			return;
	 			}
	 		
				this.mask();
				
				var resource = this.$resource('/v1/adv/names/campaigns/{campaignId}/creatives');
			
				resource.get({campaignId:this.campaignId}).then(function(res){
					
					this.unmask();
					
					var data=res.data;
					
					if(data.ret!=1)
						return;
					
					var result=[this.anyCreative].concat(data.result);
				
					this.creatives=result;
					
					this.creativeId="-1";
			
					this.list=[];
					
					this.pageNum=1;
	 				
	 				this.total=0;
				
				},function(){this.unmask();});
				
			},
			//加载分页数据
			pageTo:function(pageNum){
			
				this.mask();
			
				var params = {
	 				startDate:this.startDate,
	 				endDate:this.endDate,
	 				campaignId:this.campaignId,
					creativeId:this.creativeId,
					pageSize:this.pageSize,
					pageNum:pageNum || this.pageNum
	 			};
				
				var resource = this.$resource('/v1/adv/stats/creativeOfDay/{campaignId}/{creativeId}/{pageNum}/{pageSize}');
				
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
					
					this.total=result.total;
					
					this.list=result.list;
					
				},function(){this.unmask();});
				
			},
			//加载所有
			load:function(){
	 	
	 			if(this.campaignId=="-1" || this.creativeId=="-1"){
	 	
	 				this.list=[];
	 				
	 				this.pageNum=1;
	 				
	 				this.total=0;
	 			
		 			return;
	 			}
	 			 
				this.mask();
				
	 			var params = {
	 				startDate:this.startDate,
	 				endDate:this.endDate,
	 				campaignId:this.campaignId,
					creativeId:this.creativeId
	 			};
	
				this.$http.get('/v1/adv/stats/creativeOfDay/{campaignId}/{creativeId}',params).then(function(res){
				
					this.unmask();
					
					var data=res.data;
					
					if(data.ret!=1){
					
					}
					
					this.drawChart(data.result);
					
				},function(){this.unmask();});
				
				this.pageTo();
				
			},
			drawChart:function(result){
			
				var myChart = echarts.init(document.getElementById('chart'));
			
				var option = {
				    tooltip : {
				        trigger: 'axis',
				        axisPointer:{
				            show: true,
				            type : 'cross',
				            lineStyle: {
				                type : 'dashed',
				                width : 1
				            }
				        }
				    },
				    legend: {
				    	top:"bottom",
				        data:['请求数','展现数','点击数','点击率','千次展现成本']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: false},
				            dataView : {show: false, readOnly: false},
				            magicType : {show: false, type: ['line', 'bar']},
				            restore : {show: false},
				            saveAsImage : {show: false}
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            data : result.axisX,
				            splitLine: {
				                lineStyle: {
				                    type: 'dashed'
				                }

            				}
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            splitLine: {
				                lineStyle: {
				                    type: 'dashed'
				                }

            				}
				        }
				    ],
				    series : [
				        {
				            name:'请求数',
				            type:'line',
				            data:result.numOfAdReq,
				            lineStyle:{normal:{width:1}},
				          	symbolSize:function(){return 10;}
				        },
				        {
				            name:'展现数',
				            type:'line',
				            data:result.numOfAdImpressions,
				            lineStyle:{normal:{width:1}},
				          	symbolSize:function(){return 10;}
				        },
				        {
				            name:'点击数',
				            type:'line',
				            data:result.numOfAdClicks,
				            lineStyle:{normal:{width:1}},
				          	symbolSize:function(){return 10;}
				        },
				        {
				            name:'点击率',
				            type:'line',
				            data:result.ctr,
				            lineStyle:{normal:{width:1}},
				          	symbolSize:function(){return 10;}
				        },
				        {
				            name:'千次展现成本',
				            type:'line',
				            data:result.cpm,
				            lineStyle:{normal:{width:1}},
				          	symbolSize:function(){return 10;}
				        }
				    ]
				};
				
				// 使用刚指定的配置项和数据显示图表。
        		myChart.setOption(option);
        
			}
		}
	};
</script>

<style lang="less">
	
	.adv-data-index{
		padding:15px 28px 30px 28px;
		background-color: white;
	}
	
	.adv-data-index .crumbs-title{
		margin-bottom: 0;
	    margin-top: 9px;
	}
	
	.adv-data-index .search-empty{
		text-align:center;
		padding:200px 0;
		border:1px solid #ddd;
		border-top:none 0;
		margin-bottom:20px;
	}

	.adv-data-index .search-bar{
		width:80%;
	}
	
	.adv-data-index .search-bar .form-group{
		margin: 0 0 0 15px;
    	width: 30%;
	}

	.adv-data-index .chart-bar{
		margin-top: 20px;
		height:400px;
		border: 1px solid #ddd;
	}
	
	.adv-data-index .chart-empty{
		padding-top:150px;
		text-align:center;
	}
	
	.adv-data-index .chart-cnt{
		height:100%;
	}
	
	.adv-data-index .table{
		margin-top:30px;
	}
	
	.adv-data-index .pager-box{
		position:relative;
	}
	
	.adv-data-index .pagination-summary{
		margin-right:30px;
		float:right !important;
	}
	
	.adv-data-index .btn-export{
		position:absolute;
		top: 0;
	}
</style>