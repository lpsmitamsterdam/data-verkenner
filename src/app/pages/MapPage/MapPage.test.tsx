import { render, screen, fireEvent } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import MapPage from './MapPage'
import MapContext from '../../contexts/map/MapContext'
import { DataSelectionProvider } from '../../contexts/DataSelection/DataSelectionContext'
import { UiProvider } from '../../contexts/ui'
import MapProvider from '../../contexts/map/MapProvider'
import withAppContext from '../../utils/withAppContext'
import { initialState } from '../../utils/withMapContext'

jest.mock('@amsterdam/react-maps')
jest.mock('../../../api/cms_search/mapCollections.graphql')
jest.mock('./components/BaseLayerToggle/BareBaseLayerToggle/BareBaseLayer', () => () => (
  <div data-testid="baseLayer" />
))
jest.mock('./components/MapMarker/MapMarker', () => () => <div data-testid="mapMarkers" />)
jest.mock('./components/MapPanel/MapPanel', () => () => <div data-testid="mapPanel" />)
jest.mock('./components/DrawTool/DrawResults', () => () => <div data-testid="drawResults" />)
jest.mock('./components/PanoramaViewer/PanoramaViewer', () => () => (
  <div data-testid="panoramaViewer" />
))

// Mock to resolve Jest warnings about act
// "Warning: An update to DrawMapVisualization inside a test was not wrapped in act(...)."
jest.mock('./components/DrawTool/DrawMapVisualization', () => () => (
  <div data-testid="drawMapVisualization" />
))

jest.mock('@amsterdam/arm-core', () => ({
  // @ts-ignore
  ...jest.requireActual('@amsterdam/arm-core'),
  Map: ({ children }: PropsWithChildren<any>) => <div>{children}</div>,
  Scale: ({ children }: PropsWithChildren<any>) => <div data-testid="scale">{children}</div>,
}))

jest.mock('react-router-dom', () => ({
  // @ts-ignore
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '',
    search: 'heading=10&locatie=12.12,3.21',
  }),
}))

jest.mock('urql', () => ({
  useClient: () => jest.fn(),
}))

describe('MapPage', () => {
  it('renders', () => {
    // Surpress the console warning about MapLayers failing to load (this is expected in tests)
    jest.spyOn(console, 'error').mockImplementation(() => {})

    render(
      withAppContext(
        <UiProvider>
          <MapProvider>
            <DataSelectionProvider>
              <MapPage />
            </DataSelectionProvider>
          </MapProvider>
        </UiProvider>,
      ),
    )

    jest.spyOn(console, 'error').mockClear()
  })

  it('should show the PanoramaViewer when panoHeading and locatie parameters are set', async () => {
    render(
      withAppContext(
        <UiProvider>
          <MapProvider>
            <DataSelectionProvider>
              <MapPage />
            </DataSelectionProvider>
          </MapProvider>
        </UiProvider>,
      ),
    )

    const component = await screen.findByTestId('panoramaViewer')
    expect(component).toBeInTheDocument()
  })

  it('calls setPanoFullScreen with false when the resize button is clicked', async () => {
    const setPanoFullScreen = jest.fn()

    render(
      withAppContext(
        <UiProvider>
          <MapContext.Provider
            value={{
              ...initialState,
              setPanoFullScreen,
              panoActive: true,
              panoFullScreen: true,
            }}
          >
            <DataSelectionProvider>
              <MapPage />
            </DataSelectionProvider>
          </MapContext.Provider>
        </UiProvider>,
      ),
    )

    const button = await screen.findByTestId('panoramaMapEnlarge')
    fireEvent.click(button)
    expect(setPanoFullScreen).toHaveBeenCalledWith(false)
  })
})
