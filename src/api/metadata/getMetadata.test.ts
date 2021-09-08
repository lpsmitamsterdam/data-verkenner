import { mocked } from 'ts-jest/utils'
import joinUrl from '../../shared/utils/joinUrl'
import environment from '../../environment'
import { fetchWithoutToken } from '../../shared/utils/api/api'
import { getMetadata } from './getMetadata'

jest.mock('../../shared/utils/api/api')

const mockedFetchWithoutToken = mocked(fetchWithoutToken, true)

describe('getMetadata', () => {
  const response = [{ foo: 'bar' }]

  it('makes a request and returns the response', async () => {
    mockedFetchWithoutToken.mockReturnValueOnce(Promise.resolve(response))

    await expect(getMetadata()).resolves.toEqual(response)

    expect(mockedFetchWithoutToken).toHaveBeenCalledWith(
      joinUrl([environment.API_ROOT, 'metadata']),
    )
  })
})
