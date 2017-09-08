import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './main'
import store from './sotre/index'
import router from './router/index'
import {formatDate} from './config/index'

import 'element-ui/lib/theme-default/index.css'
import 'github-markdown-css'
import './style/base.less'
// 使用elementui库跟vue.component()类似
Vue.use(ElementUI)

// 添加一个过滤日期
Vue.filter('formatDate',formatDate)
console.log("%c MaChuang - https://github.com/wodb","background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #00a419),color-stop(0.15, #f44336), color-stop(0.29, #ff4300),color-stop(0.3, #AA00FF),color-stop(0.4, #8BC34A), color-stop(0.45, #607D8B),color-stop(0.6, #4096EE), color-stop(0.75, #D50000),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:13px;")
new Vue({
    el:'#app',
    router,
    store,
    template:'<App/>', // 渲染组件
    components:{App} // 增加组件
})
