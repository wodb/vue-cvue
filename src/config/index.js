import axios from 'axios'
import qs from 'qs'

//配置默认设置
axios.defaults.baseURL = 'https://www.vue-js.com/api/v1/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const formatDate = (value) => {
	if (!value) return ''
	var date = new Date(value)
	var time = new Date().getTime() - date.getTime() 
	if (time < 0) {
		return ''
	} else if ((time / 1000 < 30)) {
		return '刚刚'
	} else if (time / 1000 < 60) {
		return parseInt((time / 1000)) + '秒前'
	} else if ((time / 60000) < 60) {
		return parseInt((time / 60000)) + '分钟前'
	} else if ((time / 3600000) < 24) {
		return parseInt(time / 3600000) + '小时前'
	} else if ((time / 86400000) < 31) {
		return parseInt(time / 86400000) + '天前'
	} else if ((time / 2592000000) < 12) {
		return parseInt(time / 2592000000) + '月前'
	} else {
		return parseInt(time / 31536000000) + '年前'
	}
}

export const $httpGet = (url,params) => {
    return axios({
    		method:'get',
    		url,
    		params
    	})
        .then(resquest => resquest.data)
        .catch(err => err)
}

export const $httpPost = (url,data) => {
    return axios({
    		method:'post',
    		url,
    		data:qs.stringify(data)
    	})
        .then(resquest => resquest.data)
        .catch(err => err)
}