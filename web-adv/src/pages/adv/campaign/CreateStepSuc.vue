<template>
	<div class="adv-campaing-create-suc">
	
		<a v-link="{path:'/adv/campaign/index'}"  class="btn btn-primary btn-common">返回</a>
		
		<ul class="adv-campaing-succ-steps">
			<li class="step step-one">创建广告计划
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
		
		<div class="adv-campaing-succ-result">

			<div class="success-info">
				<span class="glyphicon glyphicon-ok-sign success-icon" aria-hidden="true"></span>
				<h4>恭喜您，操作成功</h4>
			</div>

			<div class="btn-group">
				<a v-link="{path:'/adv/campaign/index'}" class="btn btn-save save" @click="save">提交审核</a>
				<a href="javascript:history.go(-1)" class="btn btn-cancel return-back">返回</a>
			</div>
		</div>

	</div>
</template>	

<script>
	module.exports = {
		data:function(){
			return {
				campaignId:this.$route.query.campaignId,
			};
		},
		ready:function(){
			this.unmask();
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
			save:function(){
				this.mask();
			
				this.$http.post("/v1/adv/campaigns/"+this.campaignId+"/save",{
					campaignId:this.campaignId,
				}).then(function(res){
					var data = res.data;
					
					if(data.ret != 1){
						this.unmask();
						
						return $.confirm({
							title: "提示",
							content: '创意保存失败:'+data.message||'',
							confirmButton: '确定',
        					cancelButton: false
						});
					}
					
					//跳转回首页
					this.$route.router.go({
						path:'/adv/campaign/index'
					});

					this.unmask();
				},
				function(){this.unmask();});
			},
		}
	}
	
</script>

<style>
	.adv-campaing-create-suc{
		padding:15px 28px 0;
		background-color: white;
		height:100%;
	}

	/*进度条部分*/
	.adv-campaing-succ-steps{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-top:20px;
		margin-bottom: 0;
	}

	.adv-campaing-create-suc .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
		background: #09c;
		color: #fff;
	}

	.adv-campaing-create-suc .step-one,.adv-campaing-create-suc .step-two,.adv-campaing-create-suc .step-three{
		width: 25%;
	}

	.adv-campaing-create-suc .step-four{
		width: 25%;
	}

	.adv-campaing-succ-steps .triangle-right {
		border-color: transparent transparent transparent #09c;
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -42px;
		width: 0;
		z-index: 1;
	}

	.adv-campaing-succ-steps .triangle-right-bg {
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

	.adv-campaing-succ-result{
		padding: 30px 0 200px 20px;
		margin-bottom: 200px;
		background: #fff;
	}

	.adv-campaing-succ-result .return-back{
		margin-left:10px;
	}

	.adv-campaing-succ-result .save{
		margin-left:10px;
	}

	.adv-campaing-succ-result .btn-group{
		text-align: center;
		display: block;
	}

	.adv-campaing-succ-result .btn-save{
		margin-right: 20px;
	}

	.adv-campaing-succ-result .btn{
		float: none;
	}
	
	.adv-campaing-succ-result .success-info{
		text-align: center;
		padding: 30px;
	}

	.adv-campaing-succ-result .success-icon{
		font-size: 70px;
		color: #41d430;
	}

	.adv-campaing-succ-result .findpsw-content{
		border: 1px solid #c2c3c7;
		margin-bottom: 50px;
	}
</style>