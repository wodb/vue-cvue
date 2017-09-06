import Vue from 'vue'
import Vuex from 'vuex'
import {$httpGet} from '../config/index'

Vue.use(Vuex)

let state = {
	count:0,
	navLists:{
		data:[]
	}
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
	}
}

let actions = {
	HttpNavLists:function (context,config) {
		context.commit('navLists',{data:[]})
		$httpGet('topics',config)
	    .then((res) => {
	    	context.commit('navLists',res)
	    })
	    .catch(err => {
	    	console.log(err)
	    })
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
