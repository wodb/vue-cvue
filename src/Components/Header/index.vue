<template>
	<div class="header">
		<div class="header-top" :class="{'slideShow':isSlideVis}">
			<!-- 左侧菜单 -->
			<div class="search-menu" @click="toggleSlide">
				<i class="el-icon-menu icon-base-color"></i>
			</div>
			<div class="search-input">
				<el-input v-model="input" placeholder="搜索 歌曲/专辑/歌手"></el-input>
				1
			</div>
			<div class="search-button">
				<i class="el-icon-search icon-base-color"></i>
			</div>
		</div>
		<div class="silde-container" :class="{'slideHide':!isSlideVis}">
			<el-row class="tac">
			  <el-col :span="24">
			    <h5 class="user-logo">
			    	<img src="../../images/user-logo.jpg" alt="用户头像">
					嘟嘟
			    </h5>
			    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
			      	<el-submenu index="1">
			        	<template slot="title"><i class="el-icon-message"></i>导航一</template>
				        <el-menu-item-group>
					        <template slot="title">分组一</template>
					        <el-menu-item index="1-1">选项1</el-menu-item>
					        <el-menu-item index="1-2">选项2</el-menu-item>
				        </el-menu-item-group>
				        <el-menu-item-group title="分组2">
				          	<el-menu-item index="1-3">选项3</el-menu-item>
				        </el-menu-item-group>
				        <el-submenu index="1-4">
				          	<template slot="title">选项4</template>
				          	<el-menu-item index="1-4-1">选项1</el-menu-item>
				        </el-submenu>
			      	</el-submenu>
			      	<el-menu-item index="2"><i class="el-icon-menu"></i>github</el-menu-item>
			      	<el-menu-item index="3"><i class="el-icon-setting"></i>暂定</el-menu-item>
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
				isSlideVis:false
			}
		},
		methods:{
			toggleSlide() {
				this.isSlideVis = !this.isSlideVis
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
			background-color: #000;
			height: 40px;
			display: flex;
			line-height: 40px;
			.search-menu{
				flex:1;
				text-align: center;
			}
			.search-input{
				flex: 7;
			}
			.search-button{
				flex: 1;
				text-align: center;
			}
		}
		.silde-container{
			width: 200px;
			height: 100%;
			background-color: #000;
			position: fixed;
			left: 0;
			top: 0;
		    overflow-y: auto;
		    z-index:13;
		}
		.slideHide{
			transform: translateX(-200px);
		};
		.slideShow{
			transform: translateX(200px);
		};
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