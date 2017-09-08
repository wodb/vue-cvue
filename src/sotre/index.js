import Vue from 'vue'
import Vuex from 'vuex'
import {$httpGet,$httpPost} from '../config/index'

Vue.use(Vuex)

let userInfo = (function () {
	let userinfo = JSON.parse(localStorage.getItem('userinfo'))
	return userinfo || {
		avatar_url:'',
		id:'',
		success:false,
		loginname:''
	}
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
		state.navLists.data = datas.data
	},
	setuserInfo:function (state,data) {
		state.userInfo = data
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
