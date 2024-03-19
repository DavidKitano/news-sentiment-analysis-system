import { describe, test, expect } from 'vitest'
import { isURL, isDataEmpty, objectToArrayWithValue, separateArray } from '../common'

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

describe('objectToArrayWithValue function', () => {
  test('should convert object to array', () => {
    expect(objectToArrayWithValue({ a: 1, b: 2 })).toEqual([
      ['a', 1],
      ['b', 2]
    ])
    expect(objectToArrayWithValue({})).toEqual([])
    expect(objectToArrayWithValue({ a: 1 })).toEqual([['a', 1]])
    expect(objectToArrayWithValue({ a: 1, b: 2, c: 3 })).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ])
    expect(objectToArrayWithValue({ a: 1, b: 2, c: 3, d: 4 })).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
      ['d', 4]
    ])
    expect(objectToArrayWithValue({ 1: 2, 3: 4, 5: 6 })).toEqual([
      ['1', 2],
      ['3', 4],
      ['5', 6]
    ])
  })
})

describe('separateArray function', () => {
  test('should separate array', () => {
    expect(
      separateArray([
        ['a', 1],
        ['b', 2]
      ])
    ).toEqual([
      ['a', 'b'],
      [1, 2]
    ])
    expect(separateArray([['a', 1]])).toEqual([['a'], [1]])
    expect(
      separateArray([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
    ).toEqual([
      ['a', 'b', 'c'],
      [1, 2, 3]
    ])
    expect(
      separateArray([
        ['a', 1],
        ['b', 2],
        ['c', 3],
        ['d', 4]
      ])
    ).toEqual([
      ['a', 'b', 'c', 'd'],
      [1, 2, 3, 4]
    ])
    expect(
      separateArray([
        ['1', 2],
        ['3', 4],
        ['5', 6]
      ])
    ).toEqual([
      ['1', '3', '5'],
      [2, 4, 6]
    ])
    expect(separateArray([])).toEqual([[], []])
    expect(
      separateArray([
        ['a', [1, 2, 3]],
        ['b', void 0],
        ['c', { n: 44 }],
        ['d', null]
      ])
    ).toEqual([
      ['a', 'b', 'c', 'd'],
      [[1, 2, 3], void 0, { n: 44 }, null]
    ])
  })
})
