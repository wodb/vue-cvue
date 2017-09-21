import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';

const xhr = axios.create({
	baseURL:'https://www.vue-js.com/api/v1/',
    headers:{
		post:{
            'Content-Type':'application/x-www-form-urlencoded'
		}
	}
})
//配置默认设置
xhr.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.resolve(error)
})

xhr.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error)
})

const formatDate = (value) => {
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

const tabName = (value) => {
	switch (value) {
		case 'all':
			return '全部'
		case 'good':
			return '精华'
		case 'weex':
			return 'weex'
		case 'share':
			return '分享'
		case 'ask':
			return '问答'
		case 'job':
			return '招聘'
	}
}

let checkStatus = (res) => {
	if (res && res.status == 200 || res.status == 304 || res.status == 400 || res.status == 422) {
		return res.data
	}
	Message({
		type:'error',
		message:res.message
	})
	return {
		error:true
	}
}

const $Get = (url,params) => {
	return xhr({
        method:'get',
        url,
        params,
        timeout: 10000,
    })
	.then(res => checkStatus(res))
}

const $Post = (url,params) => {
	return xhr({
        method:'POST',
        url,
        data:qs.stringify(params),
        timeout: 10000,
    })
	.then(res => checkStatus(res))
}
/**
 * 对sessionStorage操作
 * @getItem  {[key]}         [获取session值]
 * @save     {[key,value]}   [设置值]
 * @clear  	 {[null]}  		 [清空值]
 * @remove 	 {[key]} 	     [删除单个ITEM]
 */
const session = {
	getItem(key) {
		return sessionStorage.getItem(key)
	},
	save(key,value) {
		sessionStorage.setItem(key,JSON.stringify(value))
	},
	clear() {
		sessionStorage.clear()
	},
	remove(key) {
		sessionStorage.removeItem(key)
	}
}

/**
 * 节流函数
 * @param  {[Function]}  fn     [要执行的函数]
 * @param  {[Number]}  delay    [延迟执行的毫秒数]
 * @param  {[Number]}  mustRun  [至少多久执行一次]
 * @return {[Function]}         [节流函数]
 */
const throttle = (fn, wait, mustRun) => {
    let timeout;
    let startTime = new Date();
    return function() {
        let context = this;
        let args = arguments;
        let curTime = new Date();

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= mustRun) {
            fn.apply(context, args);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(fn, wait);
        }
    };
};
export {$Get,$Post,tabName,formatDate,session,throttle}
