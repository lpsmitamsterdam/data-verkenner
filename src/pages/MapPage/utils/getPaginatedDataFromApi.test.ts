import { rest } from 'msw'
import getListDataFromApi from './getListDataFromApi'
import { server } from '../../../../test/server'
import joinUrl from '../../../shared/utils/joinUrl'
import environment from '../../../environment'
import {
  path as stadsdeelPath,
  listFixture as stadsdeelList,
} from '../../../api/gebieden/stadsdeel'

const gebiedenUrl = joinUrl([environment.API_ROOT, stadsdeelPath])

describe('getPaginatedDataFromApi', () => {
  beforeEach(() => {
    server.use(
      rest.get(gebiedenUrl, async (req, res, ctx) => {
        return res(ctx.json(stadsdeelList))
      }),
    )
  })
  it('should return an expected object', async () => {
    const result = await getListDataFromApi(gebiedenUrl)()
    expect(result).toEqual({
      count: 8,
      data: stadsdeelList.results,
      next: null,
      previous: null,
    })
  })
})
