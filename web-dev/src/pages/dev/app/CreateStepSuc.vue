<template>
	<div class="dev-app-create-suc">
	
		<a v-link="{path:'/dev/app/index'}" class="btn btn-primary btn-common">返回</a>
		
		<ul class="dev-app-succ-steps">
			<li class="step step-one">新增应用
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
			<li class="step step-two">创建广告位
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
			<li class="step step-three">下载SDK
				<i class="triangle-right-bg"></i>
				<i class="triangle-right"></i>
			</li>
			<li class="step step-four">完成
			</li>
		</ul>
		
		<div class="dev-app-succ-result">
			<p>恭喜您，操作成功<a v-link="{path:'/dev/app/index'}" class="return-back">返回</a></p>
		</div>

	</div>
</template>	

<script>
	module.exports = {
		data:function(){

			return {
				appId:this.$route.query.appId,
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
			
			}
		}
	}
	
</script>

<style>
	.dev-app-create-suc{
		padding:15px 28px 0;
		background-color: white;
		height:100%;
	}

	/*进度条部分*/
	.dev-app-succ-steps{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-top:20px;
		margin-bottom: 0;
	}

	.dev-app-create-suc .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
		background: #09c;
		color: #fff;
	}

	.dev-app-create-suc .step-one,.dev-app-create-suc .step-two,.dev-app-create-suc .step-three{
		width: 25%;
	}

	.dev-app-create-suc .step-four{
		width: 25%;
	}

	.dev-app-succ-steps .triangle-right {
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

	.dev-app-succ-steps .triangle-right-bg {
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

	.dev-app-succ-result{
		padding: 30px 0 0 20px;
		background: #fff;
		height: 300px;
		margin-bottom: 200px;
	}

	.dev-app-succ-result .return-back{
		margin-left:10px;
	}

</style>