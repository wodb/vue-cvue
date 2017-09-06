import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../Components/index/index'
import Article from '../Components/Article/Article'

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
    {path:'/',component:Index},
    {path:'/article/:id',component:Article}
]

const router = new VueRouter({
    routes, //这里叫routes
    /*scrollBehavior(to,from,savedPosition) {
    	console.log(to,from,savedPosition) //只有在html5history模式下生效
    }*/
})
router.beforeEach((to,from,next) => {
	next()
})

export default router