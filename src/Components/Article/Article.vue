<template>
	<div class="article">
		<baseHead headerText="详情"/>
		<div class="article-content">
			<h3>{{article.title}}</h3>
			<div class="markdown-body" v-html="article.content"></div>
			<h3>评论</h3>
			<div class="article-comment">
				<ul>
					<li v-for="replie in article.replies">
						<div class="comment_top">
							<div class="c_top_left">
								<img :src="replie.author.avatar_url" alt="replie.author.loginname">
								<span class="author">{{replie.author.loginname}}</span>
							</div>
							<div class="c_top_right">
								<span>{{replie.create_at|formatDate}}</span>
							</div>
						</div>
						<div class="comment_bottom" v-html="replie.content"></div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import baseHead from '@src/Components/Common/Common'
	export default {
		data() {
			return {
				isreceive:false,
				article:{}
			}
		},
		components:{
			baseHead
		},
		created() {
			this.$store.dispatch('getInfo',`topic/${this.$route.params.id}`)
			.then((res) => {
				this.isreceive = true
				this.article = res.data
			})
		}
	}
</script>
<style lang="less">
	.article-content{
		padding:10px;
		>h3 {
			text-align:center
		}
		.article-comment {
			ul>li{
				margin-top:10px;
				border-top:1px solid #ccc;
				padding-top:10px;
			}
			.comment_top {
				display:flex
			}
			.c_top_left{
				flex:2;
				>img{
					border-radius:50%;
					width:60px;
					height:60px;
					display:inline-block;
					vertical-align: middle;
				}
				>span {
					display:inline-block;
				}
			}
			.c_top_right {
				display:flex;
				justify-content:center;
				align-items:center;
			}
			.comment_bottom {
				margin-top:15px;
				text-indent:2rem;
			}
		}
	}
</style>