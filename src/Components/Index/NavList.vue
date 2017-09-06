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
		<div class="nav-content">
			<ul v-loading="loading2" element-loading-text="拼命加载中">
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
							<span>{{tabName(NavList.tab)}}</span>
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
						<span>收藏</span>
						<span>评论</span>
						<span>点赞</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex'
	export default {
		data() {
			return {
				NavActive:'all',
			}
		},
		computed:{
			...mapGetters(['getNavLists','getNavListsCount']),
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
			tabName:function (tab) {
				switch (tab) {
					case 'all':
						return '全部'
					case 'good':
						return '精华'
					case 'weex':
						return 'weex'
					case 'share':
						return '分享'
					case 'ask':
						return '问答'
					case 'job':
						return '招聘'
				}
			}
		},
		created(){
			this.HttpNavLists({tab:'all',page:'10',limit:'10',mdrender:'false'})
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