const path = require('path')
const glob = require('glob')
const dataDir = path.join(__dirname, 'data')

module.exports = () => {
  let data = {}
  // 读取目录下的js以及json文件
  glob.sync(`${dataDir}/**.{js,json}`).forEach(entry => {
    let name = entry.split('/').splice(-1)[0]
    // 引入模块
    let chunk = require(entry)

    // 如果模块为Function
    if (/\.js$/.test(name) && chunk instanceof Function) {
      chunk = chunk()
    }

    let os = Object.prototype.toString
    if (os.call(chunk).toLowerCase() === '[object object]') { // 如果是Object模块，直接拷贝
      Object.assign(data, chunk)
    } else if (os.call(chunk).toLowerCase() === '[object array]') { // 如果是Array模块，则以文件名为属性名
      Object.assign(data, {
        [name.substring(0, name.lastIndexOf('.'))]: chunk
      })
    } else { // 其他类型的数据不支持
      console.error(`The "./data/${name}" is not an object or array module.`)
    }
  })
  return data
}