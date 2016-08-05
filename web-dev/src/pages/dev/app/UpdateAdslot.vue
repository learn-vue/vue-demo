<template>
	<div class="dev-adslots-update">
		
		<div class="crumbs">
			<h4 class="crumbs-title">新增广告位</h4>
		</div>
		
		<validator name="validation" >

			<form novalidate>

				<div v-for="(itemNo,adslot) in adslots" class="form-group adslot-list">

					<input type="hidden" v-model="adslot.id" />
					
					<label class="form-title">广告位</label>
				
					<input type="text" class="form-control" @blur="doBlurValidation($index)" placeholder="请输入广告位名称" v-model="adslot.name">
					
					<select class="form-control" v-model="adslot.type">
						<option v-for="adslotType in adslotTypes" value="{{adslotType.id}}">{{adslotType.text}}</option>
					</select>
				
					<a class="delete-adslot" @click="deleteAdslot($index,$event)">删除</a>
					
					<div id="errors_{{$index}}" class="errors">广告位名称不能为空</div>
				</div>
				
				<div class="form-group">
					<button type="button" @click="addAdslot" class="btn btn-default btn-more">+新增更多广告位</button>
				</div>
				
				<div class="operation-bar">
					<a @click="update" :class="{btn:true,'btn-primary':true,'btn-save':true,disabled:!allowNext}">&nbsp;&nbsp;保&nbsp;&nbsp;存&nbsp;&nbsp;</a>
					<a href="javascript:history.go(-1)" class="btn btn-default btn-cancel">&nbsp;&nbsp;返&nbsp;&nbsp;回&nbsp;&nbsp;</a>
				</div>
				
			</form>
			
		</validator>
		
	</div>
</template>

<script>

	import File from '../../../components/File.vue';
	
	module.exports = {
		components: {
	   		'file':File
		},
		data:function(){
			return {
				allowNext:false,
				id:this.$route.query.appId,
				appTypes:[{id:-1,text:'加载中...'}],
				adslotTypes:[{id:-1,text:'加载中...'}],
				adslots:[{
					name:'',
					type:'BANNER'
				}],
			};
		},
		ready:function(){

			this.mask();
			
			//加载数据字典 广告位置
			this.$http.get("/v1/dict/types/adslots").then(function(res){
				
				this.unmask();
				
				var data=res.data;
				
				if(data.ret==1)
					this.adslotTypes=data.result;

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

				console.log(1);
			
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
					type:this.adslotTypes[0].id
				});
				
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
			update: function(){
			
				this.mask();
				
				//更新应用信息
				this.$http.post("/v1/dev/apps/"+this.id+"/adslots/add",{
					appId: this.id,
					adslots: JSON.stringify(this.adslots)
				}).then(function(res){

					this.unmask();
					
					var data = res.data;

					if(data.ret != 1)
						return $.confirm({
							title: "提示",
							content: '新增失败:'+data.message,
							confirmButton: '确定',
        					cancelButton: false
						});
					
					var self=this;
					
					$.confirm({
						title: '提示',
						content: '广告位新增成功',
						confirmButton: '确定',
						cancelButton: false,
						confirm:function(){self.$route.router.go({path:'/dev/app/index'});}
					});
					
					
				},function(){
				
					this.unmask();
				
					$.confirm({
						title: '提示',
						content: '系统异常，请稍后重试，或联系管理员！',
						confirmButton: '确定',
						cancelButton: false
					});
						
				});
			}
		}
	};
</script>

<style>
 	.dev-adslots-update{
 		padding:15px 28px 30px;
		background: white;
 	}

	.dev-adslots-update .crumbs{
		margin-bottom:20px;
	}

	.dev-adslots-update .form-title{
		width: 120px;
		text-align: right;
		padding-right: 15px;
		margin-top: 5px;
	}

	.dev-adslots-update .form-control{
		display: inline-block;
		vertical-align: top;
	}

	.dev-adslots-update .btn-more{
		margin: 30px 0 40px 125px; 
	}
	
	.dev-adslots-update .adslot-list .form-control{
		width: 20%;
	}
	
	.dev-adslots-update .delete-adslot{
		margin-left:20px;
		cursor:pointer;
	}

	.dev-adslots-update .operation-bar{
		margin:20px 0 0 125px;
	}

	.dev-adslots-update .btn-save{
		margin-right: 30px;
	}

	.dev-adslots-update .errors{
		color: red;
		margin-left: 125px;
		margin-top: 5px;
		display: none;
	}

</style>
