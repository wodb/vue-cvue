import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'

import Main from './main'

import 'element-ui/lib/theme-default/index.css'
import './style.css'
// 使用elementui库跟vue.component()类似
Vue.use(ElementUI)
// 使用router
Vue.use(VueRouter)

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

let routers = [
    {path:'/foo',component:Foo},
    {path:'/bar',component:Bar},
]

const router = new VueRouter({
    routers
})
new Vue({
    router
}).$mount('#app')
