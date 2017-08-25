import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'

import Main from './main'

import 'element-ui/lib/theme-default/index.css'
import './style.css'

Vue.use(ElementUI)


new Vue({
    el: '#app',
    render:(h) => h(Main)
})
