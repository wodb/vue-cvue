<template>
	<div class="create bg-purple">
		<baseHead headerText="发表" />
		<el-row>
		  	<el-col :span="24">
		  		<div class="grid-content">
		  			<div class="create-select">
		  				<ul>
		  					<li>
		  						<span>主题类型：</span>
		  						<el-select v-model="value" placeholder="请选择">
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
		  					</li>
							<li>
								<span>主题名称：</span>
								<el-input type="input" v-model="title" placeholder="请输入内容"></el-input>
							</li>
		  					<li>
		  						<span>内容信息：</span>
		  						<el-input type="textarea" placeholder="请输入内容" v-model="textarea" />
		  					</li>
		  					<li>
				  				<el-button type="warning" @click="$router.back()">取消</el-button>
		    					<el-button type="success" @click="createEvent">创建</el-button>
		  					</li>
		  				</ul>
		  			</div>
		  		</div>
		  </el-col>
		</el-row>
	</div>
</template>
<style lang="less">
	.el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	}
	.el-col {
	    border-radius: 4px;
	}
	.bg-purple {
    	background: #d3dce6;
    	width:100%;
    	height:100%;
    	position: fixed;
  	}
  	.grid-content {
    	text-align: center;
    	overflow: hidden;
    	padding-bottom:15px;
    	li{
    		margin-top:15px;
    	}
  		.el-textarea,.el-input{
  			width: 217px;
  		}
  	}
</style>
<script>
	import {mapState} from 'vuex'
	import {$Post} from '@src/config/index'
	import baseHead from '@src/Components/Common/Common'
	export default {
		data() {
	      	return {
	        	options: [{
	          		value: 'ask',
	          		label: '问答'
	        	}, {
	          		value: 'share',
	          		label: '分享'
	        	}, {
	          		value: 'job',
	          		label: '招聘'
	        	}],
	        	value: '',
	        	textarea: '',
                title:''
	      	}
	    },
	    computed:mapState(['userInfo']),
		components:{
			baseHead
		},
		methods:{
			createEvent:async function () {
				let result = await $Post('topics',
					{
					    accesstoken:this.userInfo.token,
                        tab:this.value,
                        title:this.title,
                        content:this.textarea
                    })
				if (result.error) {
				    return false
				}
				if (result.success) {
				    this.$message({
                        type:'success',
                        message:'创建成功'
					})
					this.$router.push({path:'/'})
				}else {
                    this.$message({
                        type:'error',
                        message:'创建失败'
                    })
				}
            }
		}
	}
</script>