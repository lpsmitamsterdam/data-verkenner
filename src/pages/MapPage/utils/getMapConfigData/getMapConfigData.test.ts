import { rest } from 'msw'
import getMapConfigData from './getMapConfigData'
import { server } from '../../../../../test/server'
import fixture from './map-sld-config.json'

describe('getMapConfigData', () => {
  beforeEach(() => {
    server.use(
      rest.get('https://map.data.amsterdam.nl/sld/config.json', async (req, res, ctx) => {
        return res(ctx.json(fixture))
      }),
    )
  })

  it('should return an expected list of map groups', async () => {
    const result = await getMapConfigData()
    expect(result.mapfiles.length).toEqual(fixture.mapfiles.length)
    expect(result.mapfiles[0].file_name).toEqual('planologischezonesschiphol')
  })
})
