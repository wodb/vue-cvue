import Vue from 'vue'
import Vuex from 'vuex'
import {$Get,$Post} from '@src/config/index'

Vue.use(Vuex)

let defaultUser = {
		avatar_url:'',
		id:'',
		success:false,
		loginname:'',
		token:'',
	}
let userInfo = (function (user = defaultUser) {
	return JSON.parse(localStorage.getItem('userinfo'))||user
})();

let state = {
	userInfo
}

let getters = {
}

let mutations = {
	setuserInfo:function (state,data) {
		state.userInfo = data
	},
}

let actions = {
	getInfo:function ({commit},url) {
		return $Get(url)
	}
}
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	strict: debug
})
