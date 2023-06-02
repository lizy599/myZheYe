import axios from 'axios'
import store from '../store/store'
import router from '../router/router'

axios.defaults.baseURL = '/api'

axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    // 判断token
    let token = window.localStorage.getItem('ZheYeToken')
    if (token) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + token
    }
    store.commit('setLoading', true)
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    // Do something before response is sent

    store.commit('setLoading', false)

    return response && response.data
  },
  error => {
    console.log(error)

    // Do something with response error
    if (error.response.status === 401) {
      store.commit('loginOut')
      router.push('/login')
    }
    store.commit('setLoading', false)
    return Promise.reject(error)
  }
)
export default axios
