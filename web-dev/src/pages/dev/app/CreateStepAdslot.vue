<template>
	<div class="dev-adslot-create">
		
		<a v-link="{path:'/dev/app/index'}" class="btn btn-primary btn-common">返回</a>
		
		<ul class="dev-adslot-create-steps">
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
		
		<validator name="validation">
			<form novalidate class="dev-adslot-form">
				<div v-for="result in adslots" class="form-group" track-by="_timestamp">
					<input type="hidden" v-model="result.id" />
					<label class="form-title">广告位</label>
					<input type="text" class="form-control" @blur="doBlurValidation($index)" placeholder="请输入广告位名称" v-model="result.name">
					<select class="form-control" v-model="result.type">
						<option v-for="adslotType in adslotTypes" value="{{adslotType.id}}">{{adslotType.text}}</option>
					</select>
					<a class="delete-adslot" @click="deleteAdslot($index,$event)">删除</a>
					<div id="errors_{{$index}}" class="errors">广告位名称不能为空</div>
				</div>
	
				<div class="form-group">
					<button type="button" @click="addAdslot" class="btn btn-default btn-more">+创建更多广告位</button>
				</div>
				
				<div class="btn-operation">
					<a @click="back" class="btn btn-default btn-cancel">上一步</a>
					<a href="javascript:void(0);" @click="createAdslot" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:!allowNext}">保存并继续</a>
				</div>
			</form>
		
		</validator>
		
	</div>
</template>	

<script>

	module.exports = {
		data:function(){

			return {
				allowNext:false,
				appId:this.$route.query.appId,
				adslots:[{
					name:'',
					type:'-1',
					_timestamp:-1
				}],
				adslotTypes:[{id:"-1",text:"加载中，请稍后"}]
			};

		},
		ready:function(){
		
			//加载数据字典 广告位置
			this.$http.get("/v1/dict/types/adslots").then(function(res){
			
				this.unmask();
			
				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				if(!result.length)
					return;
					
				this.adslotTypes=result;
				
				if(this.adslots[0].type=="-1")
					this.adslots[0].type=this.adslotTypes[0].id;
				
			},function(){this.unmask();});
			
			///////////////////////////////////////////////////////////////
			
			this.mask();
			
			//加载已有数据
			this.$http.get("/v1/dev/apps/{appId}/adslots",{appId:this.appId}).then(function(res){
			
				this.unmask();
			
				var data=res.data;
				
				if(data.ret!=1)
					return;
				
				var result=data.result;
				
				if(!result.length)
					return;
		
				var timestamp=+(new Date());
				
				for(var i=0,l=result.length;i<l;i++)
					result[i]._timestamp=timestamp+i;

				this.adslots=result;
				
				this.allowNext=true;
				
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
			doBlurValidation:function(index){
				
				var adslot=this.adslots[index];
				
				var showError=!adslot.name;
					
				document.getElementById("errors_"+index).style.display=showError ? "block" : "none";
					
				if(showError)
					this.allowNext=false;
				else
					this.calAllowNext();
					
			},
			calAllowNext:function(){
			
				for(var i=0,l=this.adslots.length;i<l;i++)
					if(!this.adslots[i].name){
						
						this.allowNext=false;
						
						return;
					}
		
				this.allowNext=true;
				
			},
			addAdslot:function(){

				this.adslots.push({
					name:"",
					type:this.adslotTypes[0].id,
					_timestamp:+(new Date())
				});
				
				this.allowNext=false;
				
			},
			createAdslot:function(){

				this.mask();
				
				//创建广告位
				this.$http.post("/v1/dev/apps/"+this.appId+"/adslots",{
					appId:this.appId,
					adslots:JSON.stringify(this.adslots)
				}).then(function(res){
					var data = res.data;

					if(data.ret!=1){
						this.unmask();
						return $.confirm({
								title: '提示',
								content: data.message,
								confirmButton: '确定',
								cancelButton: false
							});
					}
					
					this.$route.router.go({
						path:'/dev/app/create/sdk?appId=' + this.appId
					});
				
				},function(){this.unmask();});
				
			},
			deleteAdslot:function(index,$event){
				
				if(this.adslots.length==1)
					return $.confirm({
								title: '提示',
								content: '请至少保留一个广告位数据！',
								confirmButton: '确定',
								cancelButton: false
							});
						
				// 删除一个广告位
				this.adslots.splice(index, 1);
			
				if(this.allowNext==false)
					this.calAllowNext();
					
			},
			back:function(){

				//回到上一步
				this.$route.router.go({
					path:'/dev/app/create?appId=' + this.appId
				});
			
			}
		}
	};

</script>

<style>
	.dev-adslot-create{
		padding:15px 28px 0;
		background-color: white;
		height:100%;
	}

	/*进度条部分*/
	.dev-adslot-create .dev-adslot-create-steps{
		text-align: center;
		padding-left: 0;
		height: 42px;
		margin-top:20px;
		margin-bottom: 0;
	}

	.dev-adslot-create .step{
		float: left;
		height: 42px;
		line-height: 42px;
		list-style: none;
		position: relative;
	}

	.dev-adslot-create .step-one{
		width: 25%;
		background: #09c;
		color: #fff;
	}
	
	.dev-adslot-create .step-two{
		width: 25%;
		background: #09c;
		color: #fff;
	}

	.dev-adslot-create .step-three{
		width: 25%;
		background: #cccfd3;
		color: #fff;
	}

	.dev-adslot-create .step-four{
		width: 25%;
		background: #cccfd3;
		color: #fff;
	}

	.dev-adslot-create .step-one .triangle-right,.dev-adslot-create .step-two .triangle-right{
		border-color: transparent transparent transparent #09c;
	}

	.dev-adslot-create .step-three .triangle-right{
		border-color: transparent transparent transparent #cccfd3;
	}

	.dev-adslot-create-steps .triangle-right {
		border-style: solid;
		border-width: 21px;
		display: inline-block;
		height: 0;
		position: absolute;
		right: -42px;
		width: 0;
		z-index: 1;
	}

	.dev-adslot-create-steps .triangle-right-bg {
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

	.dev-adslot-create .dev-adslot-form{
		padding: 40px 20px 30px;
		margin-bottom: 20px;
		background-color: #fff;
	}

	.dev-adslot-create .btn-more{
		margin: 20px 0 60px 125px;
	}
	
	.dev-adslot-create .btn-operation{
		border-top: 1px dashed #cacecf;
	    margin: 0 20px 40px 125px;
	    padding-top: 40px;
	}
	
	.dev-adslot-create .btn-save{
		margin-left:20px;
	}

	.dev-adslot-create .form-title{
		width: 120px;
		text-align: right;
		padding-right: 15px;
		margin-top: 5px;
		font-weight: normal;
	}

	.dev-adslot-create .form-control{
		width: 20%;
		display: inline-block;
	}

	.dev-adslot-create .delete-adslot{
		margin-left: 30px;
		cursor: pointer;
	}
	
	.dev-adslot-create .errors{
		display:none;
		margin-left:125px;
		color:red;
		margin-top:5px;
	}
</style>