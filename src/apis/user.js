/*
 * @Description: 用户相关Api
 * @Author: 5t5
 * @Time: 2024/5/24 17:46
 */
import request from '@utils/network/request'

class UserApi {
  
  /**
   * @description: 获取验证码
   * @param {Object} params {phone}
   * @return {*}
   */
  async getVerificationCode(params) {
    return await request({
      url: `your/url`,
      method: 'get',
      params
    })
  }
  
  /**
   * @description: 密码登录
   * @param {Object} data {phone, password}
   * @return {*}
   */
  async passwordLogin(data) {
    return await request({
      url: `your/url`,
      method: 'post',
      data
    })
  }
  
  /**
   * @description: 验证码登录
   * @param {Object} data {phone, code}
   * @return {*}
   */
  async verificationCodeLogin (data) {
    return await request({
      url: `your/url`,
      method: 'post',
      data
    })
  }
}
export default new UserApi()