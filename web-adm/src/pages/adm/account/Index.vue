<template>

	<div class='g-sub-body pull-left'>
		<div class='g-sub-container clearfix'>
			<router-view></router-view>
		</div>
	</div>

	<sub-menu :text.once="text" :items.once="menuItems"></sub-menu>
	
</template>	

<script>
	
	import SubMenu from '../../../components/SubMenu.vue';
	
	module.exports = {
		components:{
            'sub-menu':SubMenu,
		},
		data:function(){

			return {
				text:"账户管理",
				menuItems:[
					{text:"开发者账号",path:"/adm/account/dev"},
					{text:"广告主账号",path:"/adm/account/adv"},
					{text:"管理员账号",path:"/adm/account/index"}
				]
			};
		}
    };

</script>

<style>

	.g-sub-body{
		width:100%;
	}
	
	.g-sub-container{
		margin-left:160px;
		background:white;
	}
	
	.g-sub-menu{
		bottom: 0;
	    left: 160px;
	    position: fixed;
	    top: 50px;
	    width: 160px;
	}
		
</style>