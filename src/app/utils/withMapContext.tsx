import { Map as MapComponent } from '@amsterdam/arm-core'
import type { ReactNode } from 'react'
import type { MapContextProps } from '../contexts/map/MapContext'
import MapContext from '../contexts/map/MapContext'
import withAppContext from './withAppContext'
import { DrawerState } from '../pages/MapPage/components/DrawerOverlay'

export const initialState: MapContextProps = {
  panelLayers: [],
  legendLeafletLayers: [],
  showMapDrawVisualization: false,
  detailFeature: null,
  panoFullScreen: false,
  panoImageDate: null,
  panelHeader: {
    title: 'Resultaten',
  },
  legendActive: false,
  loading: false,
  panoActive: false,
  drawerState: DrawerState.Open,
  setDetailFeature: () => {},
  setPanoFullScreen: () => {},
  setPanoImageDate: () => {},
  setPanelHeader: () => {},
  setShowMapDrawVisualization: () => {},
  setLegendActive: () => {},
  setDrawerState: () => {},
  setLoading: () => {},
  setInfoBox: () => {},
  infoBox: undefined,
}

const withMapContext = (component: ReactNode, mapContextProps?: Partial<MapContextProps>) =>
  withAppContext(
    <MapContext.Provider
      value={{
        ...initialState,
        ...mapContextProps,
      }}
    >
      <MapComponent>{component}</MapComponent>
    </MapContext.Provider>,
  )

export default withMapContext
