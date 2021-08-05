import { act, render, screen } from '@testing-library/react'
import PanoramaViewer from './PanoramaViewer'
import withMapContext from '../../../../utils/withMapContext'

const mockPush = jest.fn()

jest.mock('react-router-dom', () => ({
  // @ts-ignore
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
  }),
  useLocation: () => ({
    pathname: 'some-url/',
    search:
      'pitch=10&heading=10&tags=panobi&randomParam="should-stay"&lagen=pano-pano2020bi_pano-pano2019bi',
  }),
}))

jest.mock('marzipano', () => ({
  Viewer: (() => {
    class FakeViewer {
      // eslint-disable-next-line class-methods-use-this
      addEventListener() {}

      // eslint-disable-next-line class-methods-use-this
      updateSize() {}

      // eslint-disable-next-line class-methods-use-this
      view() {
        return null
      }
    }

    return FakeViewer
  })(),
}))

describe('PanoramaViewer', () => {
  it('render', async () => {
    act(() => {
      render(withMapContext(<PanoramaViewer />))
    })

    await act(async () => {
      const component = await screen.findByTestId('panoramaViewer')
      expect(component).toBeInTheDocument()
    })
  })
})
