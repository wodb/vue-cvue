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
	count:0,
	navLists:{
		data:[]
	},
	userInfo
}

let getters = {
	getNavLists:function (state) {
		return state.navLists.data
	},
	getNavListsCount:function (state) {
		return state.navLists.data.length
	}
}

let mutations = {
	navLists:function (state,datas) {
		state.navLists.data.push(...(datas.data))
	},
	setuserInfo:function (state,data) {
		state.userInfo = data
	},
}

let actions = {
	HttpNavLists:function (context,data) {
		context.commit('navLists',{data:[]})
        $Get('topics',data)
	    .then(res => {
			if (res.error) {
				return false
			}
	    	context.commit('navLists',res)
	    })
	},
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
