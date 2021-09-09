import { mocked } from 'ts-jest/utils'
import joinUrl from '../../../shared/utils/joinUrl'
import environment from '../../../environment'
import { fetchProxy } from '../../../shared/utils/api/api'
import { getDatasetById } from './getDatasetById'

jest.mock('../../../shared/utils/api/api')

const mockedFetchProxy = mocked(fetchProxy, true)

describe('getDatasetById', () => {
  it('makes an api call and returns the correct response', async () => {
    await getDatasetById('baz')

    expect(mockedFetchProxy).toHaveBeenCalledWith(
      joinUrl([environment.API_ROOT, 'dcatd/datasets/baz']),
    )
  })
})
