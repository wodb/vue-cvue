<template>
	<div class="login" v-loading.fullscreen.lock="fullscreenLoading">
		<baseHead headerText="登陆"/>		
		<div class="login-detail">
			<div class="login1">
				<el-input v-model="token" placeholder="Access Token"></el-input>
				<button type="button" @click="submitToken">确定</button>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState,mapActions} from 'vuex'
	import baseHead from '@src/Components/Common/Common'
	import {$Post} from "@src/config/index"
	export default {
		data() {
			return {
			    fullscreenLoading:false,
                token:''
			}
		},
		components:{
			baseHead
		},
		computed:{
		},
		methods:{
			submitToken() {
				if (!this.token) { 
					return this.$message({
          				message: '警告哦，TOKEN？',
          				type: 'warning'
        			})
				}
                $Post('accesstoken',{accesstoken:this.token})
				.then(res => {
					if (res.error) return
					res.token = this.token
					localStorage.setItem('userinfo',JSON.stringify(res))
					this.$store.commit('setuserInfo',res)
					this.$router.back()
				})
			}
		}
	}
</script>
<style lang="less">
	.login {
		overflow: hidden;
		.login-detail{
			color: #000;
			.login1 {
				margin-top:20px;
				padding:0 10px;
				>input{
					border-color:#20a0ff;
					box-sizing:border-box;
					color:#1f2d3d;
					display:inline-block;
					width:100%;
					border-radius:4px;
					border:1px solid #bfcbd9;
					height:36px;
					line-height:1;
					padding:3px 10px;
				}
				>button{
					color: #fff;
				    background-color: #50bfff;
				    border-color: #50bfff;
				    display: inline-block;
				    line-height: 1;
				    white-space: nowrap;
				    cursor: pointer;
				    border: 1px solid #bfcbd9;
				    text-align: center;
				    box-sizing: border-box;
				    outline: none;
				    padding: 10px 15px;
				    font-size: 14px;
				    border-radius: 4px;
					width:100%;
					margin:20px auto;
				}
			}
		}
	}
</style>