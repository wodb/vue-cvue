import Vue from 'vue'
import Vuex from 'vuex'
import {$httpGet,$httpPost} from '../config/index'

Vue.use(Vuex)

let defaultUser = {
		avatar_url:'',
		id:'',
		success:false,
		loginname:''
	}
let userInfo = (function (user = defaultUser) {
	return JSON.parse(localStorage.getItem('userinfo'))||user
})();

let state = {
	count:0,
	navLists:{
		data:[]
	},
	userInfo,
	token:''
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
		state.navLists.data = datas.data
	},
	setuserInfo:function (state,data) {
		state.userInfo = data
	},
	setToken:function (state,token) {
		state.token = token
	}
}

let actions = {
	HttpNavLists:function (context,data) {
		context.commit('navLists',{data:[]})
		$httpGet('topics',data)
	    .then((res) => {
	    	context.commit('navLists',res)
	    })
	    .catch(err => {
	    	console.log(err)
	    })
	},
	getInfo:function ({commit},url) {
		return $httpGet(url)
	},
	receivePost:function ({commit},params) {
		return $httpPost(params.url,{accesstoken:params.accesstoken})
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
