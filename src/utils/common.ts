/**
 * 判断是否为广义URL
 * @param str 字符串
 * @returns 是否符合广义URL格式
 */
export const isURL = (str: string | undefined) => {
  if (!str) return false
  if (str === 'localhost') return true
  if (str.startsWith('localhost') && !isNaN(Number(str.split(':')[1]))) return true
  const pattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+[/#?]?.*)$/i
  return pattern.test(str)
}

/**
 * 数据是否为空
 * @param data 数据
 * @returns 是否为空
 */
export const isDataEmpty = (data?: { [key: string]: any } | Array<any> | string) => {
  if (!data || data === 'http://120.25.103.178:5136') {
    return true
  }
  if (Array.isArray(data)) {
    return data.length === 0
  }
  return Object.keys(data).length === 0
}

/**
 * 将{[key: any]: any}的对象转换成 [[key1, value1], [key2, value2]...] 的数组
 * @param obj 对象
 * @returns 数组
 */
export const objectToArrayWithValue = (obj: { [key: string]: any }) => {
  return Object.entries(obj).map(([key, value]) => [key, value])
}

/**
 * 分离[[key1, value1], [key2, value2]...]数组为[[key1, key2...], [value1, value2...]]的数组
 * @param arr 数组
 * @returns 分离后的数组
 */
export const separateArray = (arr: Array<Array<any>>) => {
  const keys = arr.map((item) => item[0])
  const values = arr.map((item) => item[1])
  return [keys, values]
}
