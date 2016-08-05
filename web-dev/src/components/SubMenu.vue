<template>
	<div class="g-sub-menu pull-left">
		<h6 class="sub-menu-title">{{text}}</h6>
		<ul class="list-unstyled clearfix">
			<li v-for="item in items" class="pull-left sub-menu-item">
				<a v-link="item">
					{{item.text}}
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	module.exports = {
	 	replace : true,
	 	props : {
			"text":{
				type:String,
				default:""
			}, 
			"items":{
				type:Array,
				default:[]
			}
		},
		components:{
		},
		data:function(){
			return {
				
			};
		}
	};
	
</script>

<style lang="less">
	
	.g-sub-menu{
		background-color:#eaedf1;
	}
	
	.g-sub-menu .sub-menu-item{
		width:100%;
	}
	
	.g-sub-menu .v-link-active{
		background-color:white;
	}
	
	.g-sub-menu .sub-menu-title{
		height: 60px;
    	line-height: 60px;
	    text-indent: 20px;
	    background-color:#d9dee4;
	    margin: 0;
	    font-weight:bold;
	}
	
	.g-sub-menu a{
		text-decoration:none;
		display:block;
		height:40px;
		line-height:40px;
		color:#333;
		text-indent:30px;
	}
	
</style>