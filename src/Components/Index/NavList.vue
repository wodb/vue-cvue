<template>
	<div class="nav">
		<ul class="nav-lists clearfix base-bgc" @click="TabClick">
			<li data-name="all" :class="{'active':NavActive == 'all'}">全部</li>
			<li data-name="good" :class="{'active':NavActive == 'good'}">精华</li>
			<li data-name="weex" :class="{'active':NavActive == 'weex'}">weex</li>
			<li data-name="share" :class="{'active':NavActive == 'share'}">分享</li>
			<li data-name="ask" :class="{'active':NavActive == 'ask'}">问答</li>
			<li data-name="job" :class="{'active':NavActive == 'job'}">招聘</li>
		</ul>
		<div class="nav-content" ref="navDom">
			<ul>
				<li v-for="NavList in getNavLists">
					<div class="media-graphic">
						<div class="media-graphic-left">
							<img :src="NavList.author.avatar_url" alt="">
						</div>
						<div class="media-graphic-middle">
							<h3>{{NavList.title}}</h3>
							<b>{{NavList.create_at | formatDate}}</b>
						</div>
						<div class="media-graphic-right">
							<span>{{NavList.tab|tabName}}</span>
							<span>{{NavList.reply_count + '/' + NavList.visit_count}}</span>
						</div>
					</div>
					<div class="default-content">
						<p>
							{{NavList.content.slice(0,10)}}...
							<router-link :to="'/article/' + NavList.id">
								详情&gt;&gt;
							</router-link>
						</p>
					</div>
					<div class="more-detail">
						<span @click="collect($event,NavList.id)">收藏</span>
						<span @click="comment(NavList.id)">评论</span>
						<span @click="clickStart">点赞</span>
					</div>
				</li>
				<li v-if="loading2" v-loading="loading2" element-loading-text="拼命加载中"></li>
			</ul>
		</div>
		<el-dialog title="输入评论内容" :visible.sync="dialogVisible" size="large" :before-close="commentClose">
		 	<span>
		 		<el-input type="textarea" v-model="commentTextarea" placeholder="请输入内容"></el-input>
	 		</span>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="commentClose">取 消</el-button>
		    	<el-button type="primary" @click="commentSave">确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>
<script>
	import {$Post} from '@src/config/index'
	import {mapState,mapGetters,mapActions} from 'vuex'
	
	export default {
		data() {
			return {
				NavActive:'all',
				dialogVisible:false,
				commentTextarea:'',
                topic_id:'',
                loading3:true
			}
		},
		computed:{
			...mapGetters(['getNavLists','getNavListsCount']),
			...mapState(['userInfo']),
			loading2:function () {
				return this.getNavListsCount == 0
			}
		},
		methods:{
			...mapActions(['HttpNavLists']),
			TabClick (e) {
				this.NavActive = e.target.getAttribute('data-name')
				this.HttpNavLists({tab:this.NavActive,limit:'10',mdrender:'false'})
			},
			collect(event,id) {
				if (!this.userInfo.success) {
					this.$message({
			          	message: '您还未登录，即将跳转登陆。',
			          	type: 'warning'
			        })
			        setTimeout(() => {
			        	this.$router.push('/login')
			        },1000)
			        return false
				}
				$Post('topic/collect',{accesstoken:this.userInfo.token,topic_id:id})
				.then(res => {
				    if(!res.error) {
                        if (res.success) {
                            this.$message({
                                message:'收藏成功。',
                                type:'success'
                            })
                        }else {
                            this.$message({
                                message:'收藏失败。',
                                type:'warning'
                            })
                        }
					}
				})
			},
			comment(topic_id) {
				if (!this.userInfo.success) {
					this.$message({
			          	message: '您还未登录，即将跳转登陆。',
			          	type: 'warning'
			        })
			        setTimeout(() => {
			        	this.$router.push('/login')
			        },1000)
			        return false
				}
				// 开启评论框
				this.dialogVisible = true
				// 把id存到data中
				this.topic_id = topic_id
			},
			commentClose() {
				this.dialogVisible = !this.dialogVisible
				this.commentTextarea = ''
			},
			commentSave() {
			    console.log(`token=${this.userInfo.token},id=${this.topic_id},内容信息=${this.commentTextarea}`)
			    $Post(`topic/${this.topic_id}/replies`,{accesstoken:this.userInfo.token,content:this.commentTextarea})
			    .then(res => {
			    	if (res.error) return false
		    		this.message({
		    			type:'success',
		    			message:'评论成功'
		    		})
					this.dialogVisible = !this.dialogVisible
					this.commentTextarea = ''
			    })
			},
			clickStart() {
				this.$message({
		         	 message: '恭喜你，点赞成功',
		         	 type: 'success'
		        });
			},
			scroll() {
				console.log('我加载了')
				// 获得要移动的dom元素
				let nav = this.$refs.navDom
				window.onscroll = function (e) {
					let doc = document.body || document.documentElement
					let scrollTop = doc.scrollTop||doc.scrollTop;
					let docuemntHei = doc.scrollHeight
					let navoffsetHei = nav.offsetTop
					console.log(scrollTop+navoffsetHei,navoffsetHei,docuemntHei)
				}
			}
		},
		created(){
			this.HttpNavLists({tab:'all',limit:'10',mdrender:'false'})
		},
		mounted() {
			this.scroll()
		}
	}
</script>
<style lang="less">
	.nav-lists{
		display:flex;
		height:35px;
		&>li{
			flex:1;
			text-align:center;
			line-height:35px;
			color:#adafb2;
			&.active{
				background-color: #26282c;
				color:#dcdde3
			}
		}
	}
	.nav-content {
		margin-top: .5625rem;
		ul{
			min-height:100px;
		}
		li{
			height:117px;
			background-color: #fff;
    		margin-bottom: .5625rem;
		    box-sizing: border-box;
    		box-shadow: 0 1px 0.1875rem -0.125rem rgba(0,0,0,.2);
		    border-bottom: 1px solid #d8d8d8;
		}
		.more-detail {
			display: flex;
		}
		.more-detail span {
			flex:1;
			line-height: 25px;
			height: 25px;
			text-align: center;
			color: #929292;
		}
		.more-detail span:after{
			content: '|';
			display: inline-block;
			float: right;
		}
		.more-detail span:last-child:after {
			content: '';
			display:block;
			height:0;
			clear:both;
			visibility:hidden;
		}
		.default-content {
			padding: 0 0 10px 0;
			text-indent: 2rem;
			a{
				padding-left: 5px;
			    text-decoration: none;
			    color: #598abf;
			}
		}
		.media-graphic {
			display: flex;
		}
		.media-graphic-left {
			width: 60px;
			height: 60px;
			margin-left: 10px;
			display: inline-block;
		    padding: 5px;
		    box-sizing: border-box;
			img{
				width: 100%;
				height:100%;
				border-radius:50%;
			}
		}
		.media-graphic-middle {
			display: inline-block;
			flex: 1;
			height: 60px;
			h3 {
				color: #333;
			    font-weight: normal;
			    font-size: 16px;
			    width: 185px;
			    flex: 1;
			    overflow: hidden;
			    height: 30px;
			    line-height: 30px;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			}
			b{
				font-weight: normal;
		    	color: #929292;
			}
		}
		.media-graphic-right {
			display: inline-block;
			width: 60px;
			height: 60px;
			span{
				display: block;
				text-align: center;
				height: 30px;
				line-height: 30px;
				overflow: hidden;
    			text-overflow: ellipsis;
				&:first-child{
					color:#fd8880;
				}
			}
		}
	}
	
</style>