import { rest } from 'msw'
import { render, screen, waitFor } from '@testing-library/react'
import PanoramaPreview from './PanoramaPreview'
import joinUrl from '../../../../shared/utils/joinUrl'
import environment from '../../../../environment'
import { server } from '../../../../../test/server'
import { mapLayersParam, panoHeadingParam, panoPitchParam } from '../../query-params'
import { singleFixture } from '../../../../api/panorama/thumbnail'
import withMapContext from '../../../../shared/utils/withMapContext'

jest.mock('react-router-dom', () => ({
  // @ts-ignore
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/data',
    search: '?someOtherParam=1&lagen=random-layer',
  }),
}))

describe('PanoramaPreview', () => {
  it('should build a link including current parameters, panorama parameters and layers for panorama', async () => {
    const panoramaThumbnailUrl = joinUrl([environment.API_ROOT, 'panorama/thumbnail'])
    server.use(
      rest.get(panoramaThumbnailUrl, async (req, res, ctx) => res(ctx.json(singleFixture))),
    )
    render(withMapContext(<PanoramaPreview location={{ lat: 1, lng: 2 }} />))
    await waitFor(() => {
      const link = screen.queryByTestId('panoramaPreview')?.querySelector('a')
      const params = new URLSearchParams(link?.search)
      expect(params.get('someOtherParam')).toContain('1')
      expect(params.get(mapLayersParam.name)).toContain('random-layer')
      expect(params.get(panoPitchParam.name)).toContain('0')
      expect(params.get(panoHeadingParam.name)).toContain('131')
    })
  })

  it('should render PanoAlert when API responses with a 403 Forbidden', async () => {
    const panoramaThumbnailUrl = joinUrl([environment.API_ROOT, 'panorama/thumbnail/'])
    server.use(
      rest.get(panoramaThumbnailUrl, async (req, res, ctx) => {
        return res(ctx.status(403))
      }),
    )
    render(withMapContext(<PanoramaPreview location={{ lat: 1, lng: 2 }} />))

    const panoAlert = await screen.findByTestId('panoAlert')
    expect(panoAlert).toBeInTheDocument()
  })

  it('should not render the panorama preview if panoramaviewer is active', () => {
    render(withMapContext(<PanoramaPreview location={{ lat: 1, lng: 2 }} />, { panoActive: true }))
    expect(screen.queryByTestId('panoramaPreview')).not.toBeInTheDocument()
  })
})
