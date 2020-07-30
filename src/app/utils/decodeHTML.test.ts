import decodeHTML from './decodeHTML'

describe('decodeHTML', () => {
  it('should decode HTML characters', () => {
    expect(decodeHTML('Foo &amp; Bar')).toBe('Foo & Bar')
    expect(decodeHTML('Iamavery&#173;longstring')).toBe('Iamavery­longstring')
  })
})
