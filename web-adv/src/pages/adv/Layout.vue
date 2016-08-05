<template>
	<div @click="onDocClick($event)">
		<l-top></l-top>
	
		<div id="g_page" class="g-page">
			<l-header></l-header>	
			<l-nav></l-nav>
			
			<div id="g_main" class="g-main clearfix">
				<div id="g_body" class='g-body pull-left'>
					<div class='g-container clearfix'>
						<router-view></router-view>
						<div class="copyright">上海卓悠网络科技有限公司 沪ICP备14018373号-5</div>
					</div>
				</div>
				<l-menu></l-menu>
			</div>
			<l-footer></l-footer>
		</div>
	</div>
</template>

<script>
	
	import Top from '../../components/Top.vue';
	import Nav from '../../components/Nav.vue';
	import Menu from '../../components/Menu.vue';
	import Header from '../../components/Header.vue';
	import Footer from '../../components/Footer.vue';
	
    module.exports = {
        components: {
            'l-top':Top,
            'l-nav':Nav,
            'l-menu':Menu,
            'l-header':Header,
            'l-footer':Footer
        },
        methods:{
        	onDocClick:function(e){
        		var topMenuItem=document.querySelector(".g-top .menu-item-click");
        		if(!topMenuItem || topMenuItem==e.target)
        			return;
        		
        		topMenuItem.className=topMenuItem.className.replace(/menu-item-click/,'').trim();
        	}
        }
    };
    
</script>

<style>

	html,body{
		overflow:hidden;
		height:100%;
	}

	body{
		font-size: 12px;
		font-family:"Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,"Microsoft YaHei";
	}

	.g-main{
		background-color:white;
		left: 0;
	    position: absolute;
	    right: 0;
	    top: 50px;
	    bottom:0;
	}

	.g-body{
	    position: absolute;
	    right: 0;
	    top: 0;
		left:160px;
		bottom:0;
		overflow: auto;
	}
	
	.g-body .g-container{
		height:100%;
	}

	.crumbs-title{
		border-left: 2px solid #88b7e0;
		text-indent: 8px;
		font-size:14px;
		font-weight:500;
		color:#333;
	}
	
	.form-title{
		font-weight: normal;
	}
	
	.form-control{
		font-size:12px;
	}
	
	.copyright{
		width: 100%;
		text-align: center;
		margin: 10px 0;
	}
</style>
