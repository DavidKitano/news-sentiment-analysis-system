import { describe, test, expect } from 'vitest'
import { fetchVersionFile, checkVersionUpdate } from '../versionCheck'

describe('fetchVersionFile function', () => {
  test('should fetch version file', async () => {
    const version = await fetchVersionFile()
    expect(version).toBeInstanceOf(Date)
  })
})

describe('checkVersionUpdate function', () => {
  test('should check version update', async () => {
    const update = await checkVersionUpdate()
    expect(update).toBe(false)
  })
})
