import isObject from './isObject'

describe('isObject', () => {
  it('returns true', () => {
    expect(isObject({ foo: 'bar' })).toBe(true)
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(true)
    expect(isObject(Object.create(null))).toBe(true)
  })

  it('returns false', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(5)).toBe(false)
    expect(isObject('')).toBe(false)
  })
})
