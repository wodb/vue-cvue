<template>
    <div class="container">
        <headCom />
        <Carouse />
        <div class="nav">
        <ul class="nav-lists clearfix base-bgc">
            <router-link tag="li" exact :to="{name:'home',query:{tab:'all'}}">全部</router-link>
            <router-link tag="li" exact :to="{name:'home',query:{tab:'good'}}">精华</router-link>
            <router-link tag="li" exact :to="{name:'home',query:{tab:'weex'}}">weex</router-link>
            <router-link tag="li" exact :to="{name:'home',query:{tab:'share'}}">分享</router-link>
            <router-link tag="li" exact :to="{name:'home',query:{tab:'ask'}}">问答</router-link>
            <router-link tag="li" exact :to="{name:'home',query:{tab:'job'}}">招聘</router-link>
        </ul>
        <div class="nav-content">
            <ul>
                <li v-for="NavList in navLists">
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
    </div>
</template>
<script>
    import {$Get,$Post} from '@src/config/index'
    import {mapState} from 'vuex'

    import headCom from './Header'
    import Carouse from './Carouse'
    import {session,throttle} from '@src/config/index'
    export default {
        data() {
            return {
                searchKey:{
                    tab:'all',
                    page:1,
                    limit:10,
                    mdrender:'false'
                },
                dialogVisible:false,
                index:{},
                commentTextarea:'',
                topic_id:'',
                navLists:[],
                scroll:true
            }
        },
        computed:{
            ...mapState(['userInfo']),
            loading2:function () {
                return this.getNavListsCount == 0
            },
            getNavListsCount:function (state) {
                return state.navLists.length
            }
        },
        components:{
            headCom,Carouse
        },
        methods:{
            getInfo:async function () {
                let navDatas = await $Get('topics',this.searchKey)
                this.scroll = true
                if (navDatas.data) {
                    navDatas.data.forEach((topic) => {
                        if (typeof this.index[topic.id] === 'number') {
                            const topicsIndex = this.index[topic.id];
                            this.navLists[topicsIndex] = topic;
                        } else {
                            this.index[topic.id] = this.navLists.length;
                            this.navLists.push(topic);
                        }
                    })
                }
            },
            collect: async function (event,id) {
                if (!this.userInfo.success) {
                    this.$message({
                        message: '您还未登录，即将跳转登陆。',
                        type: 'warning'
                    })
                    setTimeout(() => {
                        this.$router.push('/login')
                    },500)
                    return false
                }
                let result = await $Post('topic/collect',{accesstoken:this.userInfo.token,topic_id:id})
                if (result.error) return false
                if (result.success) {
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
                $Post(`topic/${this.topic_id}/replies`,{accesstoken:this.userInfo.token,content:this.commentTextarea})
                .then(res => {
                    if (res.error) return false
                    this.$message({
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
            getScrollData() {
                if (this.scroll) {
                    let doc = document.body || document.documentElement
                    // 滚动高度
                    let scrollTop = doc.scrollTop||doc.scrollTop
                    // 总高度
                    let docuemntHei = doc.offsetHeight
                    // 首屏高度
                    let clientHeight = window.innerHeight
                    if (docuemntHei <= (scrollTop + clientHeight + 200)) {
                        this.scroll = false
                        this.searchKey.limit += 10;
                        this.getInfo()
                    }
                }
            }
        },
        mounted() {
            // 设置刷新页面保存tab
            if (this.$route.query && this.$route.query.tab) {
                this.searchKey.tab = this.$route.query.tab
            }
            if (session.getItem('searchKey')) {
                this.navLists = JSON.parse(session.getItem('navLists'))
                this.searchKey = JSON.parse(session.getItem('searchKey'))
                this.$nextTick(vm => {
                    document.body.scrollTop = Number(session.getItem('scrollTop'))
                })
            }else {
                // 加载数据
                this.getInfo()
            }
            // 添加滚动事件
            window.onscroll = throttle(this.getScrollData,300,1000)
        },
        beforeRouteLeave(to,from,next) {
            // 如果跳转到详情页面，记录数据
            if (to.name === 'article') {
                const body = document.body || document.documentElement
                // 当前滚动条位置
                session.save('scrollTop',body.scrollTop)
                // 当前页面主题数据
                session.save('navLists',this.navLists)
                // 查询参数
                session.save('searchKey',this.searchKey)
            }
            // 卸载滚动事件
            window.onscroll = null;
            next();
        },
        watch:{
            "$route":function (to,from) {
                this.searchKey.tab = to.query.tab
                // 加载数据
                this.navLists = []
                this.index = {}
                this.searchKey.limit = 10
                this.getInfo()
            }
        },
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