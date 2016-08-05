<template>
	<div class="adm-dev-data">
		
		<div class="search-bar clearfix">
			
			<div class="crumbs pull-left">
				<h4 class="pull-left crumbs-title">数据管理</h4>
			</div>

			<div class="form-group pull-right">
				<input id="date_range" type="text" v-model="dateRange" class="form-control" read-only="readOnly" placeholder="请选择日期">
    		</div>
			<!-- 广告位下拉 -->
			<div class="form-group pull-right">
				<select class="form-control" v-model="adslotId" @change="load">
					<option v-for="adv in adslots" value="{{adv.id}}">{{adv.text}}</option>
				</select>
			</div>
			<!-- 应用下拉 -->
			<div class="form-group pull-right">
				<select class="form-control" v-model="appId" @change="loadAdslots">
					<option v-for="app in apps" value="{{app.id}}">{{app.text}}</option>
				</select>
			</div>
			<!-- 开发者下拉 -->
			<div class="form-group pull-right">
				<select class="form-control" v-model="devId" @change="loadApps">
					<option v-for="dev in devs" value="{{dev.id}}">{{dev.text}}</option>
				</select>
			</div>
		</div>
		
		<div class="chart-bar">
		
			<div v-show="devId!='-1'" id="chart" class="chart-cnt"></div>
		
			<div v-show="devId=='-1'" class="chart-empty">抱歉，暂无数据！</div>
			
		</div>
		
		<table class="table table-bordered table-striped table-hover table-condensed">
			<thead>
			  <tr>
				<th class="text-center">日期</th>
				<th class="text-right">请求数（次）</th>
				<th class="text-right">展现数（次）</th>
				<th class="text-right">点击数（次）</th>
				<th class="text-right">点击收入（￥）</th>
				<th class="text-right">千次展现收入（￥）</th>
			  </tr>
			</thead>
			<tbody>
			  <tr v-if="results.length > 0" v-for="(index,result) in results" class="row-data row-{{index%2==0 ? 'old' : 'even'}}">
				<td>{{result.date | date}}</td>
				<td class="text-right">{{result.numOfAdReq | amount 0}}</td>
				<td class="text-right">{{result.numOfAdImpressions | amount 0}}</td>
				<td class="text-right">{{result.numOfAdClicks | amount 0}}</td>
				<td class="text-right">{{result.ctr | currency '￥'}}</td>
				<td class="text-right">{{result.cpm | currency '￥'}}</td>
			  </tr>
			</tbody>
		</table>

		<div class="pager-box">
		
			<pager :page-size.sync="pageSize" :page-no.sync="pageNum" :total-records.sync="total"></pager>
		
			<a v-if="results.length > 0" href={{exportURL}} target="_blank" class="btn btn-primary btn-common btn-export">导出Excel</a>
		
		</div>
		
		<div v-if="results.length == 0" class="search-empty">抱歉，暂无数据！</div>
				
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
		  	anyApp:{id:"-1",text:"请选择应用名称"},
		  	anyAdslot:{id:"-1",text:"请选择广告位名称"},
		  	anyDev:{id:'-1',text:'请选择开发者名称'},
		  	empty:{id:"-1",text:"暂无数据"},
		  	wait:{id:"-1",text:"加载中,请稍后..."},
		  	apps:[{id:"-1",text:"暂无数据"}],
		  	adslots:[{id:"-1",text:"暂无数据"}],
		  	devs:[{id:"-1",text:"暂无数据"}],
		  	adslotId:"-1",
		  	appId:"-1",
		  	devId:"-1",
		  	///////////////////////表格相关
			pageNum:1,
			pageSize:10,
			total:-1,
			results:[],
			////////////////////图表相关
			charts:[],
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
				
				var url=ApiUtil.url('/v1/adm/dev/stats/adSlotOfDay/'+this.appId+'/'+this.adslotId+'/export');
				
				var params=[];
				
				if(this.startDate)
					params.push("startDate="+this.startDate);
					
				if(this.endDate)
					params.push("endDate="+this.endDate);
	
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
				console.info(this.startDate);
				
			});
			
			this.loadDevs();
		},
		beforeDestory:function(){
	
			this.unmask();
	
		},
		events:{
			//注册翻页事件
			page:function(){
			
				this.page();
			
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
			//加载所有的开发者名称
			loadDevs:function(){
						
				this.devs=[this.wait];
		
				this.mask();
				
				this.$http.get('/v1/adm/names/devs').then(function(res){
					
					this.unmask();
					
					var data=res.data;
					
					if(data.ret!=1)
						return;
					
					var result=[this.anyDev].concat(data.result);
		
					this.devs=result;
					
				},function(){
				
					this.unmask();
					
				});
				
			},
			//加载所有的应用
			loadApps:function(){
						
				this.apps=[this.wait];
		
				this.mask();

				var params = {
					devId:this.devId
				}
				
				this.$http.get('/v1/adm/names/apps').then(function(res){
					
					this.unmask();
					
					var data=res.data;
					
					if(data.ret!=1)
						return;
					
					var result=[this.anyApp].concat(data.result);
		
					this.apps=result;
					
				},function(){
				
					this.unmask();
					
				});
				
			},
			//加载所有的应用广告下拉数据
			loadAdslots:function(){
				
				if(this.appId=="-1"){
	 				
					this.adslots=[this.empty];
	 				
	 				this.results=[];
	 				
	 				this.pageNum=1;
	 				
	 				this.total=0;
	 			
		 			return;
	 			}
	 		
				this.mask();

				var params = {
					devId:this.devId,
					appId:this.appId
				}
				
				var resource = this.$resource('/v1/adm/names/apps/{appId}/adslots');
			
				resource.get(params).then(function(res){
					
					this.unmask();
					
					var data=res.data;
					
					if(data.ret!=1)
						return;
					
					var result=[this.anyAdslot].concat(data.result);
				
					this.adslots=result;
					
					this.chrats=[];
							
					this.results=[];
					
					this.pageNum=1;
	 				
	 				this.total=0;
				
				},function(){
				
					this.unmask();
					
				});
				
			},
			//加载分页数据
			page:function(params){
				
				this.mask();
			
				params=params || {};
				
				params.startDate=moment(this.startDate).format("YYYY-MM-DD");
				params.endDate=moment(this.endDate).format("YYYY-MM-DD");
				
				params.appId=this.appId;
				params.devId=this.devId;
				
				params.pageSize=this.pageSize;
				params.pageNum=this.pageNum;
				
				var resource = this.$resource('/v1/adm/stats/dev/adslotOfDay/{pageNum}/{pageSize}');
				
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
					
					this.results=result.list;
					
				},function(){
				
					this.unmask();
					
				});
				
			},
			//加载所有
			load:function(){
				
	 			if(this.appId=="-1" || this.devId=="-1"){
	 	
	 				this.results=[];
	 				
	 				this.pageNum=1;
	 				
	 				this.total=0;
	 			
		 			return;
	 			}
	 			 
				this.mask();
				
	 			var params = params || {};
	 			
	 			params.startDate=this.startDate;
				params.endDate=this.endDate;
				
				params.appId=this.appId;
				params.adslotId=this.adslotId;
				params.devId=this.devId;

				this.$http.get('/v1/adm/stats/dev/adslotOfDay',params).then(function(res){
				
					this.unmask();
					
					var data=res.data;
					
					if(data.ret!=1){
					}
					
					var result=data.result;
					
					this.drawChart(result);
					
				},function(){
					
					this.unmask();
					
				});
				
				this.page(params);
				
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
				        data:['请求数','展现数','点击数','点击率','千次展现收入']
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
				            name:'千次展现收入',
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
	
	.adm-dev-data{
		padding:15px 28px 30px;
		background: white;
	}

	.adm-dev-data .crumbs-title{
		margin:8px 0 0;
	}
	
	.adm-dev-data .search-empty{
		text-align:center;
		padding:150px 0;
		margin-bottom:20px;
		border:1px solid #ddd;
		border-top:none 0;
	}
	
	.adm-dev-data .search-bar{
		margin-top:10px;
	}
	
	.adm-dev-data .search-bar .form-group{
		margin: 0 0 10px 15px;
    	width: 20%;
	}

	.adm-dev-data .chart-bar{
		height:400px;
		margin-top: 20px;
		border: 1px solid #ddd;
		margin-bottom: 32px;
	}
	
	.adm-dev-data .chart-empty{
		padding-top:150px;
		text-align:center;
	}
	
	.adm-dev-data .chart-cnt{
		height:100%;
	}
	
	.adm-dev-data .table{
		margin-top:30px;
	}

	.adm-dev-data .pager-box{
		position:relative;
	}

	.adm-dev-data .pagination-summary{
		margin-right:15px;
		float:right !important;
	}
	
	.adm-dev-data .btn-export{
		position:absolute;
		top: 0;
	}
	
</style>
