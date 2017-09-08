import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../Components/index/index'
import Article from '../Components/Article/Article'
import Login from '../Components/Login/index'
import Me from '../Components/Me/index'

// 使用router
Vue.use(VueRouter)

const Bar = { 
	template: '<div>bar</div>',
	beforeRouteEnter(to,from,next) {
		next()
	},
	beforeRouteUpdate(to,from,next) {
		next()
	},
	beforeRouteLeave(to,from,next) {
		next()
	} 
}
let routes = [
    {path:'/',component:Index,name:'vue-社区'},
    {path:'/article/:id',component:Article,name:'vue-详情'},
    {path:'/login',component:Login,name:'vue-登陆'},
	{path:'/me',component:Me,name:'vue-我的',
		beforeEnter: (to, from, next) => {
			const isLogin = Boolean(localStorage.getItem('userinfo')) // true用户已登录， false用户未登录
			if (!isLogin) {
        		next({ path: '/login' })
			}
			next()
      	}
	},
	{path:'*',redirect:'/'}
]

const router = new VueRouter({
    routes, //这里叫routes
    /*scrollBehavior(to,from,savedPosition) {
    	console.log(to,from,savedPosition) //只有在html5history模式下生效
    }*/
})
router.afterEach((to,from) => {
	document.title = to.name
})

export default router