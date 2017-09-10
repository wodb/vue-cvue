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
					<router-link v-if="userInfo.success" to="/me">
					    <h5 class="user-logo">
					    	<img :src="userInfo.avatar_url" alt="用户头像">
							{{userInfo.loginname}}
					    </h5>
					</router-link>
					<router-link v-else to="/login">
						<h5 class="user-logo">
					    	<img :src="require('@static/images/user-logo.jpg')" alt="用户头像">
							点此登陆
					    </h5>
					</router-link>
				    <el-menu default-active="1" class="el-menu-vertical-demo">
				      	<el-menu-item index="1"><i class="el-icon-menu"></i><router-link to="/" tag="span">首页</router-link></el-menu-item>
				      	<el-menu-item index="2"><i class="el-icon-plus"></i>发表</el-menu-item>
				      	<el-menu-item index="3"><i class="el-icon-message"></i>消息</el-menu-item>
				      	<el-menu-item index="4"><i class="el-icon-setting"></i><router-link to="/me" tag="span">我的</router-link></el-menu-item>
				    </el-menu>
			  	</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	import {mapState} from 'vuex'
	export default {
		data(){
			return {
				input:'',
				isSlideVis:true
			}
		},
		computed:{
			...mapState(["userInfo"])
		},
		methods:{
			toggleSlide() {
				this.isSlideVis = !this.isSlideVis
			},
			todo() {
				this.input = ''
			}
		}
	}
</script>