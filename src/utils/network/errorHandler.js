/*
 * @Description: 对错误代码的处理
 * @Author: 5t5
 * @Time: 2024/5/24 17:40
 */

const errorHandlerStrategies = {
  401: (error) => {
    console.error(`未授权，正在重定向至登录页面... 请求 URL: ${error.config.url}`)
  },
  403: (error) => {
    console.error(`禁止访问 请求 URL: ${error.config.url}`)
  },
  404: (error) => {
    console.error(`未找到 请求 URL: ${error.config.url}`)
  },
  500: (error) => {
    console.error(`服务器错误 请求 URL: ${error.config.url}`)
  },
  default: (error) => {
    console.error(`错误：${error.response ? error.response.statusText : '网络错误'} 请求 URL: ${error.config.url}`)
  }
}

const errorHandler = (error) => {
  const status = error.response ? error.response.status : 'default'
  const handler = errorHandlerStrategies[status] || errorHandlerStrategies.default
  handler(error)
}

export default errorHandler