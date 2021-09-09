import { rest } from 'msw'
import getDataFromApi from './getDataFromApi'
import { server } from '../../../../test/server'
import joinUrl from '../../../shared/utils/joinUrl'
import environment from '../../../environment'
import {
  path as woonplaatsPath,
  listFixture as woonplaatsenList,
} from '../../../api/bag/v1/woonplaatsen'
import {
  path as stadsdeelPath,
  listFixture as stadsdeelList,
} from '../../../api/gebieden/stadsdeel'

const woonplaatsenUrl = joinUrl([environment.API_ROOT, woonplaatsPath])
const gebiedenUrl = joinUrl([environment.API_ROOT, stadsdeelPath])

describe('getDataFromApi', () => {
  beforeEach(() => {
    server.use(
      rest.get(gebiedenUrl, async (req, res, ctx) => {
        return res(ctx.json(stadsdeelList))
      }),
      // New BAG API
      rest.get(woonplaatsenUrl, async (req, res, ctx) => {
        return res(ctx.json(woonplaatsenList))
      }),
    )
  })
  it('should return an expected object', async () => {
    const result = await getDataFromApi(gebiedenUrl, [{ type: 'page', value: '1' }])
    expect(result).toEqual(stadsdeelList)
  })
  it('should deal with new API formats', async () => {
    const result = await getDataFromApi(woonplaatsenUrl, [
      { type: 'page', value: '1' },
      { type: 'page_size', value: '100' },
    ])
    expect(result).toEqual(woonplaatsenList)
  })
})
