<template>
	<div class="header">
		<div class="header-top base-bgc">
			<!-- 左侧菜单 -->
			<div class="search-menu" @click="toggleSlide">
				<i class="el-icon-menu icon-base-color"></i>
			</div>
			<div class="search-input">
				<el-input v-model="input" placeholder="搜索你感兴趣内容"></el-input>
			</div>
			<div class="search-button">
				<i class="el-icon-search icon-base-color" @click="todo"></i>
			</div>
		</div>
		<div class="slide-over" v-show="!isSlideVis" @click.stop.prevent="toggleSlide"></div>
		<div class="slide-container clearfix" :class="{'slideHide':isSlideVis}">
			<el-row class="tac">
			  <el-col :span="24">
			    <h5 class="user-logo">
			    	<img src="../../images/user-logo.jpg" alt="用户头像">
					嘟嘟
			    </h5>
			    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
			      	<el-menu-item index="1"><i class="el-icon-menu"></i>首页</el-menu-item>
			      	<el-menu-item index="2"><i class="el-icon-plus"></i>发表</el-menu-item>
			      	<el-menu-item index="3"><i class="el-icon-message"></i>消息</el-menu-item>
			      	<el-menu-item index="4"><i class="el-icon-setting"></i>我的</el-menu-item>
			    </el-menu>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				input:'',
				isSlideVis:true
			}
		},
		methods:{
			toggleSlide() {
				this.isSlideVis = !this.isSlideVis
			},
			todo() {
				this.input = ''
			},
			handleOpen(key, keyPath) {
		        console.log(key, keyPath);
		    },
		    handleClose(key, keyPath) {
		        console.log(key, keyPath);
		    }
		}
	}
</script>
<style lang="less">
	.header{
		overflow: hidden;
		.header-top{
			height: 40px;
			display: flex;
			line-height: 40px;
			.search-menu{
				flex:1;
				text-align: center;
			}
			.search-input{
				flex: 7;
				text-align: center;
			}
			.search-button{
				flex: 1;
				text-align: center;
			}
		}
		.slide-container {
			width: 200px;
			height: 100%;
			background-color: #000;
			position: fixed;
			left: 0;
			top: 0;
		    overflow-y: auto;
		    z-index:14;
		}
		.slideHide {
			transform:translateX(-320px)
		}
		.slide-over{
			width:100%;
			background-color: #000;
			opacity: .3;
			position: fixed;
			top:0;
			right:0;
		    z-index:13;
			height:100%;
		}
		.user-logo {
			width:100px;
			margin:10px auto;
			color:#fff;
			text-align:center;
			img{
				width:100px;
				border-radius:50%;
			}
		}
	}
</style>