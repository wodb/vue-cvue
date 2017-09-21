import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

const Index = resolve => {
    require.ensure(['../Components/index/index'], () => {
        resolve(require('../Components/index/index'));
    });
}
const Create = resolve => {
    require.ensure(['../Components/Create/index'], () => {
        resolve(require('../Components/Create/index'));
    });
}
const Article = resolve => {
    require.ensure(['../Components/Article/Article'], () => {
        resolve(require('../Components/Article/Article'));
    });
}
const Login = resolve => {
    require.ensure(['../Components/Login/index'], () => {
        resolve(require('../Components/Login/index'));
    });
}
const Me = resolve => {
    require.ensure(['../Components/Me/index'], () => {
        resolve(require('../Components/Me/index'));
    });
}
// 使用router
Vue.use(VueRouter)

let routes = [
    {path: '/', name:'home', component: Index,meta:{title: 'vue-社区'}},
    {
        path: '/create', name:'create', component: Create, meta:{title: 'vue-发表'},
        beforeEnter: (to, from, next) => {
            const isLogin = Boolean(store.state.userInfo.success) // true用户已登录， false用户未登录
            if (!isLogin) {
                return next({path: '/login'})
            }
            next()
        }
    },
    {path: '/article/:id', name:'article', component: Article, meta:{title: 'vue-详情'}},
    {path: '/login', name:'login', component: Login, meta:{title: 'vue-登陆'}},
    {
        path: '/me', name:'me', component: Me, meta:{title: 'vue-我的'},
        beforeEnter: (to, from, next) => {
            const isLogin = Boolean(store.state.userInfo.success) // true用户已登录， false用户未登录
            if (!isLogin) {
                return next({path: '/login'})
            }
            next()
        }
    },
    {path: '*', redirect: '/'}
]

const router = new VueRouter({
    linkActiveClass:'active',
    routes, //这里叫routes
    /*scrollBehavior(to,from,savedPosition) {
     console.log(to,from,savedPosition) //只有在html5history模式下生效
     }*/
})
router.afterEach((to, from) => {
    document.title = to.meta.title
})

export default router