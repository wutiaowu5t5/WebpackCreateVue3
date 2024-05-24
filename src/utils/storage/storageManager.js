/*
 * @Description: web存储管理
 * @Author: 5t5
 * @Time: 2024/5/24 17:13
 */
class StorageManager {
  // 私有属性
  #storage
  
  /**
   * 构造函数用于初始化存储类型。
   * @param {string} type 存储类型，默认为 'localStorage'。可接受的值为 'localStorage' 或 'sessionStorage'。
   * @throws {Error} 如果传入的存储类型不是 'localStorage' 或 'sessionStorage'，将抛出错误。
   */
  constructor(type = 'localStorage') {
    // 验证存储类型是否有效
    if (type !== 'localStorage' && type !== 'sessionStorage') {
      throw new Error("Invalid storage type. Use 'localStorage' or 'sessionStorage'.")
    }
    // 根据存储类型选择对应的存储实例
    this.#storage = type === 'localStorage' ? window.localStorage : window.sessionStorage
  }
  
  /**
   * 设置单项
   * @param {string} key - 存储项的键
   * @param {*} value - 存储项的值
   */
  setItem(key, value) {
    this.#storage.setItem(key, JSON.stringify(value))
  }
  
  /**
   * 设置多项
   * @param {Object} items - 包含多个键值对的对象
   */
  setItems(items) {
    for (const [key, value] of Object.entries(items)) {
      this.setItem(key, value)
    }
  }
  
  /**
   * 获取单项
   * @param {string} key - 存储项的键
   * @returns {*} - 存储项的值
   */
  getItem(key) {
    const value = this.#storage.getItem(key)
    try {
      return value ? JSON.parse(value) : null
    } catch (e) {
      console.error('Error parsing stored value', e)
      return null
    }
  }
  
  /**
   * 获取所有项
   * @returns {Object} - 包含所有存储项的对象
   */
  getAllItems() {
    const items = {}
    for (const key of Object.keys(this.#storage)) {
      items[key] = this.getItem(key)
    }
    return items
  }
  
  /**
   * 删除单项
   * @param {string} key - 存储项的键
   */
  removeItem(key) {
    this.#storage.removeItem(key)
  }
  
  /**
   * 删除多项
   * @param {string[]} keys - 存储项的键数组
   */
  removeItems(keys) {
    for (const key of keys) {
      this.removeItem(key)
    }
  }
  
  /**
   * 清除所有项
   */
  clear() {
    this.#storage.clear()
  }
  
  /**
   * 修改单项
   * @param {string} key - 存储项的键
   * @param {*} newValue - 新的存储项的值
   */
  updateItem(key, newValue) {
    this.setItem(key, newValue)
  }
  
  /**
   * 修改多项
   * @param {Object} items - 包含多个键值对的对象
   */
  updateItems(items) {
    this.setItems(items)
  }
  
  /**
   * 获取存储的所有键
   * @returns {string[]} - 存储的所有键
   */
  getKeys() {
    return Object.keys(this.#storage)
  }
}

// 创建 LocalManager 和 SessionManager 实例
const LocalManager = new StorageManager()
const SessionManager = new StorageManager('sessionStorage')

export {
  LocalManager,
  SessionManager
}