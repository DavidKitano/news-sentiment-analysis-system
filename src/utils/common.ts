export const isURL = (str: string | undefined) => {
  if (!str) return false
  if (str === 'localhost') return true
  if (str.startsWith('localhost') && !isNaN(Number(str.split(':')[1]))) return true
  // 创建一个正则表达式来匹配网址的模式
  const pattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+[/#?]?.*)$/i
  // 使用正则表达式的test方法来检测字符串是否匹配模式
  return pattern.test(str)
}

export const isDataEmpty = (data?: { [key: string]: any } | Array<any> | string) => {
  if (!data || data === 'http://120.25.103.178:5136') {
    return true
  }
  if (Array.isArray(data)) {
    return data.length === 0
  }
  return Object.keys(data).length === 0
}
