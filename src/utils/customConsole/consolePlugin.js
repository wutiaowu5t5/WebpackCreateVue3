/*
 * @Description: consolePlugin.js
 * @Author: 5t5
 * @Time: 2024/5/24 18:28
 */
// consoleOverridePlugin.js
import prettyLog from './customConsole'

export default {
  install(app) {
    // const originalConsoleInfo = console.info
    
    console.info = function (...args) {
      prettyLog.info(...args)
      // 如果你还想保留原始的 console.info 输出，取消下面的注释
      // originalConsoleInfo.apply(console, args);
    }
    
    console.warn = function (...args) {
      prettyLog.warning(...args)
      // 如果你还想保留原始的 console.warn 输出，取消下面的注释
      // originalConsoleWarn.apply(console, args);
    }
    
    console.error = function (...args) {
      prettyLog.error(...args)
      // 如果你还想保留原始的 console.error 输出，取消下面的注释
      // originalConsoleError.apply(console, args);
    }
    
    // console.table = function (...args) {
    //  prettyLog.table(...args)
    //  // 如果你还想保留原始的 console.table 输出，取消下面的注释
    //  // originalConsoleTable.apply(console, args);
    // }
    
    console.success = function (...args) {
      prettyLog.success(...args)
      // 如果你还想保留原始的 console.success 输出，取消下面的注释
      // originalConsoleSuccess.apply(console, args);
    }
  }
}