import { describe, test, expect } from 'vitest'
import { isURL, isDataEmpty } from '../common'

describe('isURL function', () => {
  test('should return true for valid URLs', () => {
    expect(isURL('https://www.example.com')).toBe(true)
    expect(isURL('http://www.example.com')).toBe(true)
    expect(isURL('www.example.com')).toBe(true)
    expect(isURL('example.com')).toBe(true)
    expect(isURL('https://www.example.com/path/to/page')).toBe(true)
    expect(isURL('https://www.example.com?q=query')).toBe(true)
    expect(isURL('https://www.example.com#anchor')).toBe(true)
    expect(isURL('www.example')).toBe(true)
    expect(isURL('localhost')).toBe(true)
    expect(isURL('localhost:123')).toBe(true)
    expect(isURL('0.0.0.0')).toBe(true)
  })

  test('should return false for invalid URLs', () => {
    expect(isURL(undefined)).toBe(false)
    expect(isURL('not a URL')).toBe(false)
    expect(isURL('example')).toBe(false)
    expect(isURL('localhost:lol')).toBe(false)
  })
})

describe('isDataEmpty function', () => {
  test('should return true for empty data', () => {
    expect(isDataEmpty(undefined)).toBe(true)
    expect(isDataEmpty('')).toBe(true)
    expect(isDataEmpty([])).toBe(true)
    expect(isDataEmpty({})).toBe(true)
    expect(isDataEmpty('http://120.25.103.178:5136')).toBe(true)
  })

  test('should return false for non-empty data', () => {
    expect(isDataEmpty('http://www.baidu.com')).toBe(false)
    expect(isDataEmpty(['item'])).toBe(false)
    expect(isDataEmpty({ key: 'value' })).toBe(false)
  })
})
