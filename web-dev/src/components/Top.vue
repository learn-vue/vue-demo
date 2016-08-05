<template>
	<div id="g_top" class='g-top'>
		<div class='g-container clearfix'>
			 <h1 class="pull-left top-logo">
			 	<a class="logo">ADroi 广告平台</a>
			 </h1>
			 <ul id="g_top_menu" class="pull-right list-unstyled top-menu">
			 	<li class="pull-left menu-item" @click="toggleDropDown($event)">
			 		<!--v-link="{path:'/dev/message/index'}"-->
			 		<a href="javascript:void(0);">
			 			<span>通知</span>
			 			<i class="fa fa-angle-down"></i>
			 			<i class="fa fa-angle-up"></i>
					</a>
					<div class="animated fadeInUp drop-menu-box">
		 				<ul class="list-unstyled drop-menu">
		 					<li class="drop-menu-item">
		 						<a class="logout" href="javascript:void(0);">建设中...</a>
		 					</li>
		 				</ul>
		 			</div>
		 		</li>
			 	<li class="pull-left menu-item" @click="toggleDropDown($event)">
			 		<!--v-link="{path:'/dev/feedback/index'}"-->
			 		<a href="javascript:void(0);">
			 			<span>问题反馈</span>
			 			<i class="fa fa-angle-down"></i>
			 			<i class="fa fa-angle-up"></i>	
			 		</a>
			 		<div class="animated fadeInUp drop-menu-box">
		 				<ul class="list-unstyled drop-menu">
		 					<li class="drop-menu-item">
		 						<a class="logout" href="javascript:void(0);">建设中...</a>
		 					</li>
		 				</ul>
		 			</div>
		 		</li>
			 	<li class="pull-left menu-item" @click="toggleDropDown($event)">
			 		<a href="javascript:void(0);">
			 			<span id="g_user_name">{{userName || "游客"}}</span>
			 			<i class="fa fa-angle-down"></i>
			 			<i class="fa fa-angle-up"></i>
			 		</a>
			 		<div class="animated fadeInUp drop-menu-box">
		 				<ul class="list-unstyled drop-menu">
		 					<li class="drop-menu-item">
		 						<a class="logout" @click="logout()" href="javascript:void(0);">退出</a>
		 					</li>
		 				</ul>
		 			</div>
		 		</li>
			 </ul>
		</div>
	</div>
</template>

<script>

	import SessionUtil from './../util/session';
	
	import Config from './../config';
	
	module.exports = {
	    name: 'Pager',
	    replace : true,
		data:function(){
			return {
				userName:"",
				
			};
		},
		ready:function(){
		
			var user=SessionUtil.getUser();
		
			user ? this.userName=user.name : false;
			
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
			getMenuItemNode:function(ele){
				
				if(ele.tagName=='LI')
					return ele;
					
				return this.getMenuItemNode(ele.parentNode);
				
			},
			toggleMenuItemClickCls:function(li){
			
				var className=li.className;
				
				if(/menu-item-click/.test(className))
					className=className.replace(/menu-item-click/,'');
				else
					className=className.trim()+' menu-item-click';
					
				li.className=className;
				
			},
			toggleDropDown:function(e){
			
				e.stopPropagation();
				
				var topMenuItem=document.querySelector(".g-top .menu-item-click");
				
				if(topMenuItem)
					this.toggleMenuItemClickCls(topMenuItem);
					
				var li=this.getMenuItemNode(e.target);
			
				if(topMenuItem==li)
					return;
					
				this.toggleMenuItemClickCls(li);
	
			},
			logout:function(){
			
				this.mask();
				
				this.$http.post("/v1/logout/dev").then(function(res){

					this.unmask();
					
					var data = res.data;
					
					if(data.ret != 1)
						return $.confirm({
								title: '提示',
								content: '退出失败：'+data.message,
								confirmButton: '确定',
								cancelButton: false
							});
				
					SessionUtil.clear();
					
					this.$route.router.go({path:Config.login});
				
				},function(){
				
					this.unmask();
					
					$.confirm({
							title: '提示',
							content: '系统异常，请稍后重试或联系管理员！',
							confirmButton: '确定',
							cancelButton: false
						});
						
				});
				
				
			}
		}
   }
</script>

<style lang="less">

	.g-top .g-container{
		height:50px;
		color:white;
		padding-left:10px;
		background:#0099CC;
	}
	
	.g-top .top-logo{
		margin:0;
	}
	
	.g-top .top-menu{
		margin:0;
		font-size:14px;
		background-color:#008fbf;
	}
	
	.g-top .top-logo a{
		display: block;
	    font-size: 0;
	    height: 0;
	    margin-top: 13px;
	    margin-left: 22px;
	    overflow: hidden;
	    padding-top: 20px;
	    text-decoration: none;
	    width: 62px;
	}
	
	.g-top .menu-item{
		margin-left:1px;
	    position:relative;
	    min-width:120px;
	    text-align:center;
	}
	
	.g-top .menu-item > a{
		display: block;
	    height: 50px;
	    line-height: 50px;
		outline:none;
		cursor:pointer;
		text-decoration:none;
		color:white;
		padding:0 10px;
	    background-color:#09c;
	}

	.g-top .menu-item .fa{
		margin-left:3px;
	}
	
	.g-top .menu-item .fa-angle-up{
		display:none;
	}

	.g-top .drop-menu-box{
		display:none;
		position:absolute;
		background:white;
		width:100%;
		animation-duration:0.3s;
		z-index:10;
		box-shadow:0 1px 3px rgba(0, 0, 0, 0.1);
	}
		
	.g-top .drop-menu-item a{
		color:#333;
		display:block;
		padding:10px;
		outline:none;
		cursor:pointer;
		text-decoration:none;
	}

	.g-top .drop-menu-box .drop-menu-item:hover a{
		background-color:#f5f5f5;
	}
	
	.g-top .menu-item-click > a{
		color:#333;
		border-bottom:1px solid #eaedf1;
		background-color:white;
	}
	
	.g-top .menu-item-click .fa-angle-down{
		display:none;
	}
	
	.g-top .menu-item-click .fa-angle-up{
		display:inline-block;
	}
	
	.g-top .menu-item-click .drop-menu-box{
		display:block;
	}

	
</style>