<template>
	<div id="g_menu" class='pull-left g-menu'>
		<div class='g-container clearfix'>
			
			<div class="menu-toggle">
			</div>
			
			<ul class="list-unstyled clearfix">
				<li v-for="item in items" class="pull-left menu-item">
					<a v-link="item">
						<span :class="item.classObj"></span>{{item.text}}
					</a>
				</li>
				
			</ul>
		</div>
	</div>			
</template>

<script>

	module.exports = {
	    name: 'Menu',
	    replace : true,
	    data : function() {
			return {};
		},
		computed : {

			items:function(){
			
				var timestamp=+(new Date());

				// {
				// 	text : "账号管理",
				// 	path : "/adm/account/dev",
				// 	icon : "home"
				// }, 
				// 拿掉此部分
			
				var menus=[{
							text : "广告主管理",
							path : "/adm/adv/campaign",
							icon : "legal"
						}, {
							text : "开发者管理",
							path : "/adm/dev/app",
							icon : "eye"
						}, {
							text : "财务管理",
							path : "/adm/finance/dev",
							icon : "gears"
						}];
				
					for(var menu of menus){
						
						menu._timestamp=timestamp++;
						
						menu.classObj={fa:true};
						
						menu.classObj['fa-'+menu.icon]=true;
					}
					
					return menus;
			}
		}
	};
	
</script>

<style lang="less">
	
	.g-menu{
		width:160px;
		position:fixed;
		top:50px;
		bottom:0;
		background-color:#293038;
	}
	
	.g-menu .menu-toggle{
		background-color:#38424F;
		height:20px;
	}
	
	.g-menu ul{
		margin:0;
	}
	
	.g-menu .menu-item{
		width:100%;
		cursor:pointer;
	}

	.g-menu a{
		display:block;
		padding: 0 20px 0 30px;
		outline:none;
		color:white;
		line-height: 40px;
		text-decoration:none;
	}
	
	.g-menu a:hover:not(.v-link-active){
		background-color:#37424f;
	}
		
	.g-menu .v-link-active{
		background-color:#0098CE;
	}
	
	.g-menu .menu-item .fa{
		font-size:14px;
		margin-right:15px;
		color:#aeb9c2;
	}
	
	.g-menu .v-link-active .fa,.g-menu a:hover .fa{
		color:white;
	}
	
</style>