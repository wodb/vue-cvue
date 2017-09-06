<template>
	<div class="header">
		<div class="header-top base-bgc">
			<!-- 左侧菜单 -->
			<div class="search-menu">
				<i class="el-icon-arrow-left icon-base-color" @click="$router.back()"></i>
			</div>
			<div class="search-input white-color">
				{{headerText}}
			</div>
			<div class="search-menu">
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props:{
		headerText:{
			required:true
		}
	}
}	
</script>
<style lang="less">
	.white-color{
		color:white
	}
</style>
