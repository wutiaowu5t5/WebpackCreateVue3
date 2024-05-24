/*
 * @Description: 自定义console样式
 * @Author: 5t5
 * @Time: 2024/5/24 18:03
 */
const isProduction = process.env.NODE_ENV === 'production'

// 通用的美化打印函数
const prettyPrint = (title, text, color) => {
  if (isProduction) return
  console.log(
    `%c ${title} %c ${text} %c`,
    `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
    `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
    'background:transparent'
  )
}

// 验证输入是否为空
const validateInput = (input, method) => {
  if (!input) {
    console.error(`Invalid input for console.${method}. The input cannot be empty.`)
    return false
  }
  return true
}

// 重写 console 方法
console.info = (textOrTitle, content = '') => {
  if (!validateInput(textOrTitle, 'info')) return
  const title = content ? textOrTitle : 'Info'
  const text = content || textOrTitle
  prettyPrint(title, text, '#909399')
}

console.error = (textOrTitle, content = '') => {
  if (!validateInput(textOrTitle, 'error')) return
  const title = content ? textOrTitle : 'Error'
  const text = content || textOrTitle
  prettyPrint(title, text, '#F56C6C')
}

console.warn = (textOrTitle, content = '') => {
  if (!validateInput(textOrTitle, 'warn')) return
  const title = content ? textOrTitle : 'Warning'
  const text = content || textOrTitle
  prettyPrint(title, text, '#E6A23C')
}

console.success = (textOrTitle, content = '') => {
  if (!validateInput(textOrTitle, 'success')) return
  const title = content ? textOrTitle : 'Success'
  const text = content || textOrTitle
  prettyPrint(title, text, '#67C23A')
}

console.table = (data) => {
  if (!validateInput(data, 'table')) return
  
  if (Array.isArray(data)) {
    if (data.length === 0) {
      console.error('Invalid input for console.table. Expected a non-empty array.')
      return
    }
    
    // 获取表头
    const headers = Object.keys(data[0])
    console.log(
      headers.map(header => `%c ${header} `).join(''),
      ...headers.map(() => 'color: white; background-color: black; padding: 2px 10px;')
    )
    
    // 输出每一行
    data.forEach(row => {
      console.log(
        headers.map(header => `%c ${row[header]} `).join(''),
        ...headers.map(() => 'color: black; background-color: lightgray; padding: 2px 10px;')
      )
    })
    
  } else if (typeof data === 'object') {
    const keys = Object.keys(data)
    if (keys.length === 0) {
      console.error('Invalid input for console.table. Expected a non-empty object.')
      return
    }
    
    // 输出对象的键值对
    keys.forEach(key => {
      console.log(
        `%c ${key} %c ${data[key]} `,
        'color: white; background-color: black; padding: 2px 10px;',
        'color: black; background-color: lightgray; padding: 2px 10px;'
      )
    })
    
  } else {
    console.error('Invalid input for console.table. Expected an array or an object.')
  }
}