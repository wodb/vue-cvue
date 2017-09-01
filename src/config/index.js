import axios from 'axios'

//配置默认设置
axios.defaults.baseURL = 'https://www.vue-js.com/api/v1/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const ajax = (method) => {
    return axios(method)
        .then(resquest => resquest.data)
        .catch(err => err)
}
