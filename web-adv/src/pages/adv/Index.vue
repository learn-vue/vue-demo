<template>
	
	<div class="adv-overview">

		<div class="today-block">
			
			<h5 class="block-title">今日概览</h5>
			
			<div class="clearfix">
			
				<div class="col-1-3 pull-left sub-block-first">
					<div class="sub-block">
						<h5>今日展现</h5>
						<div class="spliter"></div>
						<p>{{numOfAdReq | amount 0}}</p>
					</div>
				</div>
				
				<div class="col-1-3 pull-left">
					<div class="sub-block">
						<h5>今日点击</h5>
						<div class="spliter"></div>
						<p>{{numOfAdImpressions | amount 0}}</p>
					</div>
				</div>
				
				<!-- 
				<div class="col-1-3 pull-left">
					<div class="sub-block">
						<h5>今日下载</h5>
						<div class="spliter"></div>
						<p>{{numOfAdClicks | amount 0}}</p>
					</div>
				</div> 
				-->
				
				<div class="col-1-3 pull-left sub-block-last">
					<div class="sub-block">
						<h5>今日消费</h5>
						<div class="spliter"></div>
						<p>{{chargeOfImpressions | plus chargeOfClicks | currency '￥'}}</p>
					</div>
				</div>
			
			</div>
			
		</div>
		
		<div class="day7-block">
			
			<h5 class="block-title">7日消费图表</h5>
			<div class="chart-box">
				<div id="chart" class="chart-cnt"></div>
			</div>
			
		</div>
		
	</div>
</template>

<script>

	import echarts from 'echarts';
	
    module.exports = {
        components: {
        },
    	data:function(){
    		return {
				numOfAdReq : 0,// 请求数量
				numOfAdRes : 0,// 有效请求数量
				numOfAdClicks : 0,// 点击数
				numOfAdImpressions : 0,// 展现数量
				chargeOfImpressions : 0,// 展示收入
				chargeOfClicks : 0// 点击收入
    		}
    	},
        ready:function(){
        	
        	this.mask();
        	
        	this.$http.get('/v1/adv/stats/creativeOfToday').then(function(res){
        	
        		this.unmask();
        		
        		var data=res.data;
        		
        		if(data.ret!=1)
        			return;
        		
        		var result=data.result;
        		
        		this.numOfAdReq = result.numOfAdReq;// 请求数量
				this.numOfAdRes = result.numOfAdRes;// 有效请求数量
				this.numOfAdClicks =  result.numOfAdClicks;// 点击数
				this.numOfAdImpressions =  result.numOfAdImpressions;// 展现数量
				this.chargeOfImpressions =  result.chargeOfImpressions;// 展示收入
				this.chargeOfClicks = result.chargeOfClicks;// 点击收入
	
        	},function(){this.unmask();});
        	
        	//////////////////////////////////加载7日数据/////////////////////////////////
        	
        	this.mask();
        	
        	this.$http.get('/v1/adv/stats/chargeOf7Day').then(function(res){
        	
        		this.unmask();
        		
        		var data=res.data;
        		
        		if(data.ret!=1)
        			return;
        		
        		var result=data.result;
        		
        		this.drawChart(result);
	
        	},function(){this.unmask();});
        	
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
			drawChart:function(data){
			
				var createX=function(){
				
					var x=[];
					
					var date=new Date();
					
					var rpad=function(v){
						return v < 10 ? "0"+v : v;
					}
					
					for(var i=1;i<8;i++){
						
						date.setDate(date.getDate()-1);
						
						x.push(date.getFullYear()+'-'+rpad(date.getMonth()+1)+'-'+rpad(date.getDate()));
						
					}
					
					return x.reverse();
				}
		
				var axisX=createX();

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
				    	show:false,
				    	top:15,
				        data:['收益']
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
				            data : axisX,
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
				            name:'收益',
				            type:'bar',
				            data:data,
				            barMaxWidth:30,
				            itemStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                        offset: 0,
				                        color: 'rgb(255, 158, 68)'
				                    }, {
				                        offset: 1,
				                        color: 'rgb(255, 70, 131)'
				                    }])
				                }
				            }
				        },
				        {
				            name:'收益',
				            type:'line',
				            itemStyle : { normal: {color:'#008DB5',label : {show: true}}},
				            lineStyle:{normal:{width:1}},
				          	data:data,
				          	symbolSize:function(){return 10;}
				        },
				    ]
				};
				
				// 使用刚指定的配置项和数据显示图表。
        		myChart.setOption(option);
        
			}
        }
    };
    
</script>

<style>
	
	.adv-overview{
		padding:15px 28px 0;
		margin-bottom:20px;
	}
	
	.adv-overview  .col-1-3{
		width:33.333%;
		padding:0 8px;
	}
	
	.adv-overview .block-title{
		font-weight:bold;
		margin-top:0;
		font-size: 12px;
	}
	
	.adv-overview .today-block .sub-block{
		text-align:center;
		background-color:#f5f6fa;
		padding:10px 0;
	}
	
	.adv-overview .today-block .sub-block h5{
		margin-top:0;
	}
	
	.adv-overview .today-block .sub-block-first{
		padding-left:0;
	}
	
	.adv-overview .today-block .sub-block-last{
		padding-right:0;
	}
	
	.adv-overview .today-block .block-title{
		margin-bottom:20px;
	}
	
	.adv-overview .today-block .spliter{
		margin:0 5%;
		border-top:1px solid #eaedf1;
	}

	.adv-overview .today-block p{
		font-size: 18px;
		padding-top:10px;
	}
	
	.adv-overview .day7-block{
		margin-top:30px;
	}
	
	.adv-overview .day7-block .block-title{
		margin-bottom:0;
	}
	
	.adv-overview .chart-cnt{
		height:400px;
		border: 1px solid #ddd;
	}

	.adv-overview .chart-box{
		background: #fff;
		margin-top: 20px;
	}
</style>
