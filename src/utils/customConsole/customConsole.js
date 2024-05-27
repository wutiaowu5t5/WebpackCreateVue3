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
  info: ( textOrTitle, content = '' ) => {
    logMessage( 'Info', textOrTitle, content, '#909399' )
  },
  
  error: ( textOrTitle, content = '' ) => {
    logMessage( 'Error', textOrTitle, content, '#F56C6C' )
  },
  
  warning: ( textOrTitle, content = '' ) => {
    logMessage( 'Warning', textOrTitle, content, '#E6A23C' )
  },
  
  success: ( textOrTitle, content = '' ) => {
    logMessage( 'Success', textOrTitle, content, '#67C23A' )
  },
  
  table: (input) => {
    const type = Object.prototype.toString.call(input)
    const padding = 'padding: 2px 10px;'
    const headerStyle = `color: white; background-color: black; ${padding}`
    const indexStyle = `color: black; background-color: lightgray; ${padding}`
    const valueStyle = `color: black; background-color: #B87FE8; ${padding}`
  
    if (type === '[object Array]') {
      console.log('%c Index %c Value', headerStyle, headerStyle)
    
      input.forEach((item, index) => {
        console.log(`%c ${index} %c ${JSON.stringify(item)} `, indexStyle, valueStyle)
      })
    } else if (type === '[object Object]') {
      console.log('%c Key %c Value', headerStyle, headerStyle)
    
      Object.keys(input).forEach((key) => {
        console.log(`%c ${key} %c ${input[key]} `, indexStyle, valueStyle)
      })
    } else {
      console.log('Input type not supported.')
    }
  }
}

export default prettyLog