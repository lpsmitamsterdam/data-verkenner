import normalizeExplosieven from './normalize-explosieven'
import type { Explosievenbominslag } from '../../../../../../api/explosieven/generated'
import formatDate from '../../../../../../app/utils/formatDate'

describe('normalize-explosieven', () => {
  it('parses the dates', () => {
    const input = {
      datum: '2019-12-12',
      datumInslag: '2019-12-16',
    } as Explosievenbominslag

    const output = normalizeExplosieven(input)

    expect(output.datum).toEqual(formatDate(new Date('2019-12-12')))
    expect(output.datumInslag).toEqual(formatDate(new Date('2019-12-16')))
  })

  it('ingores the dates when empty', () => {
    const input = {
      datum: null,
      datumInslag: null,
    } as Explosievenbominslag

    const output = normalizeExplosieven(input)

    expect(output.datum).toEqual(null)
    expect(output.datumInslag).toEqual(null)
  })
})
