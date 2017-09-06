import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './main'
import store from './sotre/index'
import router from './router/index'
import {formatDate} from './config/index'

import 'element-ui/lib/theme-default/index.css'
import './style/base.less'
// 使用elementui库跟vue.component()类似
Vue.use(ElementUI)

// 添加一个过滤日期
Vue.filter('formatDate',formatDate)

new Vue({
    el:'#app',
    router,
    store,
    template:'<App/>', // 渲染组件
    components:{App} // 增加组件
})
