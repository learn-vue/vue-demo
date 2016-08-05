<template>
	<div class="adv-campaign-create">
		
		<a v-link="{path:'/adv/campaign/index'}"  class="btn btn-primary btn-common">返回</a>
		
		<ul class="adv-campaign-create-steps">
			<li class="step step-one">
				<span v-if="campaignId==undefined">创建广告计划</span>
				<span v-else>修改广告计划</span>
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
			<li class="step step-two">自定义投放定向
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
			<li class="step step-three">创建广告创意
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
			<li class="step step-four">完成
			</li>
		</ul>
		
		<validator name="validation" >
			<form class="adv-campaign-create-form" novalidate>

				<div class="form-group">
					<label class="form-title">计划名称：</label>
					<input type="text" v-validate:name="{ required: true}" class="form-control" placeholder="请填写计划名称" v-model="name"/>
					<div v-if="$validation.name.touched" class="errors">
						<div v-if="$validation.name.required">计划名称不能为空</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title">预算：</label>
					<input type="text" v-validate:budget-amount-total="{ required: true,number:true}" class="form-control" placeholder="请填写预算" v-model="budgetAmountTotal"/>
					<div v-if="$validation.budgetAmountTotal.touched" class="errors">
						<div v-if="$validation.budgetAmountTotal.required">预算不能为空</div>
						<div v-if="!$validation.budgetAmountTotal.required && $validation.budgetAmountTotal.number">请输入正确的金额</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title">每日预算：</label>
					<input type="text" v-validate:budget-amount-daily="{ required: true,number:true}" class="form-control" placeholder="请填写每日预算" v-model="budgetAmountDaily"/>
					<div v-if="$validation.budgetAmountDaily.touched" class="errors">
						<div v-if="$validation.budgetAmountDaily.required">每日预算不能为空</div>
						<div v-if="!$validation.budgetAmountDaily.required && $validation.budgetAmountDaily.number">请输入正确的金额</div>

					</div>
				</div>

				<div class="form-group">
					<label class="form-title">计费类型：</label>
					<select class="form-control" v-model="bidType">
						<option v-for="result in bidTypes" value="{{result.id}}">{{result.text}}</option>
					</select>
				</div>

				<div class="form-group">
					<label class="form-title">出价：</label>
					<input type="text" v-validate:bid-price="{ required: true,number: true}" class="form-control" placeholder="请填写出价" v-model="bidPrice"/>
					<div v-if="$validation.bidPrice.touched" class="errors">
						<div v-if="$validation.bidPrice.required">出价不能为空</div>
						<div v-if="!$validation.bidPrice.required && $validation.bidPrice.number">请输入正确的金额</div>
					</div>
				</div>

				<div class="form-group">
					<label class="form-title">投放日期：</label>
					<input id="date_range" type="text" v-model="dateRange" class="form-control" read-only="readOnly" placeholder="请选择日期">
				</div>
			
				<div class="operation-bar">
					<a href="javascript:void(0);" @click="createCampaign()" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:$validation.invalid}">保存并继续</a>
				</div>
			</form>
		</validator>
	</div>
</template>	

