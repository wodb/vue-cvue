<template>
	<div class="my">
		<baseHead headerText="我的"/>
		<div class="my-content" v-loading.body="fullscreenLoading">
			<ul class="my-info" v-cloak>
				<li>
					<img :src="myInfo.avatar_url" alt="myInfo.loginname">
				</li>
				<li><h3 v-text="myInfo.loginname"></h3></li>
				<li>
					github:
					<a :href="'https://github.com/' + myInfo.githubUsername" target="_blank">
						{{myInfo.githubUsername}}
					</a>
				</li>
				<li>创建时间:{{myInfo.create_at|formatDate}}</li>
				<li>积分:{{myInfo.score}}</li>
			</ul>
			<el-row>
			  <el-col>
			    <el-card :body-style="{ padding: '0px' }">
			      <img src="/dist/static/images/hamburg.png" class="image">
			      <div style="padding: 14px;">
			        <span>好吃的汉堡</span>
			        <div class="bottom clearfix">
			          <time class="time">{{ currentDate }}</time>
			          <el-button type="text" class="button">操作按钮</el-button>
			        </div>
			      </div>
			    </el-card>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	import {mapState,mapActions} from 'vuex'

	import baseHead from '@src/Components/Common/Common'
	export default {
		components:{
			baseHead
		},
		data:function () {
			return {
				myInfo:{},
				fullscreenLoading:true,
				currentDate:new Date()
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods:{
			...mapActions(['getInfo'])
		},
		created:function () {
			this.getInfo(`user/${this.userInfo.loginname}`)
			.then(res => {
				this.myInfo = res.data
				this.fullscreenLoading = false
			})
		}
	}
</script>
<style lang="less" scoped>
	.my-info{
		padding:0 10px;
		margin-bottom:10px;
		li{
			margin-top:10px;
			text-align:center;
			img{
				width:90px;
				height:90px;
				border-radius:50%;
			}
		}
	}
	[v-cloak] {
	   	display: none;
	}
	.time {
	    font-size: 13px;
	    color: #999;
	}
  
  	.bottom {
    	margin-top: 13px;
    	line-height: 12px;
  	}

  	.button {
   		padding: 0;
    	float: right;
  	}

  	.image {
    	width: 100%;
    	display: block;
  	}

  	.clearfix:before,
  	.clearfix:after {
      	display: table;
      	content: "";
  	}
  
  	.clearfix:after {
  	    clear: both
  	}

</style>