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
			
				text:"财务管理",
				menuItems:[
					{text:"开发者财务信息",path:"/adm/finance/dev"},
					{text:"开发者提现",path:"/adm/finance/withdraws"},
					{text:"广告主财务信息",path:"/adm/finance/adv"},
					{text:"广告主充值",path:"/adm/finance/recharges"}
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