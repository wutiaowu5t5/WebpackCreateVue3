/*
 * @Description: Axios拦截器封装
 * @Author: 5t5
 * @Time: 2024/5/24 17:03
 */
import axios from 'axios'
import errorHandler from './errorHandler'
import {SessionManager} from '@utils/storage/storageManager'

// 创建 Axios 实例
const request = axios.create({
  baseURL: 'http://example.com',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在这里可以添加身份验证 Token
    const token = SessionManager.getItem('token') // 假设 Token 存储在 localStorage 中
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    
    return config
  },
  error => {
    
    // 可以在这里进行一些错误处理
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 可以添加一些日志记录
    console.log('Response:', response)
    
    // 可以在这里对响应数据进行处理
    return response.data
  },
  error => {
    // 可以添加一些日志记录
    console.error('Response Error:', error)
    
    // 使用错误处理函数
    errorHandler(error)
    
    return Promise.reject(error)
  }
)

export default request