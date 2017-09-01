import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'

import App from './main'

import store from './sotre/index'

import {formatDate} from './config/index'

import 'element-ui/lib/theme-default/index.css'
import './style/base.less'
// 使用elementui库跟vue.component()类似
Vue.use(ElementUI)
// 使用router
Vue.use(VueRouter)

// 添加一个过滤日期
Vue.filter('dataFilter',formatDate)

const Foo = { template: '<div>fo1o</div>' }
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
    {path:'/foo',component:Foo},
    {path:'/bar',component:Bar},
    {path:'/main',component:App,
    	children:[
	    	{path:'/abc',component:{template:'<div>abc</div>'}}
	    ]
	},
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
new Vue({
    el:'#app',
    // router,
    store,
    template:'<App/>', // 渲染组件
    components:{App} // 增加组件
})
