<template>
	<el-carousel :interval="5000" arrow="always">
	    <el-carousel-item>
	    	<img src="./../../images/banner1.jpg" alt="">
	    </el-carousel-item>
	    <el-carousel-item>
	    	<img src="./../../images/banner2.jpg" alt="">
	    </el-carousel-item>
	    <el-carousel-item>
	    	<img src="./../../images/banner3.jpg" alt="">
	    </el-carousel-item>
	    <el-carousel-item>
	    	<img src="./../../images/banner4.jpg" alt="">
	    </el-carousel-item>
	</el-carousel>
</template>
<script>
	export default {
		
	}
</script>
<style lang="less">
	.el-carousel__container {
		height:147px;
		overflow: hidden;
	}
	.el-carousel__item h3 {
	    color: #475669;
	    font-size: 18px;
	    opacity: 0.75;
	    overflow: hidden;
	    margin: 0;
	}
	.el-carousel__item:nth-child(2n) {
	    background-color: #99a9bf;
	}
	.el-carousel__item:nth-child(2n+1) {
	    background-color: #d3dce6;
	}
</style>