<script>

	module.exports = {
		data:function(){
			return {
				campaignId:this.$route.query.campaignId,
				name:"",//计划名称
				budgetAmountTotal:0,//计划预算
				budgetAmountDaily:0,//计划每日预算
				bidType:"-1",//计费类型
				bidPrice:0,//出价
				bidTypes:[{id:"-1",text:"请选择"}],
				///////////////////////日期控件
          	  	endDate: (new Date()).getTime(),
   				startDate: (new Date()).getTime()-7*24*60*60*1000
			}
		},
		components: {
	   	
		},
		computed:{
		
			dateRange:function(){
				
				var startDate=new Date(this.startDate);
				
				var endDate=new Date(this.endDate);
				
				return moment(startDate).format("YYYY-MM-DD")+" / "+moment(endDate).format("YYYY-MM-DD");
			}
		},
		ready:function(){

			var self = this;

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
			});
		
			this.mask();
			
			//加载数据字典 应用类型
			this.$http.get("/v1/dict/types/bids").then(function(res){
				
				this.unmask();

				var data=res.data;
				
				if(data.ret!=1)
					return;
					
				var result=data.result;
				
				this.bidTypes=result;
				
				if(this.bidType=="-1")
					this.bidType=result[0].id;
							
			},function(){this.unmask();});
			
			////////////////////////////////////////////////////
			
			if(!this.campaignId)
				return;
			
			this.mask();
			
			//加载数据字典 应用类型
			this.$http.get("/v1/adv/campaigns/{campaignId}",{
				campaignId:this.campaignId
			}).then(function(res){
				
				this.unmask();

				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				this.name=result.name;//计划名称
				this.budgetAmountTotal=result.budgetAmountTotal;//计划预算
				this.budgetAmountDaily=result.budgetAmountDaily;//计划每日预算
				this.bidType=result.bidType;//计费类型
				this.bidPrice=result.bidPrice;//出价
				this.endDate=result.endDate;//投放日期
   				this.startDate=result.startDate;//投放日期
							
			},function(){this.unmask();});
			
		},
		route:{
			activate: function (transition) {
			 
			  transition.next();
			  
			},
			deactivate: function (transition) {
			 
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
			createCampaign:function(){

				this.mask();
				
				var params={
					name:this.name,//计划名称
					budgetAmountTotal:this.budgetAmountTotal,//计划预算
					budgetAmountDaily:this.budgetAmountDaily,//计划每日预算
					bidType:this.bidType,//计费类型
					bidPrice:this.bidPrice,//出价
					endDate: this.endDate,//投放日期
   					startDate:this.startDate//投放日期
				};
			
				var promise=null;
			
				//更新
				if(this.campaignId)
					promise=this.$http.put("/v1/adv/campaigns/"+this.campaignId,params)
				else//新增
					promise=this.$http.post("/v1/adv/campaigns",params);
				
				promise.then(function(res){

					var data = res.data;

					if(data.ret!=1){
						
						this.unmask();
						
						return $.confirm({
							title: "提示",
							content: '保存失败!',
							confirmButton: '确定',
	       					cancelButton: false
						});
					}
					
					this.$route.router.go({
						path:'/adv/campaign/target?campaignId=' + data.result.id + '&startDate=' + this.startDate + '&endDate=' + this.endDate
					});
					
				},function(){this.unmask();});
				
			}
		}
	};

</script>

<style>

	.adv-campaign-create{
		padding:15px 28px 0;
		background-color: white;
		height:100%;
	}

	.adv-campaign-create-steps{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-top:20px;
		margin-bottom: 0;
	}

	.adv-campaign-create .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.adv-campaign-create .step-one{
		width: 25%;
		background: #09c;
		color: #fff;
	}

	.adv-campaign-create .step-two{
		width: 25%;
		background: #cccfd3;
		color:#fff;
	}

	.adv-campaign-create .step-three{
		width: 25%;
		background: #cccfd3;
		color:#fff;
	}

	.adv-campaign-create .step-four{
		width: 25%;
		background: #cccfd3;
		color:#fff;
	}

	.adv-campaign-create .step-one .triangle-right{
		border-color: transparent transparent transparent #09c;
	}

	.adv-campaign-create .step-two .triangle-right{
		border-color: transparent transparent transparent #cccfd3;
	}

	.adv-campaign-create .step-three .triangle-right{
		border-color: transparent transparent transparent #cccfd3;
	}

	.adv-campaign-create-steps .triangle-right {
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -42px;
		width: 0;
		z-index: 1;
	}

	.adv-campaign-create-steps .triangle-right-bg {
		border-color: transparent transparent transparent #fff;
		border-style: solid;
		border-width: 22px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -46px;
		top: -1px;
		width: 0;
		z-index: 1;
	}

	.adv-campaign-create-form{
		padding: 20px 10px 40px;
		background-color: #fff;
	}

	.adv-campaign-create .form-title{
		width: 150px;
		text-align: right;
		padding-right: 15px;
		margin-top: 5px;
		font-weight: normal;
	}

	.adv-campaign-create .form-control{
		width: 30%;
		display: inline-block;
	}

	.adv-campaign-create .operation-bar{
		margin:40px 0 0 155px;
	}	

	.adv-campaign-create .errors{
		color: red;
		display:inline-block;
		margin-left:10px;
	}	
</style>