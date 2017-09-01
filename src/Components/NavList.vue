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
		<div class="nav-content" @click.stop.prevent="getNavLists">
			<ul>
				<li v-for="item in 4">
					<div class="media-graphic">
						<div class="media-graphic-left"></div>
						<div class="media-graphic-middle">
							<h3>xxxxxxx</h3>
							<b>2017-02-01 15:30:30</b>
						</div>
						<div class="media-graphic-right">
							<span>精华</span>
							<span>0/19</span>
						</div>
					</div>
					<div class="default-content">
						<p>xxxxxxxxxxxxxxxxxxxxx...<a href="javascript:;">详情>></a></p>
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
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				NavActive:'all'
			}
		},
		methods:{
			...mapActions(['getNavLists']),
			TabClick (e) {
				this.NavActive = e.target.getAttribute('data-name')
			}
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
		}
		.default-content a {
			padding-left: 5px;
		    text-decoration: none;
		    color: #598abf;
		}
		.media-graphic {
			display: flex;
		}
		.media-graphic-left {
			width: 60px;
			height: 60px;
			margin-left: 10px;
			display: inline-block;
		}
		.media-graphic-middle {
			display: inline-block;
			flex: 1;
			height: 60px;
		}
		.media-graphic-middle h3 {
			color: #333;
			font-weight: normal;
			font-size: 22px;
		}
		.media-graphic-middle b {
			font-weight: normal;
		    color: #929292;
		}
		.media-graphic-right {
			display: inline-block;
			width: 60px;
			height: 60px;
		}
		.media-graphic-right span {
			display: block;
			text-align: center;
			height: 30px;
			line-height: 30px;
		}
		.media-graphic-right span:first-child{
			color:#fd8880;
		}
	}
	
</style>