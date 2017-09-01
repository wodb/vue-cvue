import Vue from 'vue'
import Vuex from 'vuex'
import {ajax} from '../config/index'

Vue.use(Vuex)

let state = {
	count:0,
	navLists:{
		data:[]
	}
}

let getters = {

}

let mutations = {
	navLists:function (state,datas) {
		// state.navLists
	}
}

let actions = {
	getNavLists:function () {
		ajax({
	        method: 'get',
	        url: 'topics',
	        data: {
	            tabl:'all',
	            page:'10',
	            limit:'10',
	            mdrender:false
	        }
	    })
	    .then((res) => {
	    	console.log(res)
	    })
	    .catch(err => {
	    	console.log(err)
	    })
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
