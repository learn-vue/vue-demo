<template>

	<div id="g_sub_body" class='g-sub-body pull-left'>
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
			
				text:"广告主管理",
				menuItems:[
					{text:"广告管理",path:"/adm/adv/campaign"},
					{text:"数据管理",path:"/adm/adv/data"}
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