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
  if (!data || data === 'http://120.25.103.178:5136' || data === 'http://139.159.243.90:5136') {
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

/**
 * 深度比较两个对象是否相等
 * @param object1 对象1
 * @param object2 对象2
 * @returns 布尔值，是否相等
 */
export const objDeepEqual = (object1: Record<any, any>, object2: Record<any, any>) => {
  const _isObject = (object: any) => {
    return object != null && typeof object === 'object'
  }

  if (object1 === object2) return true

  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = _isObject(val1) && _isObject(val2)
    if ((areObjects && !objDeepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false
    }
  }

  return true
}
