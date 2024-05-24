/*
 * @Description: 自定义console样式
 * @Author: 5t5
 * @Time: 2024/5/24 18:03
 */

const isEmpty = (value) => {
  return value === null || value === ''
}

const prettyPrint = (title, text, color) => {
  console.log(
    `%c ${title} %c ${text} %c`,
    `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
    `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
    'background:transparent'
  )
}

const logMessage = (type, textOrTitle, content, color) => {
  const title = isEmpty(content) ? type : textOrTitle
  const text = isEmpty(content) ? textOrTitle : content
  prettyPrint(title, text, color)
}

const prettyLog = {
  info: (textOrTitle, content = '') => {
    logMessage('Info', textOrTitle, content, '#909399')
  },
  
  error: (textOrTitle, content = '') => {
    logMessage('Error', textOrTitle, content, '#F56C6C')
  },
  
  warning: (textOrTitle, content = '') => {
    logMessage('Warning', textOrTitle, content, '#E6A23C')
  },
  
  success: (textOrTitle, content = '') => {
    logMessage('Success', textOrTitle, content, '#67C23A')
  }
  
  // table: (data) => {
  //  if (isEmpty(data)) {
  //    prettyLog.warning('Table', 'Empty value provided')
  //    return
  //  }
  //  if (!Array.isArray(data) && typeof data !== 'object') {
  //    prettyLog.warning('Table', 'Invalid data type provided')
  //    return
  //  }
  //
  //  const keys = Array.isArray(data) ? Object.keys(data[0]) : Object.keys(data)
  //  console.log(
  //    `%c ${keys.join(' %c ')}`,
  //    ...keys.map(() => 'color: white; background-color: black; padding: 2px 10px;')
  //  )
  //
  //  if (Array.isArray(data)) {
  //    data.forEach((row) => {
  //      console.log(
  //        `%c ${keys.map(key => row[key]).join(' %c ')}`,
  //        ...keys.map(() => 'color: black; background-color: lightgray; padding: 2px 10px;')
  //      )
  //    })
  //  } else {
  //    console.log(
  //      `%c ${keys.map(key => data[key]).join(' %c ')}`,
  //      ...keys.map(() => 'color: black; background-color: lightgray; padding: 2px 10px;')
  //    )
  //  }
  // }
}

export default prettyLog