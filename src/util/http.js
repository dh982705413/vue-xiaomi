import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

http.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

http.interceptors.response.use(
  res => {
    if (res.data.status === 0) {
      return res.data
    } else if (res.status === 10) {
      router.push('/login')
    } else {
      Vue.prototype.$message.error(res.data.msg)
    }
  },
  error => {
    if (error.response.status === 404) {
      Vue.prototype.$message.error('接口404')
    }
  }
)

export default http
